# What is AWS Lambda

Lambda is a sevice which allows you to host your code on it and run it upon certain events. 

Lambda is a high-scale, provision-free serverless compute offering based on functions. It provides the cloud logic layer for your application. Lambda functions can be triggered by a variety of events that occur on AWS or on supporting third-party services. They enable you to build **reactive, event-driven systems.** When there are multiple, simultaneous events to respond to, Lambda simply runs more copies of the function in parallel. [Source](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)

We have different event sources:
* S3 (e.g. file gets uploaded): a file upload could trigger a Lambda function that it can transform it e.g. resize, analyse
* Cloudwatch (scheduled): basically like a cronjob trigger a new Lambda execution every x minutes useful for clean up etc.
* API Gateway (HTTP Request): you can run the code whenever a request hits the API Gateway
There are also many other event sources.

An example event source is API Gateway, which can invoke a Lambda function anytime an API method created with API Gateway receives an HTTPS request. Another example is Amazon SNS, which has the ability to invoke a Lambda function anytime a new message is posted to an SNS topic. Many event source options can trigger your Lambda function. For the full list, see this
documentation.10 Lambda also provides a RESTful service API, which includes the ability to directly invoke a Lambda function.11 You can use this API to execute your code directly without configuring another event source. [Source](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)

Here you can find the list of the event sources that can trigger AWS Lambda [link](https://docs.aws.amazon.com/lambda/latest/dg/invoking-lambda-function.html) OR you can invoke Lambda manually through their API [link](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html)

We want to focus on API Gateway. An HTTP request triggers our code next and this code is stored in Lambda and is written in Node.JS, Python, Java or C# (C Sharp). And when the code gets executed you can do any calculation interacting with other AWS services, like store/fetch data, send mails and at the end you will return a response or execute the callback and indicate that this function is done.

![AWS Lambda](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-lambda.png)

**Note:** In conjunction with API Gateway, where we have different resources and methods (get, post, delete), we can trigger different Lambda functions. 

### There are three arguments in the function:
* event: simply receives the event data and it depend on the event source what this will be. In the case of API Gateway this is configured by us, we can define which data we want to pass to Lambda.
* context: gives the information about the execution context, like the time it started, remaining time etc.
* callback: is a function itself that we do execute, which takes two arguments:
    + the first one is the error argument if it's null the function succeeded
    + the second is the data we want to pass back (if there will be an error the second argument will be omitted)

```js
exports.handler = (event, context, callback) => {
    // TODO
    callback(null, 'success');
};
```
## Handler

The handler defines the entry point what actually gets executed when this function gets called (`export.handler`). If we would simply add a function these would be a valid code, but it will be not called. The function that is going to be called is a method on the `exports` object. On that object we register a property name `handler`. It can have different names, we just need to register the function on that `exports` object. 

In the handler field `index.handler` the `index` refers to the overall code to the whole code in the Lambda and `handler` refers to the function we export in that code which gets executed once this Lambda function is triggered.

**Note:** When we upload a file we than need a file name index.js because this will be targeted by this index part and if you have a different file name you have to rename this index part too

## Role

All AWS services by default have no permissions. And Lambda needs to be allowed to do some things if you plan of using other AWS services. If we plan to access a database, you need to give this function a permission to do so. 

## How to import a Lambda function

1) Create a root entry file + handler method. For example an index.js  file with the exports.handler = (event, ...) => { ... }  method.

If you use a different file name AND/OR different starting handler function, you'll need to adjust your Lambda config! Set Handler to [FILENAME].[HANDLER-FUNCTION-NAME]  (default: index.handler).

2) You may split your code over multiple files and import them into the root file via require('file-path') . This is also how you could include other third-party JavaScript (or other languages) packages.

3) Select all files and then zip them into an archive. Important: DON'T put them into a folder and zip the folder. This will not work!

4) Upload the created zip file to Lambda ("Code" => "Code entry type" => "Upload a .ZIP file")

**Note:** CORS headers needs to be sent on each method and not only on the "preflight" options method.

# Introduction to Lambda by AWS 

[Source](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)

## The Handler

When a Lambda function is invoked, code execution begins at what is called the handler. The handler is a function that you have created and included in your package. You specify the handler when creating a Lambda function.

```js
exports.handlerName = function(event, context, callback) {
 ...
 // callback parameter is optional
}
```

Once the handler is successfully invoked inside your Lambda function, the runtime environment belongs to the code you've written. Your Lambda function if free to execute any logic you see fit, driven by the code you have written that starts in the handler. This means your handler can call other methods and functions within the files and classes you have uploaded. 

Your code can import third-party libraries that you have uploaded and install and execute native binaries that you have uploaded (as long as they can run on Amazon Linux). It can also interact with other AWS services or make API request to web services that it depends on, etc. 

## Excerpt: Creating a Deployment Package (Node.js)

To create a Lambda function you first create a Lambda function deployment package, a .zip file consisting of your code and any dependencies.

* Advanced scenario – If you are writing code that uses other resources, such as a graphics library for image processing, or you want to use the AWS CLI instead of the console, you need to first create the Lambda function deployment package, and then use the console or the CLI to upload the package.

**Note:** After you create a deployment package, you may either upload it directly or upload the .zip file first to an Amazon S3 bucket in the same AWS region where you want to create the Lambda function, and then specify the bucket name and object key name when you create the Lambda function using the console or the AWS CLI.

[Source](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html)

## The Event Object

When your function is invoked in one of the supported languages, one of the parameters provided to your handler function is an event object. The event differs in structure and contents, depending on which event source created it. The contents of the event parameter includes all of the data and metadata your Lambda function needs to drive its logic. For example, an event created by API Gateway will contain details related to the HTTPS request that was made by the API client (for example path, query string, body), whereas an event created by S3 when a new object is created will include details about the bucket and the new object. 

## The Context Object

Your Lambda function is also provided with the context object. The context object allows your function code to interact with the Lambda execution environment. The content and structure of the object vary, based on the language runtime your Lambda function is using, but at minimum it will contain:

* AWS RequestID: used to track specific of a Lambda function (important for error reporting)
* Remaining time: the amount of time in ms that remain before your function timeout occurs
* Logging: each language runtime provides the ability to stream log statements to Amazon CloudWatch Logs. The context object contains information about which CloudWatch Logs stream your log statements will be sent to. 

## Lambda Function Event Sources

Lambda provides an Invoke API [link](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html) it should be used for testing and operational purposes. Also there are many event sources that are AWS internally and can be used to invoke Lambda function if an event occurs. 

### Invokation Pattern

There are two models for invoking a Lambda function:

* Push Model: Your Lambda function is invoked every time a specific event occurs within another AWS service (for example, a new object is added to S3 bucket).
* Pull Model: Lambda polls a data source and invokes your function with any new record that arrive at the data source, batching new records together in a single function invocation (for example new records in an Amazon Kinesis or Amazon DynamoDB stream).

Also a Lambda function can be executed synchronously or asynchronously. You choose this using the parameter InvocationType that's provided when invoking the Lambda function. This parameter has three possible values:

1. RequestResponse - Execute synchronously
2. Event - Execut asynchronously
3. DryRun - Test that the invocation is permitted for the caller, but don't execute the function. 

**Note:** Each event source dictates how your function should be invoked. The event source is also responsible for crafting its own event parameter. The full list of the event sources and their definition you can find [here](https://docs.aws.amazon.com/lambda/latest/dg/invoking-lambda-function.html) Also you can find here a better visualization of the event sources and the attributes [click here](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)

## Lambda Function Configuration

Besides the code there are also some options for function configuration with Lambda.

## Versions and Aliases

There are times when you need to revert the code to the previous version it was deployed. Lambda lets you version your Lamba functions. Each Lambda function has a default version built in: $LATEST. You can address the most recent code that has been uploaded to your Lambda function through the $LATEST version. You can take a snapshot of the code that's currently referred to by $LATEST and create a numbered version through the PublishVersion API.

You can invoke each version of your Lambda function indepenently, at any time. Each version has it's own ARN (Amazon Resource Name), referenced like this:

```
arn:aws:lambda:[region]:[account]:function:[fn_name]:[version]
```

When calling the Invoke API or creating an event source for your Lambda function, you can also specify a specific version of the Lambda function to be executed. 

**Note:** It's important to know that a Lambda function container is specific to a particular version of your function. So, for example if there are already several function containers deployed and available in the runtime environment for version 5 of the function, version 6 of the same function will not be able to execute on top of existing version 5 containers - a different set of containers will be installed and managed for each function version.

Invoking functions by the version name can be useful during testing and operational activities. However it's not recommended to this, instead Lambda aliases should be used here. A function alias allows you to invoke and point event sources to a specific Lambda function version. 

However, you can update what version that alias refers to at any time. For example, your event sources and clients that are invoking version number 5 through the alias live may cut over to version number 6 of your function as soon as you update the live alias to instead point at version number 6. Each alias can be referred to within the ARN, similar to when referring to a function version number:

```
arn:aws:lambda:[region]:[account]:function:[fn_name]:[alias]
```
**Here are some example suggestions for Lambda aliases and how you might use them:**

* live/prod/active – This could represent the Lambda function version that your production triggers or that clients are integrating with.
* blue/green – Enable the blue/green deployment pattern through use of aliases.
* debug – If you’ve created a testing stack to debug your applications, it can integrate with an alias like this when you need to perform a deeper analysis.

Here is a youtube video that shows versioning Lambda in action [Youtube](https://www.youtube.com/watch?v=RL_GaxRpniQ)

**Note:** Once a version is published it's immutable, you cannot change the content of the version. If you want to change something you need to go back to the $LATEST version. If we want to define which Lambda version is active and which is not, we can go back to the API Gatway and and append the version of the function `Lambda_Function_Name:1` it will use the vesion 1 of the Lambda for e.g. /get/ request. By doing so we want use the latest version of the Lambda, we'll use the version 1 for production.

## How to work with different environments?

1. You just create a new version of the new Lambda function.
2. You need to go back to the API Gateway and change Lambda function to the version you have specified `Lambda_Function_Name:2` on the /get/ request. 
3. Instead of deploying to prod stage in the API Gateway we deploy it to the dev stage (the url is going to be different)
4. After testing the function and everything is working you can simply go to the Deployment History Tab and deploy under prod the test version that has been tested.

## Canary Testing

In software testing, a canary is a push of programming code changes to a small group of end users who are unaware that they are receiving new code. Because the canary is only distributed to a small number of users, its impact is relatively small and changes can be reversed quickly should the new code prove to be buggy. Canary tests, which are often automated, are run after testing in a sandbox environment has been completed. [Source](http://whatis.techtarget.com/definition/canary-canary-testing)

Under /prod/ stage we can go to the Canary tab in the API Gateway GUI and start testing the version.

## IAM Role

AWS Identity and Access Management (IAM) provides the capability to create IAM policies that define permissions for interacting with AWS services and APIs.

IAM Role = AWS Resource (like a user)
Policy = a set of rules that can be attached to the roles

In context of Lambda, you assign an IAM role (called an execution role) to each of your Lambda functions.The IAM policies attached to that role define what AWS service APIs your function code is authorized to interact with. 

**Note:** It’s important to assign each of your Lambda functions a specific, separate, and least-privilege IAM role. This strategy ensures that each Lambda function can evolve independently without increasing the authorization scope of any other Lambda functions.

## Environment Variables

Software Development Life Cycle (SDLC) best practice dictates that developers separate their code and their config. You can achieve this by using environment variables with Lambda. Environment variables for Lambda functions enable you to dynamically pass data to your function code and libraries without making changes to your code.

Each version of your Lambda function can have its own environment variable values. However, once the values are established for a numbered Lambda function environment variables, you can change them to the $LATEST version and then publish a new version that contains the new environment variable values. This enables you to always keep track of which environment variable values are associated with a previous version of your function. 

**Note:** Each Lambda version has it's own environment variables once they are assigned they cannot be changed if the new version has been published.

