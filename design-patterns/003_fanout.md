# Fanout Pattern

# Applying the pub-sub and push-pull messaging patterns with AWS Lambda

[Source](https://hackernoon.com/applying-the-pub-sub-and-push-pull-messaging-patterns-with-aws-lambda-73d5ee346faa)

## pub / sub

* pub / sub is a pattern where often publishers and subscribers are decoupled through an intermediary broker (SNS, RabbitMQ)

* SNS will make 3 attempts for your function to process a message before sending it to a Dead Letter Queue.

* For each message SNS will create a new invocation of your function. If you publish 100 messages to SNS then you can have 100 concurrent executions of the subscribed Lambda function.

* However we are often constrained by the max throughput our downstream dependencies can handle (database, S3, external services)

* If there are too many messages, then you may loose some of them if the number of retries is not going to succeed. If the downstream resource is down, the same will happen.

* Kinesis on the other hand:
  - if the function returns an error or times out, then you'll keep receiving the same batch of records.
  - records are recieved in batches up to your specified maximum, NSN invokes your function with one message

* SNS is prone to suffer from termporal issues, burst in traffic, downstream outage. Kinesis on the other hand deals with these issues much better.

* Kinesis Streams is charged based on shard hours, so a dormant stream would have a base cost of $0.015 per shard per hour. (11$ per shard per month)

* Whilst there's baseline cost for using Kinesis Streams, the cost grows much slower with scale compared to SNS and DynamoDB Streams.

* Whilst SNS, Kinesis & DynamoDB Streams are your basic choices for the broker, the Lambda functions can also act as brokers in their own right and propagate events to other servies. This approach is used by [aws-lambda-fanout](https://github.com/aws-samples/aws-lambda-fanout). Be aware that you'll meet a lot of problems such as handling partial failures, dealing with downstream outages, misconfiguration etc.

## push-pull aka fan-out / fan-in

* Fan-out is often used on its own, where messages are delivered to a pool of workers in a round-robin fashioin and each message is delivered to only one worker. 

* This is useful in at least two different ways:
  -  having a pool of workers to carry out the actual work allows for parellel processing and leand to increated throughput
  -  if each message represents an expensive task that can be broken down into smaller subtasks that can be carried out in parallel.
  
* In the second case where the original task (say, a batch jos is partitioned into many subtasks, you'll need fan-in to collect result from individual workers and aggregate them together.

* SNS's invocation per message policy is a good fit here as we're optimizing fro throughput and parallelism during the fan-out stage. 

* The `ventilator`function would partition the expensive task into subtasks, and publish a message to SNS topic for each subtask.

![fan-out](https://cdn-images-1.medium.com/max/800/1*8diTCV4S66QFUI8InMPQEw.png)

## fan-in: collecting results from wokers

* When the `ventilator` function partition the original task into many subtasks, it can also include two identifiers with each subtask - one for the top level job, and one for the subtask. When the subtasks are completed, you can use the identifiers to record their result against. 

![fan-in](https://cdn-images-1.medium.com/max/800/1*WBmKMiod12DJOqOOx9i55w.png)

* Note that in both cases we're prone to experience hot partitions - large no.of writes agains the same DynamoDB hash key or S3 prefix. To mitigate this negative effect, be sure to use a GUID for the job ID.


# Messaging Fanout Pattern for Serverless Architectures Using Amazon SNS

[Source](https://aws.amazon.com/blogs/compute/messaging-fanout-pattern-for-serverless-architectures-using-amazon-sns/)

* When using Lambda in a serverless architecture, the goal should be to design tightly focused functions that do one thing and do it well.

* When these functions are composed to accomplish larger goals in microservice architectures, the complexity shifts fromt he internal components to the external communcation between components. Solutions builder can address this architectural challenge by using messaging patterns.

![fanout](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2017/07/25/messaging-fanout-for-serverless-with-sns-diagram1-1024x615.png)

* In the architecture, a laptop in the field captures the video from a camera source and diviced it into small fragments accroding to the HLS protocol. The fragments are published to Amazon S3, through an Amazon CloudFront distribution for accelerated upload. When the file has been written to S3, it triggers a Lambda function to initiate the video segment processing.

* Each Lambda function is invoked asynchronously, injecting the same S3 event that triggered the original Lambda function. 

## Refactoring fanout implementation using SNS

* When invoking a Lambda function, SNS wraps the original event with SNSEvent. The lambda function can be refactored by adding a function to parse the S3 event from SNSEvent.

* The Lambda function invocation can now be transferred from the fanout Lambda function to SNS without disruption to S3 processing. 

* As the diagram below shows, the resulting architecutre is similar to the original. The exception is that objects written to S3 now trigger a message to be published to an SNS topic. This sends the S3 event to multiple Lambda functions to be processed independently. 

![SNS fanout](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2017/07/25/messaging-fanout-for-serverless-with-sns-diagram2-1024x615.png)


# Lambda Fanout, What is it Good For?

[Source](https://www.trek10.com/blog/lambda-fanout/)

* At the beginning of any fanout is a single Lambda function that receives the initial request or event. From there, events are fired off to other instances of Lambda functions. In many situations, the responses then bubble back up to the initial function, and then the final response is passed back to the initial requester. 

![fanout](https://content.trek10.com/blog/lambda_fanout_whiteboard.png)

* One important thing to consider is that every single instantiation of Lambda function gets its own network, memory and CPU. That means that each additional Lambda call that happens as part of your fanout has as many resources as all the others. 

* If you have potential batch processing jbos, or something that you would traditionally either background or push off to the a queue / worker pool, this may be something worth considering.
  - Batch processing CSV / other data files
  - Extract Transform Load (ETL) Data Jobs
  - Notifications
  
 # Fanout S3 Event Notifications to Multiple Endpoints
 
 [Source](https://aws.amazon.com/blogs/compute/fanout-s3-event-notifications-to-multiple-endpoints/)
 
 ![Fanout](https://s3.amazonaws.com/awscomputeblogmedia/fanout-S3-usecase-diagram.png)
 
 * The above architecture is an event-driven general-purpose parallel data processing system - data enters S3, notification of new data is sent to SNS, which packages the S3 event notification as a message and delivers it to subscribers. The purpose of the subscribers is to create a layer of procesing which accomodates a wide variaety of data sizes and subsequently send the results of processing to some storage layer. 
 
* Examples use cases:
  - Image processing: master image must be resized
  - Application log processing: application log data must be processed to produce multiple log drivatives, e.g. formatted for operations, security, marketing
  - Content transformation: documents of one format e.g. microsoft word must be converter to mutiple other formats such as PDF, RTF.
  
![fanout](https://s3.amazonaws.com/awscomputeblogmedia/fanout-S3-simple-usecase-diagram.png)

* In the center of the architecture is the 'event mainfold' similar to a mechanical manifold, which intakes an event notification at one end (S3), transforms it to a message, and distributes it to all subscribers (data processing elements). This architecture allows customers to build an event-driven parallel data processing architecture that is fast, flexible, and easy to maintain over time. 



Other patterns:
https://read.acloud.guru/applying-the-decoupled-invocation-pattern-with-aws-lambda-2f5f7e78d18
https://www.infoq.com/presentations/big-data-serverless-aws-lambda
https://www.youtube.com/watch?v=Xi_WrinvTnM
https://thenewstack.io/serverless-architecture-five-design-patterns/
https://www.slideshare.net/AmazonWebServices/aws-reinvent-2016-serverless-architectural-patterns-and-best-practices-arc402
