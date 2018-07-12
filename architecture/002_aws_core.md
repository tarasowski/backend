# Core Serverless Services

**Which Services do we need?**
If you have a mobile app you don't need to host it somewhere. But if you build a web app you need also hosting for the frontend part. 

### We are starting with a static app, single page application built with Angular/React:

* APP (frontend): We need to host our application and the best place to do that is to host it on S3 (Simple Storage Service)
    + Since it's a simple static app we can store it there, but if we need to render etc. S3 is not the right place

* API (routing): We need a Restful API and we can use for it the API Gateway from Amazon

* Business Logic: So if we receive a request we need to do something. This is where Lambda comes in. Lambda allows us to execute code on demand. But we are not limited to a API request as an event, there are other events too that can execute the code.

* Database: We can use DynamoDB (NOSQL) for storing/quering and delivering data back as a response to the API calls.

* Authentication: We might have an app where we need to authenticate users. Where we might allow users to signup. We can also use a service for that. Amazon Web services Cognito. That is the service where we can easily create user pools and allow users to signup/login to use our services. We can protect our API with Cognito. 

* DNS: If we have an app, a web app hosted on S3, we probably want to have our own url and we can use Route53 another AWS service. Route53 allows us to register and configure our own domain. So whenever we receive a request to this domain we load the app from the S3 storage.

* Cache: Optional step, but if we want to improve the performance, the delivery time. We can use a caching service from AWS and it's called Cloudfront.

![Serverless](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-core-services.png)

**Note:** If you have an mobile app you only need: API, Lambda (Logic), DB, Authentication