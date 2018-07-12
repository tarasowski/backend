# Getting Started w/ Serverless Computing on AWS

https://www.udemy.com/aws-serverless-a-complete-introduction/learn/v4/t/lecture/7275232?start=0

## What's AWS?

AWS allows you to rent their infrastructure to run your application. Cloud hosting (EC2) is under Compute on aws.amazon.com, Storage (S3)

## What's Serverless?

For most of the app we need a backend a restfull API where apps can access to exchange data on that backend (access database,business logic). The best use case for serverless where you have decoupled the backend and frontend. The backend needs to run on a server EC2 where we run our virtual machine. If the application grows and needs to scale up we need more and more servers to handle incoming traffic. But this approach has a couple of issues. We need to reinvent the wheel, we need to write the logic request, we need to define the API endpoints, we have to do a lot of infrastructure things. Additionally we need to think about how many servers we need and they are all the time online. And we need to keep the severs updates etc.

When we use serverless apps, we don't manage all these servers, instead we use AWS Lambda. Lambda allows us to host our code which is executed on demand when it needs to run, we don't think about how many servers we need, and to manage them. Also the API logic is already built in into the Lambda too.

We can use node.js, python etc. when using Lambda it gives us the possibility to use serverless APIs. But there is a still limited support for the fullstack apps. Right now there is support for node.js/express and is tricky to setup. 

* No server management – You don’t have to provision or maintain any servers. There is no software or runtime to install, maintain, or administer.
* Flexible scaling – You can scale your application automatically or by adjusting its capacity through toggling the units of consumption (for example, throughput, memory) rather than units of individual servers.
* High availability – Serverless applications have built-in availability and fault tolerance. You don't need to architect for these capabilities because the services running the application provide them by default.
* No idle capacity – You don't have to pay for idle capacity. There is no need to pre-provision or over-provision capacity for things like compute and storage. There is no charge when your code isn’t running.

The AWS Cloud provides many different services that can be components of a serverless application. These include capabilities for:

* Compute – AWS Lambda
* APIs – Amazon API Gateway
* Storage – Amazon Simple Storage Service (Amazon S3)
* Databases –Amazon DynamoDB
* Interprocess messaging – Amazon Simple Notification Service (Amazon
SNS) and Amazon Simple Queue Service (Amazon SQS)
* Orchestration – AWS Step Functions and Amazon CloudWatch Events

## API Gateway

The API Gateway in AWS let's us create API endpoints (not programatically) like in node/express where we need to define the routes and endpoints. We can create an API simply from the web browser inside AWS console.

## What is Serverless?

Related to the trend of functions as a service which provide code execution in massive and scalable way. Amazon manages the servers that are waiting to execute the code on demand. You only get charged only for the time the functions are executed. Lambda functions are usually stateless (there are cases where it can be statefull). Lambda executes code on demand, you don't know how, you don't know where it just does the job for you, you don't need to think about servers, capacity, idling, scaling groups etc. because it's all abstracted away. This is why Lambda will be the next level of cloud computing.

But serverless is not about Lambda or any specific technology we can use. Serverless is an approach how we can build applications (serverless = compute + patterns). It's a set of architectural principles, which can be distilled down to compute and patterns. There are serverless compute technologies like Lambda and there are serverless architecture patterns, these are pattern for crafting systems without traditional backend service. The real power of serverless comes from integration with other services to orchestrate rich and event driven pipelines and thi is referred as a servicefull approach. 

**Servicefull appraoch:** Where cloud services are heavily leveraged and serverless compute technologies are used as kind of a last mile to just wave these custom components together and third party services.

## A Brief History of Cloud Computing

1. Data centers: managing physical hardware
2. Infrastructure as a service (EC2): manage programatically from the command line but still needs to be managed
3. PAAS (plattform as a service): like Heroku takes out the configuration out of a system like patching etc.
4. Serverless: Function as a unit of scale, you just define the single function that needs to be run. They are stateless, minimum dependencies, solving a specific task

**How do containers fit into the serverless approach?**

Containers are essentially a technology, they are managed container services, but container themsselves are technolog and they enable all these cloud services and they are the underlying technologies of the serverless compute services!

![History of Cloud](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/history-of-cloud.png)

## 5 Principles of Serverless

1. Use a compute service to execute code on demand
2. Write single-purpose stateless functions
3. Design push-based, event-driven pipelines
4. Create thicker, more powerful front ends
5. Embrace third party services

## Serverless Pros/Cons

**Pros:**

1. It's serverless! (no servers) > no server configuration, managing etc. 
2. Versatile > build backends for crud, back office systems, ecommerce, mobile, desktop etc.
3. Scalable > massively scalable, can be run in parallel
4. Manageable migration > Netflix uses it for validation of operations on file transformation
5. Low cost > you pay only for execution
6. Less code > reduce the complexity and infra code, less need to 

**Cons:**

1. Public cloud > mission critical application shouldn't be built here or compliance regulation
2. Reliance on Service Level Agreement > no SLA @ Lambda
3. Limited customization > your memory configuraiton and CPU can be configured, but no special e.g. node.js runtime etc.
4. Vendor lock-in > important? AWS viability, cost, support, documentation
5. Decentralized challenges > moving from monolitic approach to functions can introduce his own challenges

## Compute as Backend (Pattern #1)

Our client application talks to Lambda functions through Amazon's API Gateway. The client talks to Rest over HTTP it doesn't know if Lambda are behind or any other things. The Lambda runtime instantiates required Lambda functions for each request. The security is at the API Gateway level or at each individual function. The system can handle simultanious requests. Every Lambda function connected to the API Gateway receives a request does the required processing and returns the response to the caller through the API Gateway. Every Lambda function can invoke another service too e.g. we have Lambda function that call out firebase running in Google Cloud, it's just custom coded it doesn't need to run on another AWS service. 

![Compute as Backend](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/compute-as-backend1.png)

## Compute as Glue (Pattern #2)

Here Lambda is used basically as glue between different services in the cloud. In this example we have some storage represented by S3 bucket, a relational database, search service an email sending service and push notification service that integrates with Lambda. An event happens in the S3 bucket such as a new file being created, which then propagates through a system, everything is push based and event-driven. 

![Compute As Glue](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/compute-as-glue.png)

There are some other patterns being used in the community are:

* Command Pattern
* Messaging Pattern
* Priority Queue Pattern
* Fan-out Pattern
* Pipes and filters pattern

You can find all the patterns [here](https://www.manning.com/books/serverless-architectures-on-aws)

![Serverless](https://cdn.thenewstack.io/media/2017/03/1d0fdcce-apidays-sidney.png)

## 4 Main Principles of Serverless
[Source](https://thenewstack.io/serverless-architecture-five-design-patterns/)
* Simple but usable primitives (i.e. small, useable building blocks).
* Scales with usage (servers are autoscaled on the user’s behalf).
* Pay-only usage (customers only pay for the time using services).
* Built-in availability and fault tolerance (i.e. NoOps).

### The five serverless patterns for use cases that Bonner defined were:

1. Event-driven data processing: One of the most common applications for serverless environments is to trigger actions after an event occurs.
2. Web applications: At the same time, processing is initiated through the application’s API gateway to run Lambda functions that determine the application user’s context. 
3. Mobile and Internet-of-Things applications: Similar to the web apps use case, mobile and IoT applications built in a serverless environment are looking to decide on what content to offer the user based on their context. Serverless authentication elements are used to ensure the user — whether that be a human or a machine — is authorized appropriately to access information or functionality. 
4. Application ecosystems: Bonner gave an example of someone telling an Amazon Echo that they were giving a presentation, that voice data then triggering a lambda function to pass that message on to a remote team via the Slack API. Polling within the serverless environment then identifies when the team has responded and messages the Echo with the feedback.
5. Event workflows: The recent release of AWS Step Functions is now adding greater sophistication to serverless workflow possibilities. Decision trees can be created in Step Functions that then align with Lambdas and AWS products to carry out workflow branched actions. Step Functions provides state machines so that Lambda functions can have some degree of transient state available for business processes where serverless applications may need to marry synchronous and asynchronous call chains.
