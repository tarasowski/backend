# Serverless Architecture with AWS Lambda (Whitepaper)

[Source](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)

serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 54-56 | Added on Saturday, July 7, 2018 12:29:31 PM

Lambda also provides a RESTful service API, which includes the ability to directly invoke a Lambda function.11 You can use this API to execute your code directly without configuring another event source.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 59-60 | Added on Saturday, July 7, 2018 12:30:09 PM

Your Lambda function runs within a (simplified) architecture that looks like the one shown in Figure 2. Figure 2: Simplified architecture of a running Lambda function
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 76-78 | Added on Saturday, July 7, 2018 1:03:06 PM

The Lambda runtime environment is based on an Amazon Linux AMI (see current environment details here), so you should compile and test the components you plan to run inside of Lambda within a matching environment.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 86-87 | Added on Saturday, July 7, 2018 1:04:18 PM

When you create a Lambda function (through the AWS Management Console, or using the CreateFunction API) you can reference the S3 bucket and object key where you’ve uploaded the package.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 133-134 | Added on Saturday, July 7, 2018 1:11:05 PM

Figure 3: Invocations of warm function containers and cold function containers
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 144-145 | Added on Saturday, July 7, 2018 1:12:31 PM

Push Model – Your Lambda function is invoked every time a particular event occurs within another AWS service (for example, a new object is added to an S3 bucket).
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 145-147 | Added on Saturday, July 7, 2018 1:12:39 PM

Pull Model – Lambda polls a data source and invokes your function with any new records that arrive at the data source, batching new records together in a single function invocation (for example, new records in an Amazon Kinesis or Amazon DynamoDB stream).
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 147-150 | Added on Saturday, July 7, 2018 1:13:14 PM

Also, a Lambda function can be executed synchronously or asynchronously. You choose this using the parameter InvocationType that’s provided when invoking a Lambda function. This parameter has three possible values: • RequestResponse – Execute synchronously. • Event – Execute asynchronously. • DryRun – Test that the invocation is permitted for the caller, but don’t execute the function.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 162-165 | Added on Saturday, July 7, 2018 1:15:17 PM

If you want an API to invoke your function asynchronously as an event and return immediately with an empty response, you can use API Gateway as an AWS Service Proxy and integrate with the Lambda Invoke API, providing the Event InvocationType in the request header. This is a great option if your API clients don’t need any information back from the request and you want the fastest response time possible. (This option is great for pushing user interactions on a website or app to a service backend for analysis.)
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 183-185 | Added on Saturday, July 7, 2018 1:17:12 PM

Invocation Model Pull Invocation Type Request/Response Description Lambda will poll a DynamoDB stream multiple times per second and invoke your Lambda function with the batch of updates that have been published to the stream since the last batch. You can configure the batch size of each invocation. Example Use Cases
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 182-185 | Added on Saturday, July 7, 2018 1:17:22 PM

Amazon DynamoDB Invocation Model Pull Invocation Type Request/Response Description Lambda will poll a DynamoDB stream multiple times per second and invoke your Lambda function with the batch of updates that have been published to the stream since the last batch. You can configure the batch size of each invocation.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 214-217 | Added on Saturday, July 7, 2018 1:21:53 PM

However, we don’t recommend having your Lambda function be triggered by a specific version number for real application traffic. Doing so would require you to update all of the triggers and clients invoking your Lambda function to point at a new function version each time you wanted to update your code. Lambda aliases should be used here, instead. A function alias allows you to invoke and point event sources to a specific Lambda function version.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 218-220 | Added on Saturday, July 7, 2018 1:22:36 PM

However, you can update what version that alias refers to at any time. For example, your event sources and clients that are invoking version number 5 through the alias live may cut over to version number 6 of your function as soon as you update thelivealias to instead point at version number
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 253-254 | Added on Saturday, July 7, 2018 1:24:22 PM

Here are some example suggestions for Lambda aliases and how you might use them: • live/prod/active – This could represent the Lambda function version that your production triggers or that clients are integrating with.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 254-255 | Added on Saturday, July 7, 2018 1:24:27 PM

blue/green – Enable the blue/green deployment pattern through use of aliases.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 255-256 | Added on Saturday, July 7, 2018 1:24:32 PM

debug – If you’ve created a testing stack to debug your applications, it can integrate with an alias like this when you need to perform a deeper analysis.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 262-264 | Added on Saturday, July 7, 2018 1:25:30 PM

There are two benefits: • Your source code isn’t required to perform any AWS credential management or rotation to interact with the AWS APIs. Simply using the AWS SDKs and the default credential provider results in your Lambda function automatically using temporary credentials associated with the execution
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 265-267 | Added on Saturday, July 7, 2018 1:25:48 PM

Your source code is decoupled from its own security posture. If a developer attempts to change your Lambda function code to integrate with a service that the function doesn’t have access to, that integration will fail due to the IAM role assigned to your function.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 267-268 | Added on Saturday, July 7, 2018 1:25:54 PM

(Unless they have used IAM credentials that are separate from the execution role, you should use static code analysis tools to ensure that no AWS credentials are present in your source code).
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 268-270 | Added on Saturday, July 7, 2018 1:26:43 PM

It’s important to assign each of your Lambda functions a specific, separate, and least-privilege IAM role. This strategy ensures that each Lambda function can evolve independently without increasing the authorization scope of any other Lambda functions.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 274-275 | Added on Saturday, July 7, 2018 1:27:36 PM

However, to ensure least privilege IAM policies, you should create your own IAM roles with resourcespecific policies to permit access to just the intended event source.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 276-277 | Added on Saturday, July 7, 2018 1:38:11 PM

Executing your Lambda function occurs through the use of the Invoke API that is part of the AWS Lambda service APIs;
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 290-291 | Added on Saturday, July 7, 2018 1:39:56 PM

Software Development Life Cycle (SDLC) best practice dictates that developers separate their code and their config. You can achieve this by using environment variables with Lambda.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 293-295 | Added on Saturday, July 7, 2018 1:40:34 PM

For any sensitive information that will be stored as a Lambda function environment variable, we recommend you encrypt those values using the AWS Key Management Service (AWS KMS) prior to function creation, storing the encrypted cyphertext as the variable value. Then have your Lambda function decrypt that variable in memory at execution time.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 305-307 | Added on Saturday, July 7, 2018 1:42:56 PM

If an exception occurs when trying to invoke your function in these models, the invocation will be attempted two more times (with back-off between the retries). After the third attempt, the event is either discarded or placed onto a dead letter queue, if you configured one for the function.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 307-309 | Added on Saturday, July 7, 2018 1:43:23 PM

dead letter queue is either an SNS topic or SQS queue that you have designated as the destination for all failed invocation events. If a failure event occurs, the use of a dead letter queue allows you to retain just the messages that failed to be processed during the event.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 318-321 | Added on Saturday, July 7, 2018 1:52:12 PM

Also, once execution completes or a timeout occurs for your Lambda function and a response is returned, all execution ceases. This includes any background processes, subprocesses, or asynchronous processes that your Lambda function might have spawned during execution. So you should not rely on background or asynchronous processes for critical activities.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 321-321 | Added on Saturday, July 7, 2018 1:52:23 PM

Your code should ensure those activities are completed prior to timeout or returning a response from your function.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 337-338 | Added on Saturday, July 7, 2018 1:54:04 PM

There is still a shared responsibility model for serverless security.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 339-341 | Added on Saturday, July 7, 2018 1:54:32 PM

you ensure security best practices through writing secure application code, tight access control over source code changes, and following AWS security best practices for each of the services that your Lambda functions integrate with.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 343-345 | Added on Saturday, July 7, 2018 1:55:04 PM

Each and every Lambda function within your AWS account should have a 1:1 relationship with an IAM role. Even if multiple functions begin with exactly the same policy, always decouple your IAM roles so that you can ensure least privilege policies for the future of your function.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 346-349 | Added on Saturday, July 7, 2018 1:55:37 PM

You should not have any long-lived AWS credentials included within your Lambda function code or configuration. (This is a great use for static code analysis tools to ensure it never occurs in your code base!) For most cases, the IAM execution role is all that’s required to integrate with other AWS services.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 364-366 | Added on Saturday, July 7, 2018 1:57:30 PM

There are cases where you may have long-lived secrets (for example, database credentials, dependency service access keys, encryption keys, etc.) that your Lambda function needs to use. We recommend a few options for the lifecycle of secrets management in your application: o Lambda Environment Variables with Encryption Helpers45
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 373-373 | Added on Saturday, July 7, 2018 1:58:26 PM

Secrets should always only exist in memory and never be logged or written to disk.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 393-395 | Added on Saturday, July 7, 2018 2:00:58 PM

“Everything fails all the time.” For serverless applications, this could mean introducing logic bugs into your code, failing application dependencies, and other similar applicationlevel issues that you should try and prevent and account for using existing best practices that will still apply to your serverless applications.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 400-401 | Added on Saturday, July 7, 2018 2:01:39 PM

If your function is deployed within your own VPC, the subnets (and their respective Availability Zones) define if your function remains available in the event of an Availability Zone outage.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 412-415 | Added on Saturday, July 7, 2018 2:03:26 PM

For asynchronous use cases, it can be very important to still ensure that no function invocations are lost during the outage period. To ensure that all received events are processed after your function has recovered, you should take advantage of dead letter queues and implement how to process events placed on that queue after recovery occurs.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 418-420 | Added on Saturday, July 7, 2018 2:04:12 PM

If Lambda function execution time is something you want to optimize, the execution duration of your Lambda function will be primarily impacted by three things (in order of simplest to optimize): the resources you allocate in the function configuration, the language runtime you choose, and the code you write.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 427-430 | Added on Saturday, July 7, 2018 2:05:16 PM

There will also be a resource threshold where any additional RAM/CPU/bandwidth available to your function no longer provides any substantial performance gain. However, pricing increases linearly as the resource levels increase in Lambda. Your tests should find where the logarithmic function bends to choose the optimal configuration for your function.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 434-436 | Added on Saturday, July 7, 2018 2:06:48 PM

The memory usage for your function is determined per invocation and can be viewed in CloudWatch Logs.53 On each invocation a REPORT: entry is made, as shown below.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 436-437 | Added on Saturday, July 7, 2018 2:06:52 PM

REPORT RequestId: 3604209a-e9a3-11e6-939a-754dd98c7be3 Duration: 12.34 ms Billed Duration: 100 ms Memory Size: 128 MB Max Memory Used: 18 MB
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 437-439 | Added on Saturday, July 7, 2018 2:06:58 PM

By analyzing theMax Memory Used: field, you can determine if your function needs more memory or if you over-provisioned your function's memory size.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 451-454 | Added on Saturday, July 7, 2018 2:09:23 PM

After initial execution, store and reference any externalized configuration or dependencies that your code retrieves locally. • Limit the reinitialization of variables/objects on every invocation (use global/static variables, singletons, etc.). • Keep alive and reuse connections (HTTP, database, etc.) that were established during a previous invocation.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 451-452 | Added on Saturday, July 7, 2018 2:09:34 PM

invoked: • After initial execution, store and reference any externalized configuration or dependencies that your code retrieves locally.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 451-452 | Added on Saturday, July 7, 2018 2:09:39 PM

After initial execution, store and reference any externalized configuration or dependencies that your code retrieves locally.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 452-453 | Added on Saturday, July 7, 2018 2:09:44 PM

Limit the reinitialization of variables/objects on every invocation (use global/static variables, singletons, etc.).
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 453-454 | Added on Saturday, July 7, 2018 2:09:50 PM

Keep alive and reuse connections (HTTP, database, etc.) that were established during a previous invocation.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 457-458 | Added on Saturday, July 7, 2018 2:10:23 PM

3. Trim your function code package to only its runtime necessities. This reduces the amount of time that it takes for your code package to be downloaded from Amazon S3 ahead of invocation.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 473-475 | Added on Saturday, July 7, 2018 2:12:34 PM

We recommend that you make use of Lambda environment variables to create a LogLevel variable that your function can refer to so that it can determine which log statements to create during runtime. Appropriate use of log levels can ensure that you have the ability to selectively incur the additional compute cost and storage cost only during an operational triage.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 477-478 | Added on Saturday, July 7, 2018 2:15:09 PM

It’s best practice to create alarm thresholds (high and low) for each of your Lambda functions on all of the provided metrics through CloudWatch.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 497-499 | Added on Saturday, July 7, 2018 2:18:29 PM

Deployment schedule – Performing a Lambda function deployment during a peak traffic time could result in more cold start times than desired. You should always perform your function deployments during a low traffic period
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 513-515 | Added on Sunday, July 8, 2018 1:28:24 PM

Right-Sizing As covered in Performance Efficiency, it’s an anti-pattern to assume that the smallest resource size available to your function will provide the lowest total cost.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 515-516 | Added on Sunday, July 8, 2018 1:28:32 PM

If your function’s resource size is too small, you could pay more due to a longer execution time than if more resources were available that allowed your function to complete more quickly.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 550-552 | Added on Sunday, July 8, 2018 1:32:23 PM

By enabling these capabilities to run against Lambda functions still residing within your developer workstation, you can do things like view logs locally, step through your code in a debugger, and quickly iterate changes without having to deploy a new code package to AWS.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 557-561 | Added on Sunday, July 8, 2018 1:33:34 PM

Your Lambda function starts execution at the handler function you define Business Logic outside the Handler within your code package. Within your handler function you should receive the parameters provided by Lambda, pass those parameters to another function to parse into new variables/objects that are contextualized to your application, and then reach out to your business logic that sits outside the handler function and file. This enables you to create a code package that is as decoupled from the Lambda runtime environment as possible.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 561-563 | Added on Sunday, July 8, 2018 1:33:49 PM

This will greatly benefit your ability to test your code within the context of objects and functions you’ve created and reuse the business logic you’ve written in other environments outside of Lambda.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 565-568 | Added on Sunday, July 8, 2018 1:34:38 PM

As mentioned earlier, you should write code that takes advantage of a warm Warm Containers—Caching/Keep-Alive/Reuse function container. This means scoping your variables in a way that they and their contents can be reused on subsequent invocations where possible. This is especially impactful for things like bootstrapping configuration, keeping external dependency connections open, or one-time initialization of large objects that can persist from one invocation to the next.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 572-572 | Added on Sunday, July 8, 2018 1:35:00 PM

To have full control of the dependencies your function uses, we recommend packaging all your dependencies with your deployment package.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 576-577 | Added on Sunday, July 8, 2018 1:35:44 PM

Configure reasonably short timeouts for any external dependencies, as well as a Fail Fastreasonably short overall Lambda function timeout. Don’t allow your function to spin helplessly while waiting for a dependency to respond.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 594-594 | Added on Sunday, July 8, 2018 1:38:01 PM

(The lexicon differs from one source code management tool to another.) However, if you are following
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 593-597 | Added on Sunday, July 8, 2018 1:38:09 PM

This usually means having a 1:1 relationship between Lambda functions and code repositories or repository projects. (The lexicon differs from one source code management tool to another.) However, if you are following a strategy of creating separate Lambda functions for different lifecycle stages of the same logical function (that is, you have two Lambda functions, one called MyLambdaFunction-DEV and another called MyLambdaFunction-PROD), it makes sense to have those separate Lambda functions share a code base (perhaps deploying from separate release branches).
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 607-608 | Added on Sunday, July 8, 2018 1:39:53 PM

However, serverless architectures will enforce proper unit testing practices perhaps more than you’re used to.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 609-612 | Added on Sunday, July 8, 2018 1:40:39 PM

It’s important to scope all of your unit test cases down to a single code path within a single logical function, mocking all inputs from upstream and outputs from downstream. This allows you to isolate your test cases to only the code that you own. When writing unit tests, you can and should assume that your dependencies behave properly based on the contracts your code has with them as APIs, libraries, etc.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 612-614 | Added on Sunday, July 8, 2018 1:40:56 PM

It’s similarly important for your integration tests to test the integration of your code to its dependencies in an environment that mimics the live environment. Testing whether a developer laptop
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 612-614 | Added on Sunday, July 8, 2018 1:41:06 PM

It’s similarly important for your integration tests to test the integration of your code to its dependencies in an environment that mimics the live environment. Testing whether a developer laptop
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 612-613 | Added on Sunday, July 8, 2018 1:41:16 PM

It’s similarly important for your integration tests to test the integration of your code to its dependencies in an environment that mimics the live environment.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 616-618 | Added on Sunday, July 8, 2018 1:42:06 PM

Unit Tests With what we’ve said earlier in mind, we recommend that you unit test your Lambda function code thoroughly, focusing mostly on the business logic outside your handler function. You should also unit test your ability
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 616-618 | Added on Sunday, July 8, 2018 1:42:18 PM

With what we’ve said earlier in mind, we recommend that you unit test your Lambda function code thoroughly, focusing mostly on the business logic outside your handler function.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 618-619 | Added on Sunday, July 8, 2018 1:42:34 PM

However, the bulk of your logic and tests should occur with mocked objects and functions that you have full control over within your code base.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 619-621 | Added on Sunday, July 8, 2018 1:42:56 PM

If you feel that there are important things inside your handler function that need to be unit tested, it can be a sign you should encapsulate and externalize the logic in your handler function further.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 622-624 | Added on Sunday, July 8, 2018 1:43:23 PM

Integration Testing For integration tests, we recommend that you create lower lifecycle versions of your Lambda functions where your code packages are deployed and invoked through sample events that your CI/CD pipeline can trigger and inspect the results of.
==========
serverless-architectures-with-aws-lambda (dimitri@tarasowski.de)
- Your Highlight on Location 625-627 | Added on Sunday, July 8, 2018 1:44:25 PM

We recommend that you programmatically manage all of your serverless deployments through CI/CD pipelines. This is because the speed with which you will be able to develop new features and push code changes with Lambda will allow you to deploy much more frequently
==========
