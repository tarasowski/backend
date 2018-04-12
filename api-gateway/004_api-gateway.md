# API Gateway

With API Gateway we can create Restfull APIs. This is how a Restfull API works:

We a web app, a mobile app or some other client that is reaching to our API (like Postman). These clients will send a request to some backend to perform some CRUD Operations also to the API. It can be created with Node.js/PHP/Java or any other languages. Where you write the whole code for providing API endpoints (URLs) where the clients could connect on your own. 

API Gateway is a service by AWS which makes much easier, where you don't have to write any code where you can convinietnly create API in an interface. We can create endpoints here which is a combination of resources/paths and http methods (get, post etc.). You can also implement authentication with the API Gateway. With API Gateway you can directly access other AWS services such as Lambda to trigger some action (e.g. to run Lambda function). 

![Serverless API Gateway](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-api-gateway.png)

# API Keys

If you plan to create an API that is shared with other developers so not with users of the app, with other developers creating their own apps. Like Mailchimp, Sendgrind, Stripe APIs if you use them you need to send the API key with every request you send to the API, because you identify yourself with that key and companies can track also the usage of the API and possiblty limit the usage. We can do the same with the API Gateway. 

If we generate the API the customer can send this key along with the request to indentify himself. Why? We can e.g. block request that aren't sending an API key. We can setup usage plans to restric usage for certain keys. This is what we can do with the API key and the usage plan. It's only important if you want to work with other developers. 

**Note:** Client certificate is important if you plan on forwarding incoming request to another http endpoint and that another http endpoint want to validate that the request for this endpoint comes from a API Gateway API. 

A resource is just like a path `/xyz` If you create a new resource you create a new path in the url you use. 

In the AWS console we can create API resources/methods but they are not live on the web. When we want to make it live we need to deploy the API, by doing so we create a snapshot of our API and it gets shipped to the web. We can have also different stages (dev, test, prod) and different version (v1, v2) of the API.

## Authorizers

Authorizers allows us to add authentication to the API. When you have specific paths which should only be accessible by specific Users (or logged in), you can define this authentification logic the tool or the code you want to use for these users here. 

## Models

Models allow us to shape the data with we work in with our API. It's optional and models are created by using the JSON schema language, you can define you the actuals JSON data should be structured. If you use these models here you can use it to validate incoming data, see if it fits that schema reject if its not etc. 

## Documentation

Is also important if you plan to expose the API to other developers. You can document and make sure that people know how to use your API.

## How to setup an API

In the first example we created an API endpoint `/first-api-test`. It's an endpoint we can hit with the request. Because an endpoint is made up of two things:
    1. A path to which the request should send 
    2. And the type of the request (GET, POST, PUT, PATCH, DELETE)

As soon as we hit an endpoint we go through a cycle. It depicts the flow of data in our API. We have a client which sends a request. 

1. Method request: how the incoming request is handled by the API Gateway. And how request reaching this endpoint should look like, it's like a gatekeeper. We can reject request if it don't fit a certain schema. Authorization: NONE, Request Validator NONE (query paramenters, JSON schema, request body), API Key Required False

2. Integration request: is about mapping incoming data / transforming incoming data on the action we want to trigger. In the example we are triggering a mock endpoint which is not doing anything. But there are options like triggering Lambda function, another HTTP endpoint or any other AWS Services. The role of the integration request is to trigger an endpoint and if we want transform our incoming request data (body, headers), it allows us to extract the data and pass it to the endpoint.

3. Integration response: it gets first triggered as soon as our action is done. If we use e.g. Lambda it will give us a result of some calculation or anything like that. Integration response allows us to configure the response we are sending back. We can have different response that we are define, success/error response etc. We can also transform our data here too, we get back our data from action endpoint e.g. Lambda and we want to send the data back in a certain structure to the client. So we can add some transformation here. 

4. Method response: defines the shape of our response. The shape our response should have. Here what we can do simply configure possible responses that we are sending back. We can define headers and type of data we want to send back (response body). It's not binding we cannot block the response even if there is an error or so. 

![API cycle](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-api-cycle.png)

## How to create a new API?

The API Gateway provides 4 methods:
1. New API: will create a new blank API
2. Clone from existing API: we can select an existing API and clone it
3. Import from Swagger: allows to import a Swagger definiton file. Swagger Definition is a language that allows you to define an API as a text file and it can be imported here and AWS will automatically generate the API based on that import file (you can upload API snapshots Swagger File)
4. Example API: shows how such as Swagger File looks like. It looks like a simple JSON file

### Checkbox:

**Configure as proxy resource:** means that it will catch all resource, catching all other paths and methods. It will be a flexilbe path, it catches all requests? Why to do that? If you catch all incoming request and methods and forward then to whatever action we are executing, this action can be a Lambda function. And Lambda supports node.js and since it does so you can simply run your node/express and whatever app on a Lambda function, forward all request to the Lambda function and do the routing inside the Lambda function and return html whatever you want. 

Enable API Gateway CORS: CORS stands for Cross Origin Resource Sharing and it's about a security model where in general it's not allowed to access resources on a server from another server. When your API's resources receive requests from a domain other than the API's own domain, you must enable cross-origin resource sharing (CORS) for selected methods on the resource. This amounts to having your API respond to the OPTIONS preflight. [Source](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)

The preflight request gets a responce from the endpoint with the following response header:
* Access-Control-Allow-Headers: Content Type, Auth etc.
* Access-Control-Allow-Methods: 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'
* Access-Control-Allow-Origin: '*' (from every domain, the * allows to do it)

**Note:** Use Lambda Proxy Integration: Will take the request and paste all the metadata as an object into the Lambda function. That also means in the Lambda function you have to extract what you need and in the end you have to send back the response from Lambda, you won't have using the native tools that API gateway gives you like the integration respose/request. If you check this, you won't be able to use that, it's like a workaround or a way to make all the logic inside the lambda.  

## Integration Request

We can change the data that reaches Lambda. We do this under Integration Request and under Body mapping, where we can change the behavior. But we also can change it by activating the Lambda Proxy Integration in order to forward the complete request object with all the metadata to the Lambda function. 

## Body Mapping Templates

If we want only wit the data that the Lambda needs, we need to pass only the data it needs and body mapping templates are helping to do so.

**Lambda function**
```js
exports.handler = function(event, context, callback) {
    const age = event.personDate.age * 2;
    callback(null, age); // 68 is the API response
};

```

**Body request**
```
{
    "personData": {
        "name": "Dimitri",
        "age": 34
    }
}
```

If we want to work only with the data we need and don't want to retrieve the data `event.personData.age` we can use body mapping templates. In case of request the data we pass into the lambda and in case of response the data that we send back from Lambda. In order to do so we are under the method we are clicking on "When there are no templates defined". 

1. We need to add a template and we need to name it "application/json". It means that incoming request with "Content-Type" application/json will be handled by this template. If we do so the body will be not forwarded by default anymore, but this teample will be used.

2. In order to create the templates we need to use the templating language from AWS. You can learn more about how to create such template [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html). If you want to see an example, simply click on **Method Request passthrough** in the body mapping template section. 

```js
{
"body-json" : $input.json('$'),
}

```
We leave only this stuff in the template, since it will extract data from the request body. We can also extract only specific data to pass to the lambda function.

```js
{
"age" : $input.json('$.personData.age'), // we assign the value to the "age" property
}

```
By creating a body mapping template as above the event parameter will only return the specific property.

`$input`refers to the request data (e.g. params, body etc.)
`.json()` we extract some data or some JSON from the `$input`
`$` refers to a request body to everything in it, on that we can simply use dot notation or array notation

Body mapping templates help us to restructure the input data and mapping a complex data to an easier one. And by doing so we have a clear separation between the API Gateway where we receive our request and work with and Lambda when we expect to get data in certain structure and do something with it. [Link:](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#input-variable-reference) 

json()  is a method on $input  which will retrieve a JSON representation of the data you access. $  here stands for the request body as a whole, $.person.name  therefore accesses the name property on the person property which is part of the whole requests body object.

The $input.json(...)  code is wrapped into quotation marks (" ) because it should be transformed into a string in this example (since both name and id are strings). If you were to access a number, boolean or object here, you would NOT wrap the expression in quotation marks.

Also in the integration response we can use body template mapping too.

If we want to use body mapping template for the integrated response, we can do the following:

```js
{
    "your-age": $input.json('$')
}
```

`$input` is the callback info sent back by Lambda, `json('$')` then gives us the data passed with the callback.

**Request body**
```js
{
    "personData": {
        "name": "Dimitri",
        "age": 34
    }
}
```
**Response**
```js
{
  "your-age": 34
}

```

## Query Parameters

Query parameters is a powerfull tool to have flexible APIs. For instance if someone wants to make a get request to get some variable data, which can't be hardcoded, that could be also the user id. But we can also use it for all different kind of scenarios such as user auth etc.