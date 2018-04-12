# Introduction to the Course

https://livevideo.manning.com/module/38_1_1/production-ready-serverless/introduction/introduction-to-course

Ops is the umbralle term for everything that is keeping your system operational and performaning within acceptable parameters. This responsibility of keeping a system of up and running will always exists regardeless of your software is running on the cloud or on premises hardware or in Lambda functions. These tasks are usually are performed by Ops:

* deployment automation
* resource provisioning
* CI/CD
* logging
* monitoring
* alerting
* destributed tracing
* configuration management
* security

![Mental Model](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-ops-still-there.png)

If we want to deliver any business value at all, we still have to make sure that our system is operationally sound. That means we have automated process of deploy changes, debugging and monitoring system, we are alerted, we can secure the system from common attacks etc.

## Terminology

* Serverless: A Serverless solution is one that costs you nothing to run if nobody is using it (excluding data storage). API Gateway + Lambda + DynamoDB + S3 + SNS + DynamoDB Streams + SES + Cognito > Serverless Stack. If nobody was using the system, the resources would essentially be dormant. The data would be stored within the cloud based system ready for use at the first event and you’d have to pay for it of course (e.g. DynamoDB tables and S3). So you would be paying for the storage of data, but not for idling servers. While the system is always available, it’s not always “on”. **So if you want to do a Serverless system, then you have to design it with the idea that if nobody is using it, then nothing is running**
    + [Paul Johnson Serverless Definition](https://medium.com/@PaulDJohnston/a-simple-definition-of-serverless-8492adfb175a)

* AWS Lambda: AWS Lambda effectively implemented the container farm idea – small, isolated services, each in its own container, just without the management headache. We can just wire up a small isolated task to run when an event happens. Lambda will provision, monitor, scale, reuse and restart containers. It provides isolation almost as good as if everything was in a separate VM, and runs it almost as quickly as if we reserved a separate server app for each service. But we don’t have to reserve anything, which is the key.
    + [Gojko about Serverless and financial incentives](https://gojko.net/2016/08/27/serverless.html)

* Function as a Service: The thing that separetes FaaS from PaaS (Google App Engine) is that the unit of deployment is a function as suppose to the application at (PaaS). Similarly for container deployment service from Amazon, the unit of deployment is a container. And for infrastructure as a Service the unit of deployment is a server. 

* Functions as a Service on premises: There are couple of other new frameworks that can run e.g. on Kubernetes (private cloud) instead of public cloud. One of the plattforms is [OpenFaaS](https://github.com/openfaas/faas-netes). But they should not be considere serverless, since you still paying for the kubernetes cluster even if no one uses your system.

[Units of Deployment]
(https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-pass-fass-iaas-caas.png)

