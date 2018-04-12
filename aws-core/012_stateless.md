# Writing Code for AWS Lambda - Statelessness and Reuse

It's important to the central tenant when writing code for Lambda: YOUR CODE CANNOT MAKE ASSUMPTIONS ABOUT STATE. This is because Lambda fully manages when a new function container will be created and invoked for the first time. A container can be invoked for the first time for a number of reasons:

* The events triggering your Lambda function are increasing in concurrency beyond the number of containers previously created for your function. 
* An event is triggering your Lambda for the first time in several minutes etc.

While Lambda is responsible for scaling your function containers up and down to meet actual demand, your code needs to be able to operate accordingly. Although Lambda won't interrupt the processing of a specific invokation that is already in flight, your code doesn't need to account for that level of volatility. 

This means that your code cannot make any assuptions that the state will be preserved from the one invocation to the next. However each time a function container is created and invoked, it remains active and available for subsequent invokations for at least 5 minutes before it is terminated. 

When subsequent occur on a container that has already been active and ivoked at least once before, we say that the invocation is running on a **warm container.**

When an invocation occurs for a Lambda function that requires your function code package to be created and invoked for the first time, we say the invocation experiencing a **cold start.**

![AWS Lambda](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-lambda-containers.png)

**Note:** You can keep Lambda containers warm by simply triggering an event. Here is an explanation how to do it with Cloudwatch [link](https://read.acloud.guru/how-to-keep-your-lambda-functions-warm-9d7e1aa6e2f0).

In order to optimize the performance of Lambda two thngs can be made:

* Startup period of Lambda (warm containers) see above)
* Optimization in packaging Lambda code [link](https://docs.aws.amazon.com/lambda/latest/dg/programming-model.html)

