# When to use what

Let me try to create a table for different use cases when to use use what.

| Description | Queues (SQS)  | Pub/Sub (SNS) | Streams (Kinesis) |
| ----------- | ------------- | ------------- | ----------------- |
|    What?   | Queues are used to decouple message producers from message consumers. This is one way to architect for scale and reliability.     | Amazon Simple Notification Service (Amazon SNS) is a web service that coordinates and manages the delivery or sending of messages to subscribing endpoints or clients.  | Kinesis’ primary use case is collecting, storing and processing real-time continuous data streams. Data streams are data that are generated continuously by thousands of data sources, which typically send in the data records simultaneously, and in small sizes (order of Kilobytes). |       
| When?         | Let's say you've built a mobile voting app for a popular TV show and 5 to 25 million viewers are all voting at the same time (at the end of each performance). How are you going to handle that many votes in such a short space of time (say, 15 seconds)? You could build a significant web server tier and database back-end that could handle millions of messages per second but that would be expensive, you'd have to pre-provision for maximum expected workload, and it would not be resilient (for example to database failure or throttling). A better solution would use some queuing mechanism that decoupled the voting apps from your service where the vote queue was highly scalable so it could happily absorb 10 messages/sec or 10 million messages/sec. Then you would have an application tier pulling messages from that queue as fast as possible to tally the votes.    | The "fanout" scenario is when an Amazon SNS message is sent to a topic and then replicated and pushed to multiple Amazon SQS queues, HTTP endpoints, or email addresses. This allows for parallel asynchronous processing. For example, you could develop an application that sends an Amazon SNS message to a topic whenever an order is placed for a product. Then, the Amazon SQS queues that are subscribed to that topic would receive identical notifications for the new order. The Amazon EC2 server instance attached to one of the queues could handle the processing or fulfillment of the order while the other server instance could be attached to a data warehouse for analysis of all orders received. | Kinesis is designed for large scale data ingestion and processing, with the ability to maximize write throughput for large volumes of data. Typical data streams include log files, e-commerce analytics, in-game player activity, information from social networks, financial trading floors, or geospatial services, and telemetry from connected devices or instrumentation in data centers. At Workiva, we use Kinesis to handle the collection and processing of telemetry, logging, and analytics data streams. 
| Use Cases | * Application integration * Decoupling microservices * Allocate tasks to multiple worker nodes * Decouple live user requests from intensive background work * Batch messages for future processing | * Fanout * Application and System Alerts * Push Email and Text Messaging * Mobile Push Notifications * Message Durability * Triggering background tasks | * Log and Event Data Collection * Real-time Analytics * Mobile Data Capture * “Internet of Things” Data Feed * Real-Time Applications (application monitoring, fraud detection, and live leader-boards) * Video Stream Analysis |
| Drawbacks | * Single Consumer * Message Replayability * Qeueue Polling * No Deduplication | * Low visibility | * Shard Management (if Streams) * Limited Throughput per Shard * Maintaining State * Complicated Producer and Consumer Libraries
| Pricing | SQS charges $0.40 per million requests (64 KB each), so $0.00655 per GB. At 1 GB per day, this is just under $0.20 per month; at 1 TB per day, it comes to a little over $201 per month. | SNS charges $0.50 per million requests (64 KB each), so $0.0078 per GB. At 1 GB per day, this is just under $0.30 per month; at 1 TB per day, it comes to a little over $239 per month. | Kinesis charges $0.014 per million requests (25 KB each), so $0.00059 per GB. At 1 GB per day, this is less than $0.02 per month; at 1 TB per day, it is about $18 per month. However, Kinesis also charges $0.015 per shard-hour. You need at least 1 shard per 1 MB per second. At 1 GB per day, 1 shard will be plenty, so that will add another $0.36 per day, for a total cost of $10.82 per month. At 1 TB per day, you will need at least 13 shards, which adds another $4.68 per day, for a total cost of $158 per month.
| **Summary** | **Service Decoupling & Buffering** | **Background Triggering & Messaging** | **Realtime Data Processing**

---
## Questions to ask when picking the right service?

* How real time is your “real time” need?
	* How synchronous is your synchronous workload? Would polling for pudates after an async invocation work?

Note: When we talk about SNS, SQS, Kinesis all of these messags will deliver the messages in a very quick turnaround. We are talking about ms, seconds. 

* Does order matter?

Note: Some of these services give you data in order e.g. Kinesis in order of the given shard, SNS makes best effort to provide data in order. However SQS is not.

* Do multiple services need to feed off of the same data?

Note: Do you need fanout? If you do then you need Kinesis or SNS. If you don’t SQS could be just fine

* What does breaking your Lambda function due to a bad code deploy have impact on?

Note: Are you loosing data if bad code deploy happens? How does that impact your business?

* Think about the downstream:
	* What happens when a downstream service fails?
	* Is there the potentially to overwhelm a database or other service?

Note: What happens if the downstream service fails. Is there a potential for too many invokation, too much data to potentially overwhelm the downstream service. What kind of throttling you can use to prevent that?

- [Source - Webinar](https://pages.awscloud.com/Serverless-Streams-Topics-Queues-and-APIs-How-to-Pick-the-Right-Serverless-Application-Pattern_0806-SRV_OD.html)

- [Source SQS](https://stackoverflow.com/questions/31752503/what-are-the-possible-use-cases-for-amazon-sqs-or-any-queue-service)

- [Source Kinesis](https://sookocheff.com/post/aws/comparing-kinesis-and-sqs/)

- [Source SNS](https://docs.aws.amazon.com/sns/latest/dg/SNS_Scenarios.html)

- [Source Pricing](https://stackoverflow.com/questions/26623673/why-should-i-use-amazon-kinesis-and-not-sns-sqs)
