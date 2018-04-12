# Building API with API Gateway and Lambda

API Gateway is not JSON only. As you see in most of the demos outthere. In general we don't need to host our Html site on s3, we can use protocol buffers with API Gateway and Lambda. You can read more here about how to use other formats [Using Protocol Buffers with API Gateway and AWS Lambda](https://hackernoon.com/using-protocol-buffers-with-api-gateway-and-aws-lambda-22c3804f3e76)

AWS announced binary support for API Gateway in late 2016, which opened up the door for you to use more efficient binary formats such as Google’s Protocol Buffers and Apache Thrift.

**Note:** PRO TIP - take advantage of container reuse to avoid laoding static content, or creating DB connection pools on every invocation. Since HTML is static it makes no sense to load it on every invokation and if the container for our function is reused we would still have our global variables on the next invokation. We can optimize it here by caching html after the first invokation. Global variables can persist from one invokation to another a good optimization is to use them to store static configurations, database connections etc. which is something that AWS Lambda team recommend. 

```js
let html; // for caching static content and not to load it on every invokation

function* loadHtml() {
  if (!html) {
    html = yield fs.readFileAsync('./static/index.html', 'utf-8');
  }
  return html;
}

module.exports.handler = co.wrap(function* (event, context, callback) {
  let html = yield loadHtml();
  const response = {
    statusCode: 200,
    body: html,
    headers: {
      'Content-type': 'text/html; charset=UTF-8'
    }
  };

  callback(null, response);

});
``` 

You can use libraries to make async/await and Promises working in Node6.10 (the current version of Node at AWS Lambda), just include following libraries:

```js
const co = require('co');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
``` 

## How to secure APIs in API Gateway

You can have APIs that needs authentification (POST, DELETE etc.) and APIs that don't need any authentication such as (GET). But it always depends on the service/app. 

``` 
GET big-mouth.com (no authentication)
POST big-mouth.com/sigin (no authentication)
POST big-mouth.com/profile (needs authentication)
POST big-mouth.com/orders (needs authentication) > GET big-mouth.com/restaurants (internal API)
``` 

You can also have internal APIs that will not be consumed by the client directly. In a micro-services architecture these APIs are often used to encapsulate a set of shared resources information about restaurants is a shared resource that many part of the system need access it. In microservices architecture these shared resourse will be maintaned by a dedicated servive a restaurant api for example. The only way to retrieve or update information about restaurants is by interacting with this API. As these internal APIs can be very powerful and can be used to update or even delete system state, so they must be well protected.

For instance the `DELETE big-mouth.com/restaurants/{name}` endpoint can be part of the system. And you wouldn't want to be this endpoint public, so that an attacker can easily delete all the restaurant from your system. Typically we restric the access to this internal APIs using combination of private VPCs and Authorization Headers. Wit API Gateway we loose the ability to create network network bindaries for private VPCs but in return we get multiple access control mechanism out of the box owned and maintained at the API Gateway level. 

## Configure API Key

1. One of the way to secure API Gateway is to use API keys. In order to create API keys we need to log into API Gateway console and create first of all an usage plan, after that add a user and under Method Request switch API Key Required to `true`. Once the endpoint is protected by the API key you need to add API key header `x-api-key` to the request.

You can find detailed description in this video [Yan Cui API Keys](https://livevideo.manning.com/module/38_2_4/production-ready-serverless/building-api-with-api-gateway-and-lambda/how-to-secure-apis-in-api-gateway)

**Note:** you don't need to do it by hand, you can also use serverless framework as well. You can read more here [Setting API Keys](https://serverless.com/framework/docs/providers/aws/events/apigateway/#setting-api-keys-for-your-rest-api) 

### API Keys + usage plans:

* are designed for rate limiting, not authentication & authorization
* allows client to access selected APIs at agreed upon request rates and quotas
* request reate and quota apply to all APIs and stages covered by the usage plan

## Authorization AWS_IAM

If your goal is to restrict access to endpoints using role based permission model for example to allows internal API only be accesssible only by your own services then you should use AWS_IAM authorization instead. 

## Custom Authorizers

Another way to restict the access to the API is via Custom Authorizers. You can create new Authorizers in the Amazon management console. You can click on Authorizers in your API (API Gateway Frontend). Here you can use a Lambda or a Cognito service for Authorization. 

You can do it by signing your request from a function itself. If someone tries to call the API endpoint without a valid signature, there will be nothing shows. So, only thet function that gets access and has all needed object properties inside the request can access the API endpoint that is hidden from outside.

```js
function* getRestaurants() {
  let url = URL.parse(restaurantsApiRoot)
  let opts = {
    host: url.hostname,
    path: url.pathname
  };
  
  aws4.sign(opts);
  
  return (yield http.get(restaurantsApiRoot)
                    .set('Host', opts.headers['Host'])
                    .set('X-Amz-Date', opts.headers['X-Amz-Date'])
                    .set('Authorization', opts.headers['Authorization'])
                    .set('X-Amz-Security-Token', opts.headers['X-Amz-Security-Token'])
  ).body;

}
``` 

**Note:** This is one of the patterns from micro-service architecture. You need to divide your APIs into public accessable and private accessible only via IAM authorization and request signin through e.g. AWS4 as it shown in the example above. Again this will give the permission to the get Lambda function to invoke the restaurants endpoint API.

You also need to add the policy to the serverless.yaml file. By doing so you allows to the lambda function to execute the API endpoint.

```yaml
  - Effect: Allow
      Action: execute-api:Invoke
      Resource: arn:aws:execute-api:#{AWS::Region}:#{AWS::AccountId}:*/*/GET/restaurants
      # We gave our function to execute on any api at any stage to send a get request to restaurants
      # arn:aws:execute-api:{region}:{account-id}:{api-id}/{stage}/{method}/{resource}
``` 

![Securing APIs](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-secure-api.png)

### Custom Authorizer Cognito

What is Cognito: Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. Amazon Cognito scales to millions of users and supports sign-in with social identity providers, such as Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0.

![Cognito AWS](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-cognito.jpeg)

### Custom Authorizer Function

When a client makes request to the API Gatway, then API Gateway will invoke this custom authorization function which will return a JSON payload with a policy object (principal) for this user or it will reject the request and send a 403 error back to the client. For successfully authenticated request the policy will be cached for future request. The API Gateway will forward the request to configured endpoint that invokes the Lambda function. 

[HTTP Endpoints with Custom Authorizers](https://serverless.com/framework/docs/providers/aws/events/apigateway/#http-endpoints-with-custom-authorizers)

## Recap

* If you need to limit for individual callers you can use API Keys + Usage Plans
* If you need authorization & authentication
    + You can offload them to AIM for internal services
    + You want to offload task to Cognito you should use Cognito User Pools instead
        + If you want to write a Lambda function to implement the authentication / authorization then you have also API Gateway Custom Authorizer Function that returns a policy. 
    + You can implement this logic inside endpoint itself!

In most cases Authorization/Authentication happens at the API Gateway Level. If any request fails it does not invoke the Lambda function for the endpoint so you want pay for that invokation either, which is much more expensive than Lambda invokations. 

![Cognito AWS](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-recap-authorization.png)

## How to secure APIs

Internal APIs should be secured via IAM authorization or if it's a user we can use Cognito Identity Pools.

![Securing APIs](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-secure-api.png)

## Cognito 101

Authentication is as example that's heavy lifiting that's not core to your business nor it's something simple to implement and get it work correctly. In fact all this custom built systems are often enough poorly implemented and insecure. Passwords are often stored as plain text in a database or maybe they are transmitting plain-text over HTTP so they can be easily captured by middle-man. 

You should use services like Cognito, Auth0 that do all the heavy-lifting for you. A good authentication system consts of many parts such as: sign in, login, sign up, captcha, forgot password etc. It's better to actually focus your time and energy on things that customers want from you. 

### What is Cognito?

You can think of Cignito as service with three distinct feature sets:

1. User Pools: is a managed identitiy service that manages everything related to user signup/signin. Already built-in features such as: registration, verification, forgotten password etc. > User flows + Security MFA, encryption, password policies etc. - Secure Remote Password Protocol the passwords don't need to travel over the wire

**Note:** Users that have signed with Cognito user pools can access any API Gateway endpoints that are configured with a Cognito Custom Authorizer

![Cognito Flow](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-cognito-flow.png)


2. Federated Identities: which allows you to take authorization tokens that are issued by idenentity providers and exchange them for temporary AWS credentials. In this case you would identicate one of the supported providers such as Google, Facebook, Twitter, Cognito User Pools. Once you have authenticated you receive an authorization token from the provider, which we then send to Cognito Federated Identities, who then will validate token with the provider and if the token is valid then Cognito Federated Identities will issue a temporary IAM AWS credentials in return, which will give you access to AWS services including API endpoints that are protected by IAM AWS authorization.

![Securing APIs](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-cognito-federated.png)

3. Sync: which allows you to sync user login data across multiple devices. 


## Leading Practices API Gateway

### Enable API Caching to Enhance Responsiveness

You can enable API caching in Amazon API Gateway to cache your endpoint’s response. With caching, you can reduce the number of calls made to your endpoint and also improve the latency of the requests to your API. When you enable caching for a stage, API Gateway caches responses from your endpoint for a specified time-to-live (TTL) period, in seconds. API Gateway then responds to the request by looking up the endpoint response from the cache instead of making a request to your endpoint. The default TTL value for API caching is 300 seconds. The maximum TTL value is 3600 seconds. TTL=0 means caching is disabled. [Enable API Caching to Enhance Responsiveness](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html)

![API Gateway Caching](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-api-gateway-cache.png)

### Throttle API Requests for Better Throughput

To prevent your API from being overwhelmed by too many requests, Amazon API Gateway throttles requests to your API using the token bucket algorithm, where a token counts for a request. Specifically, API Gateway sets a limit on a steady-state rate and a burst of request submissions against all APIs in your account. In the token bucket algorithm, the burst is the maximum bucket size.

When request submissions exceed the steady-state request rate and burst limits, API Gateway fails the limit-exceeding requests and returns 429 Too Many Requests error responses to the client. Upon catching such exceptions, the client can resubmit the failed requests in a rate-limiting fashion, while complying with the API Gateway throttling limits. [Throttle API Requests for Better Throughput](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html)


### What are the Key Metric for Monitoring APIs?

You can use internal built-in tools from Cloudwatch to setup the monitoring process.

* Dashboards: custom made dashboards for your projects and resources

![Cloudwatch Dashboard](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-cloudwatch-dashboard.png)

* Alerts: custom made alerts you are going to be notified in case of problems with the system. You can either set alerts from the AWS console or with the help of [serverless framework plugin](https://github.com/ACloudGuru/serverless-plugin-aws-alerts). You can configure alerts with the serverless.yaml and having deployed with your functions which can be useful if you have custom metrics. But there is a class of alerts that you have need to create by default for example, whenever you deploy an API to production stage it should have a set of alerts on latency and error count and maybe a dashboard to go with it as well. We need an automated process to create these alerts!



