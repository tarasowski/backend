# Serverless Architecture Best Practices

The [AWS Well-Architected Framework](http://d0.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf) includes strategies to help you compare your workload against our best practices, and obtain guidance to produce stable and efficient systems so you can focus on functional requirements. It is based on five pillars: security, reliability, performance efficiency, cost optimization, and operational excellence. 

## Security Best Practices

Designing and implementing security into your applications should always be priority number one—this doesn’t change with a serverless architecture.

* One IAM Role per Function: Each and every Lambda function within your AWS account should have a 1:1 relationship with an IAM role. Even if multiple functions begin with exactly the same policy, always decouple your IAM roles so that you can ensure least privilege policies for the future of your function. (one role per function)!!!

* Temporary AWS Credentials: You should not have any long-lived AWS credentials included within your Lambda function code or configuration. (This is a great use for static code analysis tools to ensure it never occurs in your code base!)

* Persisting Secrets: There are cases where you may have long-lived secrets (for example, database credentials, dependency service access keys, encryption keys, etc.) that your Lambda function needs to use. We recommend a few options for the lifecycle of secrets management in your application:
    + Lambda Environment Variables with Encryption Helpers: 
        - Advantages – Provided directly to your function runtime environment, minimizing the latency and code required to retrieve the secret.
        - Disadvantages – Environment variables are coupled to a function version. Updating an environment variable requires a new function version (more rigid, but does provide stable version history as well). 
    + [Amazon EC2 Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html): 
        - Advantages – Fully decoupled from your Lambda functions to provide maximum flexibility for how secrets and functions relate to each other 
        - Disadvantages – A request to Parameter Store is required to retrieve a parameter/secret. While not substantial, this does add latency over environment variables as well as an additional service dependency, and requires writing slightly more code.

* API Authorization: Using API Gateway as the event source for your Lambda function is unique from the other AWS service event source options in that you have ownership of authentication and authorization of your API clients. . For more
information about API security best practices, see this [documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html).

* Deployment Access Control: A call to the UpdateFunctionCode API is analogous to a code deployment. Moving an alias through the UpdateAlias API to that newly published version is analogous to a code release. Treat access to the Lambda APIs that enable function code/aliases with extreme sensitivity. As such, you should eliminate direct user access to these APIs for any functions (production functions at a minimum) to remove the possibility of human error. 

## Reliability Best Practices

Serverless applications can be built to support mission-critical use cases. Just as with any mission-critical application, it’s important that you architect with the mindset that Werner Vogels, CTO, Amazon.com, advocates for, “Everything fails all the time.” 

### High Availability

High-availability is important for production applications. The availability posture of your Lambda function depends on the number of Availability Zones it can be executed in.  If your function uses the default network environment, it is automatically available to execute within all of the Availability Zones in that AWS Region. Nothing else is required to configure high availability for your function in the default network environment.

### Fault Tolerance

If the application availability you need requires you to take advantage of multiple AWS Regions, you must take this into account up front in your design. It’s not a complex exercise to replicate your Lambda function code packages to multiple AWS Regions. What can be complex, like most multi-region application designs, is coordinating a failover decision across all tiers of your application stack. This means you need to understand and orchestrate the shift to another AWS Region—not just for your Lambda functions but also for your event sources (and dependencies further upstream of your event sources) and
persistence layers. In the end, a multi-region architecture is very applicationspecific. The most important thing to do to make a multi-region design feasible is to account for it in your design up front.

### Recovery

Consider how your serverless application should behave in the event that your functions cannot be executed. For use cases where API Gateway is used as the event source, this can be as simple as gracefully handling error messages and providing a viable, if degraded, user experience until your functions can be successfully executed again.

## Performance Efficiency Best Practices

Before we dive into performance best practices, keep in mind that if your use case can be achieved asynchronously, you might not need to be concerned with the performance of your function (other than to optimize costs). You can leverage one of the event sources that will use the event InvocationType or use the pull-based invocation model. Those methods alone might allow your application logic to proceed while Lambda continues to process the event separately. If Lambda function execution time is something you want to optimize, the execution duration of your Lambda function will be primarily impacted by three things (in order of simplest to optimize): 

1. The resources you allocate in the function configuration:  The amount of allocated RAM also impacts the amount of CPU time
and network bandwidth your function receives. Simply choosing the smallest resource amount that runs your function adequately fast is an anti-pattern. Because Lambda is billed in 100-ms increments, this strategy might not only add latency to your application, it might even be more expensive overall if the added latency outweighs the resource cost savings.

![Image](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-lambda-costs-execution-time.png)

**Note:** The memory usage for your function is determined per invocation and can be viewed in CloudWatch Logs.53 On each invocation a REPORT: entry is made, as shown below. 

```
REPORT RequestId: 3604209a-e9a3-11e6-939a-754dd98c7be3 Duration:
12.34 ms Billed Duration: 100 ms Memory Size: 128 MB Max Memory
Used: 18 MB
```
By analyzing the Max Memory Used: field, you can determine if your function needs more memory or if you over-provisioned your function's memory size. 

2. The language runtime you choose: Choosing a language runtime performance is obviously dependent on your level
of comfort and skills with each of the supported runtimes. But if performance is the driving consideration for your application, the performance characteristics of each language are what you might expect on Lambda as you would in another runtime environment: the compiled languages (Java and .NET) incur the largest initial startup cost for a container’s first invocation, but show the best performance for subsequent invocations. The interpreted languages (Node.js and Python) have very fast initial invocation times compared to the compiled languages, but can’t reach the same level of maximum performance as the compiled languages do. 


3. The code you write: Much of the performance of your Lambda function is dictated by what logic you
need your Lambda function to execute and what its dependencies are. We won’t cover what all those optimizations could be, because they vary from application to application. But there are some general best practices to optimize your code for Lambda. These are related to taking advantage of container reuse (as describes in the previous overview) and minimizing the initial cost of a cold start. Here are a few examples of how you can improve the performance of your function code when a warm container is invoked:
    - After initial execution, store and reference any externalized configuration or dependencies that your code retrieves locally.
    - Limit the reinitialization of variables/objects on every invocation (use global/static variables, singletons, etc.).
    - Keep alive and reuse connections (HTTP, database, etc.) that were established during a previous invocation

Finally, you should do the following to limit the amount of time that a cold start takes for your Lambda function:
    - Always use the default network environment unless connectivity to a resource within a VPC via private IP is required.
    - Choose an interpreted language over a compiled language.
    - Trim your function code package to only its runtime necessities. This reduces the amount of time that it takes for your code package to be downloaded from Amazon S3 ahead of invocation.

## Understanding Your Application Performance

To get visibility into the various components of your application architecture, which could include one or more Lambda functions, we recommend that you use AWS X-Ray.

![X-Ray](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-x-ray.png)

## Operational Excellence Best Practices

Creating a serverless application removes many operational burdens that a traditional application brings with it. But you still need to care about it.

### Logging

Each language runtime for Lambda provides a mechanism for your function to deliver logged statements to CloudWatch Logs. Making adequate use of logs goes without saying and isn’t new to Lambda and serverless architectures. For deployed functions,you depend heavily on the logs you create to inform an investigation of function behavior. Therefore, it’s especially important that the logs you do create find the right balance of verbosity to help track/triage issues as they occur without demanding too much additional compute time to create them.

### Metrics and Monitoring

Lambda, just like other AWS services, provides a number of CloudWatch metrics out of the box. These include metrics related to the number of invocations a function has received, the execution duration of a function, and others. It’s best practice to create alarm thresholds (high and low) for each of your Lambda functions on all of the provided metrics through CloudWatch. A major change in how your function is invoked or how long it takes to execute could be your first indication of a problem in your architecture.

### Deployment

Performing a deployment in Lambda is as simple as uploading a new function code package, publishing a new version, and updating your aliases. However, these steps should only be pieces of your deployment process with Lambda. Each deployment process is application-specific. To design a deployment process that avoids negatively disrupting your users or application behavior, you need to understand the relationship between each Lambda function and its event sources and dependencies. Things to consider are:

* Parallel version invocations: Updating an alias to point to a new version of a Lambda function happens asynchronously on the service side. There will be a short period of time that existing function containers containing the previous source code package will continue to be invoked alongside the new function version the alias has been updated to.

* Deployment schedule: Performing a Lambda function deployment during a peak traffic time could result in more cold start times than desired. You should always perform your function deployments during a low traffic period to minimize the immediate impact of the new/cold function containers being provisioned in the Lambda environment.

* Rollback: Lambda provides details about Lambda function versions (for example, created time, incrementing numbers, etc.). However, it doesn’t logically track how your application lifecycle has been using those versions.

### Load Testing

Load test your Lambda function to determine an optimum timeout value. It’s important to analyze how long your function runs so that you can better determine any problems with a dependency service that might increase the concurrency of the function beyond what you expect. This is especially important when your Lambda function makes network calls to resources that
may not handle Lambda’s scaling.

### Triage and Debugging

Both logging to enable investigations and using X-Ray to profile applications are useful to operational triages. Additionally, consider creating Lambda function aliases that represent operational activities such as integration testing, performance testing, debugging, etc. It’s common for teams to build out test suites or segmented application stacks that serve an operational purpose. You should build these operational artifacts to also integrate with Lambda functions via aliases. However, keep in mind that aliases don’t enforce a wholly separate Lambda function container. So an alias like PerfTest that points at function version number N, will use the same function containers as all other aliases pointing at version N. You should define appropriate versioning and alias updating processes to ensure separate containers are invoked where required.

## Serverless Development Best Practices

### Infrastructure as Code – the AWS Serverless Application Model (AWS SAM)

The AWS Serverless Application Model (AWS SAM) enables you to have a simpler experience when building serverless applications and get the benefits of infrastructure as code. AWS SAM is an open specification abstraction layer on top of AWS CloudFormation. It provides a set of command line utilities that enable you to define a full serverless application stack with only a handful of lines of JSON or YAML, package your Lambda function code together with that infrastructure definition, and then deploy them together to AWS. We recommend using AWS SAM combined with AWS CloudFormation to define
and make changes to your serverless application environment. [SAM AWS Github](https://github.com/awslabs/serverless-application-model)

### Local Testing – AWS SAM Local

Along with AWS SAM, AWS SAM Local offers additional command line tools that you can add to AWS SAM to test your serverless functions and applications locally before deploying them to AWS.58 AWS SAM Local uses Docker to enable you to quickly test your developed Lambda functions using popular event sources (for example, Amazon S3, DynamoDB, etc.). You can locally test an API you define in your SAM template before it is created in API Gateway. You can also validate the AWS SAM template that you created. By enabling these capabilities to run against Lambda functions still residing within your developer workstation,you can do things like view logs locally, step through your code in a debugger, and quickly iterate changes without having to deploy a new code package to AWS. [SAM Local Github](https://github.com/awslabs/aws-sam-local)

## Coding and Code Management Best Practices

When developing code for Lambda functions, there are some specific recommendations around how you should both write and organize code so that managing many Lambda functions doesn’t become a complex task.

* Business Logic outside the Handler: Your Lambda function starts execution at the handler function you define
within your code package. Within your handler function you should receive the parameters provided by Lambda, pass those parameters to another function to parse into new variables/objects that are contextualized to your application, and then reach out to your business logic that sits outside the handler function and file. This enables you to create a code package that is as decoupled from the Lambda runtime environment as possible. This will greatly benefit your ability to test your code within the context of objects and functions you’ve created and reuse the business logic you’ve written in other environments outside of Lambda.

* Warm Containers—Caching/Keep-Alive/Reuse: you should write code that takes advantage of a warm function container. This means scoping your variables in a way that they and their contents can be reused on subsequent invocations where possible. 

* Control Dependencies: The Lambda execution environment contains many libraries such as the AWS
SDK for the Node.js and Python runtimes. (For a full list, see the Lambda Execution Environment and Available Libraries.59) To enable the latest set of features and security updates, Lambda periodically updates these libraries. These updates can introduce subtle changes to the behavior of your Lambda function. To have full control of the dependencies your function uses, we recommend packaging all your dependencies with your deployment package.

* Trim Dependencies: Lambda function code packages are permitted to be at most 50 MB when compressed and 250 MB when extracted in the runtime environment. If you are including large dependency artifacts with your function code, you may need to trim the dependencies included to just the runtime essentials. This also allows your Lambda function code to be downloaded and installed in the runtime environment more quickly for cold starts.

* Fail Fast: Configure reasonably short timeouts for any external dependencies, as well as a reasonably short overall Lambda function timeout. Don’t allow your function to spin helplessly while waiting for a dependency to respond. Because Lambda is
billed based on the duration of your function execution, you don’t want to incur higher charges than necessary when your function dependencies are unresponsive.

* Handling Exceptions: More information you can find there how to handle exceptions on Lambda [link](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-mode-exceptions.html)

* Code Repository Organization: We recommend that you organize your Lambda function source code to be very fine-grained within your source code management solution of choice. This usually means having a 1:1 relationship between Lambda functions and code repositories or repository projects. (The lexicon differs from one source code management tool to another.) However,if you are following a strategy of creating separate Lambda functions for different lifecycle stages of the same
logical function (that is, you have two Lambda functions, one called MyLambdaFunction-DEV and another called MyLambdaFunction-PROD), it makes sense to have those separate Lambda functions share a code base (perhaps deploying from separate release branches).

* Release Branches: We recommend that you create a repository or project branching strategy that enables you to correlate Lambda function deployments with incremental commits on a release branch. 

## Continuous Delivery

We recommend that you programmatically manage all of your serverless deployments through CI/CD pipelines. This is because the speed with which you will be able to develop new features and push code changes with Lambda will allow you to deploy much more frequently. Manual deployments, combined with a need to deploy more frequently, often result in both the manual process becoming a bottleneck and prone to error. The capabilities provided by AWS CodeCommit, AWS CodePipeline, AWS
CodeBuild, AWS SAM, and AWS CodeStar provide a set of capabilities that you can natively combine into a holistic and automated serverless CI/CD pipeline (where the pipeline itself also has no infrastructure that you need to manage).

There are a number of sample serverless architectures and instructions for recreating them in your own AWS account. You can find them on GitHub. [Serverless Workshops](https://github.com/awslabs/aws-serverless-workshops)

### Not clear, need more clarification

- [ ] Business Logic outside the Handler: Separate the Lambda handler (entry point) from your core logic. This allows you to make a more unit-testable function. In Node.js this may look like:

```js
exports.myHandler = function(event, context, callback) {
	var foo = event.foo;
	var bar = event.bar;
	var result = MyLambdaFunction (foo, bar);
 
	callback(null, result);
}
 
function MyLambdaFunction (foo, bar) {
	// MyLambdaFunction logic here
}
```

[More Best Practices here](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)




[Source](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)