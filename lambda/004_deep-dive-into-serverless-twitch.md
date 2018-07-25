# Deploying and Publishing Serverless Apps

You can find the video here on [twitch deep dive into serverless](https://www.twitch.tv/videos/239114858)



## Serverless patterns

Serverless pushes you in the direction of reactive - event-driven architecture. Serverless application allows to to take pieces of a larger system and compriptomize them, make them easier to test and deploy into your application as pieces. 

Useful stuff: (AWS Serverless Application Repository): The AWS Serverless Application Repository enables you to quickly deploy code samples, components, and complete applications for common use cases such as web and mobile back-ends, event and data processing, logging, monitoring, IoT, and more [click here to go to the repo](https://aws.amazon.com/serverless/serverlessrepo/?nc1=h_ls)

## AWS Serverless SQS Event Source

This serverless app periodically polls a given SQS queue and invokes a given lambda function to process messages. The app handles all interactions with the SQS queue and gives a simple interface for your lambda function to indicate a message was processed successfully or if it should be retried (with a configurable retry delay).
[Here is the repo](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:077246666028:applications~aws-serverless-sqs-event-source)

## Additional Event Sources

Right now Lambda has native event sources e.g. S3 you put an object into S3 bucket it can trigger you Lambda function to do something. You write to dynamodb and event came off dynamodb stream and trigger your Lambda function to do something. One service that is not integrated as an event source for Lambda is SQS (simple queue service). So what they have done, they have built an app that turns SQS into an event source. Link see above. 

You don't need to worry about managing SQS queue, you can simply write a Lambda function that can process messages.

**Why SQS queue is important?**
So in distributed or service-oriented architecture you end up with many different services and for one request you need to interact with multiple. The initial approach is kind of fully synchronous approach, that means is when a request comes is to create an order, behind the scenes you may need to call the order service, the customer service and some shopping cart sessions. If you call all these things synchronously and block on them before responding to that request. You will get higher latancy and if any one of the services having issues it will effect the customer experience. 

In a distributed system queue is acting as a buffer async buffer between all these services, which allows them to be more fault-tolerant. And it does transform the processing into more asynchronous model instead of synchronous.

![Architecture](https://github.com/awslabs/aws-serverless-sqs-event-source/raw/master/images/app-architecture.png)

We have Cloudwatch event rules (cronjob - intervall) this triggers your Lambda at a particular rate. Apps allow you to pass parameters to the app, so app have parametirized the SQS queue and your Lambda that's the message processor. The app in the picture Cloudwatch + SQSPoller polls the messages from a SQS queue in regular time intervals. If it succeeded it will delete the message from the queue and if you failed and need a retry and will interact with the queue as well.

**Note:** SQSPolller Lambda in this case is written in Java, but the other Lambda can be written in whatever languages you want. 

To use this app, you need to deploy it and configure it. You don't have to worry where the code is stored etc.

## AWS Serverless Twitter Event Source

![Twitter Event Source](https://github.com/awslabs/aws-serverless-twitter-event-source/raw/master/images/app-architecture.png)

[Here is the link to the repo](https://github.com/awslabs/aws-serverless-twitter-event-source)

We have here the Cloudwatch that trigger the function TwitterSearchPoller into an event source that triggers TweetProcessor. Twitter has search API and what this app does what ever search term you define it will periodically search twitter and the json for the tweets that returns and that list of returned tweets gets passed to whatever function you define. So twitter is an event source now!!!

**Some other useful links:**
* SQS to Lambda (via Lambda) [Repository](https://github.com/zwily/sqs-to-lambda-via-lambda)
* Introducing LambdaClock [Repository](https://www.trek10.com/blog/lambdaclock/)

Some of the best practices of using Lambda is to try to minimise the frameworks we are using. It's very common is to use libraries that allow you to do dependency injections. In the example he is showing dagger (Java). What is dependency injection? Dependency injection is a software design pattern in which one or more dependencies (or services) are injected, or passed by reference, into a dependent object. [Source](https://blog.risingstack.com/dependency-injection-in-node-js/)

**Note:** Separate the initialisation logic from the business logic itself. Don't put into handler request method take it out, because Lambda goes into two stages, the first stage is initialisation and the other one is the others. When the very first time your Lambda is invoked it goes through the process that is called cold-start so at the code start your Lambda is initialized, the code is download from S3 and this initializer in Java (the default constructor is invoked) any common setup you want to do is done there. Then there is handleRequest method methods.exports.handler is static and everything outside is initialized. He is using dagger to do all the initialization. So what the `method.exports.handler` is doing it actually invokes the methods from the object that was constructed during the initialization phase. 

Here is the app that manages the Retweet Leaderboard from the example ![Github Repo](https://github.com/jlhood/retweet-leaderboard)

![Architecture](https://github.com/jlhood/retweet-leaderboard/raw/master/images/app-architecture.png)




# Todo:
* Read about dependency injection in node.js [link](https://blog.risingstack.com/dependency-injection-in-node-js/)
* Dependency Injection in Node.js series [link](https://medium.com/@Jeffijoe/dependency-injection-in-node-js-2016-edition-f2a88efdd427)