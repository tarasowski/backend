# Architecting for the Cloud - AWS Cloud Best Practice Whitepaper

[Source](https://d1.awsstatic.com/whitepapers/AWS_Cloud_Best_Practices.pdf)


- Your Highlight on Location 21-23 | Added on Thursday, July 5, 2018 7:09:53 PM

Migrating applications to AWS, even without significant changes (an approach known as “lift and shift”), provides organizations the benefits of a secured and cost-efficient
==========

- Your Highlight on Location 21-23 | Added on Thursday, July 5, 2018 7:09:58 PM

Migrating applications to AWS, even without significant changes (an approach known as “lift and shift”), provides organizations the benefits of a secured and
==========

- Your Highlight on Location 21-23 | Added on Thursday, July 5, 2018 7:10:04 PM

Migrating applications to AWS, even without significant changes (an approach known as “lift and shift”), provides organizations the benefits of a secured and cost-efficient infrastructure.
==========

- Your Highlight on Location 36-37 | Added on Thursday, July 5, 2018 7:16:08 PM

Using the global infrastructure of AWS, you can deploy your application to the AWS Region2
==========

- Your Highlight on Location 37-38 | Added on Thursday, July 5, 2018 7:16:20 PM

For global applications, you can reduce latency to end users around the world by using the Amazon CloudFront content delivery network.
==========

- Your Highlight on Location 39-39 | Added on Thursday, July 5, 2018 7:16:31 PM

operate production applications and databases across multiple data centers to achieve high availability and fault tolerance.
==========

- Your Highlight on Location 47-48 | Added on Thursday, July 5, 2018 7:18:10 PM

AWS assets are programmable resources, your security policy can be formalized and embedded with the design of your infrastructure.
==========

- Your Highlight on Location 57-59 | Added on Thursday, July 5, 2018 7:19:28 PM

Scaling vertically takes place through an increase in the specifications of an individual resource (e.g., upgrading a server with a larger hard drive or a faster CPU). On Amazon EC2, this can easily be achieved by stopping an instance and resizing it to an instance type that has more RAM, CPU, IO, or networking capabilities.
==========

- Your Highlight on Location 61-62 | Added on Thursday, July 5, 2018 7:20:09 PM

Scaling horizontally takes place through an increase in the number of resources (e.g., adding more hard drives to a storage array or adding more servers to support an application).
==========

- Your Highlight on Location 65-66 | Added on Thursday, July 5, 2018 7:20:48 PM

A stateless application is an application that needs no knowledge of previous interactions and stores no session information.
==========

- Your Highlight on Location 67-67 | Added on Thursday, July 5, 2018 7:21:03 PM

A stateless application can scale horizontally since any request can be serviced by any of the available compute resources
==========

- Your Highlight on Location 71-71 | Added on Thursday, July 5, 2018 7:21:46 PM

Push model: A popular way to distribute a workload is through the use of a load balancing solution like the Elastic Load Balancing (ELB) service.
==========

- Your Highlight on Location 75-78 | Added on Thursday, July 5, 2018 7:22:46 PM

Pull model: Asynchronous event-driven workloads do not require a load balancing solution because you can implement a pull model instead. In a pull model, tasks that need to be performed or data that need to be processed could be stored as messages in a queue using Amazon Simple Queue Service (Amazon SQS) or as a streaming data solution like Amazon Kinesis.
==========

- Your Highlight on Location 78-79 | Added on Thursday, July 5, 2018 7:22:54 PM

Multiple compute nodes can then pull and consume those messages, processing them in a distributed fashion.
==========

- Your Highlight on Location 87-88 | Added on Thursday, July 5, 2018 7:24:21 PM

Consider only storing a unique session identifier in a HTTP cookie and storing more detailed user session information server-side.
==========

- Your Highlight on Location 89-90 | Added on Thursday, July 5, 2018 7:25:11 PM

A common solution to this problem is to store user session information in a database. Amazon DynamoDB
==========

- Your Highlight on Location 91-93 | Added on Thursday, July 5, 2018 7:25:34 PM

Other scenarios require storage of larger files (e.g., user uploads, interim results of batch processes, etc.). By placing those files in a shared storage layer like Amazon S3 or Amazon Elastic File System (Amazon EFS) you can avoid the introduction of stateful components.
==========

- Your Highlight on Location 97-99 | Added on Thursday, July 5, 2018 7:27:00 PM

Other use cases might require client devices to maintain a connection to a specific server for prolonged periods of time. For example, real-time multiplayer gaming must offer multiple players a consistent view of the game world with very low latency
==========

- Your Highlight on Location 100-101 | Added on Thursday, July 5, 2018 7:39:05 PM

You might still be able to scale those components horizontally by distributing load to multiple nodes with “session affinity.” In this model, you bind all the transactions of a session to a specific compute resource.
==========

- Your Highlight on Location 113-115 | Added on Thursday, July 5, 2018 7:42:30 PM

Use cases that involve processing of very large amounts of data (e.g., anything that can’t be handled by a single compute resource in a timely manner) require a distributed processing approach. By dividing a task and its data into many small fragments of work, you can execute each of them in any of a larger set of available compute resources.
==========

- Your Highlight on Location 118-119 | Added on Thursday, July 5, 2018 7:42:56 PM

For real-time processing of streaming data, Amazon Kinesis partitions data in multiple shards that can then be consumed by multiple Amazon EC2 or AWS Lambda resources to achieve scalability.
==========

- Your Highlight on Location 125-128 | Added on Thursday, July 5, 2018 7:45:45 PM

Another issue with fixed, long-running servers is that of configuration drift. Changes and software patches applied through time can result in untested and heterogeneous configurations across different environments. This problem can be solved with the immutable infrastructure pattern. With this approach a server, once launched, is never updated throughout its lifetime. Instead, when there is a problem or a need for an update the server is replaced with a new one that has the latest configuration.
==========

- Your Highlight on Location 141-143 | Added on Thursday, July 5, 2018 7:49:00 PM

Certain AWS resource types like Amazon EC2 instances, Amazon RDS DB instances, Amazon Elastic Block Store (Amazon EBS) volumes, etc., can be launched from a golden image: a snapshot of a particular state of that resource. When compared to the bootstrapping approach, a golden image results in faster start times and removes dependencies to configuration services or third-party repositories.
==========

- Your Highlight on Location 145-147 | Added on Thursday, July 5, 2018 7:49:38 PM

You can customize an Amazon EC2 instance and then save its configuration by creating an Amazon Machine Image (AMI)9. You can launch as many instances from the AMI as you need, and they will all include those customizations that you’ve made. Each time you want to change your configuration you will need to create a new golden image, so you will need to have a versioning convention to manage your golden images over time.
==========

- Your Highlight on Location 151-153 | Added on Thursday, July 5, 2018 10:30:07 PM

While golden images are most commonly used when launching new EC2 instances, they can also be applied to resources like Amazon RDS databases or Amazon EBS volumes. For example, when launching a new test environment you might want to prepopulate its database by instantiating it from a specific Amazon RDS snapshot, instead of importing the data from a lengthy SQL script.
==========

- Your Highlight on Location 181-183 | Added on Thursday, July 5, 2018 10:34:12 PM

Amazon EC2 Auto recovery13: You can create an Amazon CloudWatch alarm that monitors an Amazon EC2 instance and automatically recovers it if it becomes impaired
==========

- Your Highlight on Location 201-202 | Added on Thursday, July 5, 2018 10:36:21 PM

As application complexity increases, a desirable attribute of an IT system is that it can be broken into smaller, loosely coupled components.
==========

- Your Highlight on Location 203-206 | Added on Thursday, July 5, 2018 10:36:56 PM

A way to reduce interdependencies in a system is to allow the various components to interact with each other only through specific, technologyagnostic interfaces (e.g., RESTful APIs). In that way, technical implementation detail is hidden so that teams can modify the underlying implementation without affecting other components.
==========

- Your Highlight on Location 209-211 | Added on Thursday, July 5, 2018 10:38:20 PM

Service Discovery Applications that are deployed as a set of smaller services will depend on the ability of those services to interact with each other. Because each of those services could be running across multiple compute resources there needs to be a way
==========

- Your Highlight on Location 209-211 | Added on Thursday, July 5, 2018 10:38:25 PM

Service Discovery Applications that are deployed as a set of smaller services will depend on the ability of those services to interact with each other. Because each of those services could be running across multiple compute resources there needs to be a way for each service to be addressed.
==========

- Your Highlight on Location 217-219 | Added on Thursday, July 5, 2018 10:38:59 PM

For an Amazon EC2 hosted service a simple way to achieve service discovery is through the Elastic Load Balancing service. Because each load balancer gets its own hostname you now have the ability to consume a service through a stable endpoint.
==========

- Your Highlight on Location 220-223 | Added on Thursday, July 5, 2018 10:39:27 PM

Another option would be to use a service registration and discovery method to allow retrieval of the endpoint IP addresses and port number of any given service. Because service discovery becomes the glue between the components, it is important that it is highly available and reliable. If load balancers are not used, service discovery should also cater for things like health checking.
==========

- Your Highlight on Location 225-226 | Added on Thursday, July 5, 2018 10:42:48 PM

Asynchronous integration is another form of loose coupling between services. This model is suitable for any interaction that does not need an immediate response and where an acknowledgement that a request has been registered will suffice
==========

- Your Highlight on Location 225-227 | Added on Thursday, July 5, 2018 10:43:06 PM

Asynchronous integration is another form of loose coupling between services. This model is suitable for any interaction that does not need an immediate response and where an acknowledgement that a request has been registered will suffice. It involves one component that generates events and another that consumes them.
==========

- Your Highlight on Location 243-246 | Added on Thursday, July 5, 2018 10:45:46 PM

request that fails can be retried with an exponential backoff and Jitter strategy19 or it could be stored in a queue for later processing. For front-end interfaces, it might be possible to provide alternative or cached content instead of failing completely when, for example, your database server becomes unavailable.
==========

- Your Highlight on Location 243-246 | Added on Thursday, July 5, 2018 10:45:51 PM

A request that fails can be retried with an exponential backoff and Jitter strategy19 or it could be stored in a queue for later processing. For front-end interfaces, it might be possible to provide alternative or cached content instead of failing completely when, for example, your database server becomes unavailable.
==========

- Your Highlight on Location 293-294 | Added on Thursday, July 5, 2018 10:51:26 PM

Relational databases (often called RDBS or SQL databases) normalize data into well-defined tabular structures known as tables, which consist of rows and columns.
==========

- Your Highlight on Location 297-299 | Added on Thursday, July 5, 2018 10:52:08 PM

Amazon RDS for Aurora, which is a database engine designed to deliver much higher throughput compared to standard MySQL running on the same hardware. For read-heavy applications, you can also horizontally scale beyond the capacity constraints of a single DB instance by creating one or more read replicas.
==========