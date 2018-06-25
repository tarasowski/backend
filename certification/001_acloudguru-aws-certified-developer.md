# AWS Certified Developer - Associate 2018

Why do companies pay more for certified specialists? In order to become an AWS partner to offer consulting or services, companies needs to employ certified employees. The table below shows the amount of certified people that a company needs to be partner of AWS.

![AWS Partners](./images/aws-partner-program.png)

Note: If you want to find a job fast, get all 5 certificates and apply at companies that are AWS partners. Here is the [full list](https://aws.amazon.com/partners/find/results/?facets=office+%3A+%27Berlin%27&size=10&start=0&sort=Relevance&view=Grid) of all partners in Berlin.

![Certificates](./images/certificates-aws.png)


### From easiest to hardest
* Developer Associate
* Solutions Architect Associate
* SysOps Administrator Associate
* Security Specialty (not online yet)
* Devops Pro
* Solutions Architect Professional


**Note:** JavaScript is for Browser SDK and Node.js is for backend SDK.

* In exam you'll be asked how to make architectural design

* [Exam Blueprint](https://d1.awsstatic.com/training-and-certification/docs-dev-associate/AWS_Certified_Developer_Associate_Updated_June_2018_Exam_Guide_v1.3.pdf)

* How to Build Your Own Amazon Echo with a Raspberry Pi [You can do it](https://lifehacker.com/how-to-build-your-own-amazon-echo-with-a-raspberry-pi-1787726931)

* Invention requires two things: "The ability to try a lot of experiments and 2. not having to live with colleteral damage of failed experiments" by Andy Jassy CEO of AWS

* AWS revenue in 2017 was around $17,6B. This market is huge in comparison Goolge did $109B in revenue.

![Market share](https://www.sdxcentral.com/wp-content/uploads/2018/02/Synergy-chart.png)

### AWS 10,000 Foot Overview 

![AWS Platform](./images/aws-platform.png)

#### Part 1 - AWS Global Infrastructure

* AWS Global infrastructure - services spread all over the world

* 16 Regions and 44 Avaliability Zone
    + A region is just a geographical area like a London, North Verginia, Tokio
    + Each region consists of two or more availability zones. An availability zone is just a data center. So Availability Zones are in the region. The AVz can survive natural disaster. An AZ's is a place where you can put your resources
    + E.g. in Frankfurt (Region) there are 3 availability zones, means there are 3 data centers where you can put your resources

* AWS edge locations are endpoints for AWS which are used for caching content. Typically these are CloudFront, Amazon's Content Delivery Network.
    + There are many more edge locations than regions

* Region is a physical location in the world which consists of two or more Availability Zones (AZ's)
* An AZ is one or more descrete datacenters, each with redundant power, networking and connectivity, housed in separate facilities.
* Edge Locations are endpoints for AWS which are used for caching content. Typically this consists of CloudFront, Amazon's Conttent Delivery Network (CDN)

#### Part 2

**Compute**
* EC2 - Elastic Compute Cloud -> virtual machines inside AWS platforms
* EC2 Conainter Services - run and manage docker at scale
* Elastic Beanstalk - who don't understand EC2 it does automatically everything for the developers
* Lambda - nothing to manage, no virtual machines
* Lightsail - Amazon's VPS (virtual private service), it will provision with the server and ip (nothing to manage)
* Batch - used for batch computing if you want to do batch computing in the cloud

**Storage**
* S3 (Simple Storage Service) - object based storage
* EFS (Elastic File System) - network attached storage
* Glacier - for data archival if you want to archive data
* Snowball - a way to bring large amount of data into AWS datacenter, to bring physically to a disk - you can send them a physical device
* Storage Gateway - virual machines that you install in your data center or your headoffice and it will replicate information to s3

**Databases**
* RDS - relational database service (MySql, Aurora, Postgress)
* DynamoDb - NoSQL (non-relational database)
* Elasticcache - a way of caching commonly queried things from your database service e.g. if you have queries that are often used you can pull them of the elastic cache and not from your database, it will free up your database
* Redshift - for datawarehousing e.g. working with calculations and big data (lot of joins)

**Migration**
* AWS Migration Hub - tracking service allows you to track your apps as you migrate them to AWS
* Application Deiscovery Service - automated set of tool of apps and dependecies
* Database Migratin Service - Easy way to migrate from on-premise into AWS
* Sever Migration Service - helps you to migrate your physical into AWS cloud
* Snowball - used for migration large amount of data to AWS

**Content Delivery/Network**
* VPC (Virtual Private Cloud) - it's a virtual datacenter you can configure firewalls, address ranges, network SLA's, root tables

**Note:** In order to pass any associate exam you need to understand VPC

* CloudFront (Content Delivery Network) - if you have users in Australia and your media files are stored in London, CloudFront goes and stores the data at the nearest location to the users
* Route53 - is a DNS service a DNS service is e.g. like an old school telephone book and you want to lookup for Ms. Smith, you would look up the name and it will give you the telephone number for him, DNS works in a similar way. If you lookup acloud.guru it's going to resolve with IPv4 and IPv6 address
* API Gateway - to create API for other services to talk to
* Direct Connect - a way to run a dedicated line from your corporate headoffice or from y datacenter directly to Amazon and it will directly connect into your VPC 

**Developer Tools**
* CodeStar - a way of getting a group of developers working easily, project management for your code (CI/CD service)
* CodeCommit - store your code (source control service)
* CodeBuild - will compile the code and run tests against it and will produce software packages to deploy it
* CodeDeploy - automation for your deployment
* CodePipeline - continious delivery service
* X-Ray - debug and analyse serverless applications
* Cloud9 - IDE environement (integrated development environment)

#### Part 3

**Management Tools**
* CloudWatch - cloud monitoring service
* CloudFormaiton - infrastructure as a code (solutions architect) - you can reuse your code
* CloudTrail - everytime you click inside your AWS management console e.g. create a new bucket, new users - log changes to the AWS environment -> turned on by default **turn on this service**
* AWS Config - monitors your entire configuration of your AWS environment and has a time snapshot, you can visualize your AWS environment
* OpsWorks - uses shift and puppet for automating your environments
* Service Catalog - manage a catalog of IT services (vp images, databases, multi-tier architecture) - for governance or complience
* System Manager - used for patch maintance, for grouping the resources by departments or apps
* Trusted Advisor - will give you advice across multiple disciplines around security, it will tell you how to save money across AWS, like an accountant
* Managed Services - if you don't have to worry about your EC2, this service will help you out

**Media Services**
* Elastic Transcode - it takes the video from your mac and resizes it to look good on other devives e.g. iphone
* MediaConvert - transcoding service for broadcast
* MediaLive - broadcast video processing service, video streams to TV's
* MediaPackage - prepares video for deliver over the internet
* MediaStore - storage optimized for video
* MediaTailor - allows to do trageted ads into video streams

**Machine Learning**
* SageMaker - for deep learning is around neural networks (more intelligent)
* Comprehend - does sentiment analysis around your product
* DeepLens - artificially aware camera, the camera can figure out what is now filming (go out and detect somebody is coming to your frontdoor if you recognise or not - physical hardware)
* Lex - what powers the Alexa service, communicate with the customers AI chats with your customers
* Machine Learning - analyse the dataset and give you some results. Amazon uses it for recommended products
* Polly - takes text and turns it into speech (sounds like a real humans)
* Rekognition - for image and video recognition
* Amazon Translate - machine translation service like Google Translate
* Transcribe - automatic speech recognition and it allows to turn speech into text

**Note:** Combine transcribe, translate and polly to create content in different languages. You can create an app for your mobile device and you just ask Alexa to order food in french language.

**Analytics**
* Athena - allows to run SQL in your S3 bucket, you can design a sequal query
* EMR - elastic map reduce - used for processing large amount of data for big data solutions
* CloudSearch (better Algolia) / ElasticSearch Service 
* Kinesis - for big data and solutions architect - ingesting large amount of data into AWS e.g. social media feeds or tweets, or hashtag
* Kinesis Video Streams
* QuickSight - business intelligence tool, great BI tool, very cheap and is fantastic for BI
* Data Pipeline - way of moving the data between different AWS services
* Glue - used of ETL (extract, transform, load) for migration of large amount of data

#### Part 4

**Security & Identity & Complience**
* IAM - identity access management (inside out to know)
* Cognito - federated identity servive - device authentication for your apps - temporary access to the AWS resources to authenticated or not-authenticated services.
* GuardDuty - for malicious activity at AWS account
* Inspector - is an agent that you install on your EC instances or virtual machines and run tests to check if they are secure (monthly, weekly) and will generate a report for you
* Macie - will scan an S3 bucket and look for PII (names, addresses, credit card details)
* Certificate Manager - SSL certificates for free
* CloudHSM - hardware security models to store your keys, but you can also store other encryption keys
* Directory Service - a way of integration your microsoft services to aws
* WAF - web app firewall and stops all bad actions from users
* Shield - DDOS mitigation service and you get it default from Route53, CloudFront
* Artifact - audit and compience, you can download there your compliance reports

**Mobile Services**
* Mobile Hub - management console, you use mobile SDK to connect to your AWS backend
* Pinpoint - trageted push notification to drive mobile engagement
* AWS AppSync - GraphQL API service
* Device Farm - a way of testing your apps on real devices
* Mobile Analytics - analytics service for mobile devices

**AR/VR**
* Sumerian - you can build your own world

**Application Integration**
* Step Functions - manage your Lambda functions (state machine)
* Amazon MQ - like RabbitMQ
* SNS - a notification service
* SQS - decoupling your infrastructure (uploads an immage -> SQS -> EC2 instances that are polling that queue -> do something if it -> once done it will be removed from a queue)
* SWF - simple workflow service -> can have human beeings as a component

**Customer Engagement**
* Connect - like a call center in the cloud
* SES - Simple Email Service - great way to send large amount of emails

**Business Productivity**
* Alexa for Business - use it to dial in into a meeting room, reorder an ink for a printer
* Chime - like Google Hangouts or zoom meeting or whatever for video conferencing calls
* Work docs - like a Dropbox for AWS
* WorkMail - like Office365 AWS service

**Desktop & AppStreaming**
* Workspaces - is a VDI solution running linux, windows,mac and streaming down to your device. Like desktop environments in your cloud but you are using your actual device
* AppStream 2.0 - streaming the actual application the app is running in the cloud and you stream it to your device like Citrix

**Internet of Things**
* iOT - managing huge amounts of data
* iOT Device Management - the same
* Amazon FreeRTOS - operating system for your micro-controllers
* Greengrass - AWS Greengrass is software that extends AWS cloud capabilities to local devices, making it possible for them to collect and analyze data closer to the source of information, while also securely communicating with each other on local networks

**Game development**
* GameLift - helps you to create games

### Don't Freak Out

* Solutions Architect Exam Topics (very broad range):
    + Global infrastructure
    + Databases
    + Storage
    + Compute
    + Migration
    + Network & Content Delivery
    + Management Tools
    + Analytics
    + Security & Identity & Complience
    + Application Integration
    + Desktop & App Streaming

* Developer Associate Exam Topics:
    + Global infrastructure
    + Databases
    + Storage (DynamoDb very deep)
    + Compute
    + Network & Content Delivery
    + Management Tools
    + Analytics
    + Security & Identity & Complience
    + Application Integration

**Note:** If you pass the solutions architect you can just go over to developer exam over.

* SysOps Associate Exam Topics (the hardest of all associate exams):
    + Global infrastructure
    + Databases
    + Storage 
    + Compute
    + Network & Content Delivery
    + Management Tools (deep dive into CloudWatch + CloudTrail)
    + Security & Identity & Complience
    + Application Integration

**Note:** You need to understand VPC inside out. It's a make or break of every exam @ AWS

> "Everything changed and nothing stands still" Heraclitus

### Identity Access Management 101

* Centralized control of your AWS account
* Shared access to your aws account
* Granular Permissions
* Identity Federation (including Active Directory, Facebook, Linkedin etc.)
* Multifactor Authentication
* Provide temporary access for users/devices and services where necessary
* Setup your own password retation policy
* PCIDES compliance support

**Critical Terms**
* Users - End Users (think people)
* Groups - a collection of users under one set of permissions
* Roles - you create roles and can then assign them to AWS resources (EC2 instance can have a role to access S3 and can write files directly to S3 w/o username or password)
* Policies - a document that defines one (or more permissions) you attach them to users, groups or roles










