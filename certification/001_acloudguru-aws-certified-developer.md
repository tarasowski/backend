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

**Note** Not all regions have the same services, you need to pick a region that is closest to you.

* Create Account Alias for loging into your AWS account. We need to set DNS entry (which is actually like an address book for IP addresses and IP addresses are connected to servers and servers have open ports that we can access)

* The access key ID and Secret access key can be only used when you programatically interacting with AWS, you can't use them to login into the console the same applies to pssword and user you cannot use it to programatically connect to AWS.

* Permissions === Policies

* IAM roles are a secury way to grant permissions to entities that you trust. Examples of entitties include the following:
    + IAM user in another account (to write to s3 or spin up instances)
    + Application code runnin gon an EC2 instance that needs to perform actions on AWS resources
    + An AWS service that needs to act on resources in your account to provide its features
    + users from a corporate directory who use identity federation with SAML

* IAM roles issue keys that are valid for short durations, making them a more secure way to grant access. Means you  don't need to generate password/usernames to accesst the resources.

* Don't provide god mode (FullAdministratorAccess) to any role!!!

#### Security Token Service (STS)
* Grants users limited and temporary access to AWS resources. Users can come frm three sources:
    + Federation (typically Active Directory)
        + Uses Security Assertion Markup Language (SAML)
        + Grants temporary access based off the users Active Directory credentials. Does not need to be a user in IAM
        + Single sign on allows users to log in to AWS console without assigning IAM credentials
    + Federation with Mobile Apps
        + Facebook/Amazon/Google to login
    + Cross Account Access
        + Let's users from one AWs accont access resources in another

* Federation: combining or joining a list of users in one domain (such as IAM) with a list of users in another domain (such as Active Directory, Facebook etc.)

* Identify Broker: a service that allow you to take an identity from point A and join it (federate it) to point B (from one identity store to another)

* Identity Store - Services like Active Directory, Facebook, Google etc.

* Identities - a user of a service like Facebook etc.

A following scenario can be used:

1. Employee enters their username and password at Active Directory
2. The application call an Identity Broker. The broker captures the username and password
3. The Identity Broker uses the organization's LDAP directory to alidate the employee's identity
4. The Identity Broker calls the new GetFederationToken function using IAM credentials. The call mus tinclude an IAM policy and a duration (1 to 36 hours), alogn with a policy tha specified the permissions to be gratned to the temporary security credentials
5. The Security Toekn Service confirms that the policy of the IAM user mainng the call to GetFederationToken gives permission to create a new tokens and then return four values to the applcation: An access key, a secret access key a toekn and a duration (the token's lifetime)
6. The Identity Broker returns the temporary security credentials to the reporting application.
7. The data storage application uses the temporary security credentials (including the token) to make requests to Amazon S3
8. Amazon S3 uses IAM to verfiy that the credentials allow the requested operation on the given s3 bucket and key
9. IAM provides S3 with the go-ahead to perform the requested operation

**In the Exam - Workflow**
1. Develop an Identity Broker (you need to develop it inhouse) to communicate with LDAP and AWS STS
2. Identity Broker always authenticates with LDAP first, THEN with AWS STS
3. Application then gets temporary access to AWS resources

**In the Exam - Scenario 2**
1. Develop an Identity Broker to communicate with LDAP and AWS STS.
2. Identity Broker always authenticates with LDAP first, gets an IAM Role associate with a user 
3. Application then authenticates with STS and assumes that IAM Role
4. Application uses that IAM role to interact with S3

**Note:** Well, there are LDAP servers and the LDAP protocol. Combined, it's a data store, or a database. It's not relational, but it's just a place to store data, and it's optimized to be efficient at reads more than writes. It doesn't support transactions. Now, it happens to be very popular for storing credentials, but that's by no means its only purpose, and not its original purpose. [Source](https://stackoverflow.com/questions/239385/what-is-ldap-used-for)

* Important Question: Can you authenticate with Active Directory. And the answer is yes with SAML
* Important Question: You always authenticate agains an Active Directory first and then you get the temporary security credentials. 

* You can authenticate your applications using Linkedin/Facebook/Amazon etc. [Web Identity Federation with Mobile Application](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc_manual.html)
- [Checkout Playground](https://web-identity-federation-playground.s3.amazonaws.com/index.html)

* You go to facebook, you login and verify your identity, we receive an accessToken, using this accessToken, we are going to AWS and obtain the temporary security credentials, call the AssumeRoleWithWebIdentity, get access to AWS resources. 

![Step 1](./images/step1.png)
![Step 2](./images/step2.png)
![Step 3](./images/step3.png)

* IAM is universal. It does not apply to regions at this time
* The "root account" has a complete access by default
* New users have no permissions when first created
* Access Key ID & Secret Access for programmatic and Password for the Console
* SAM stands for security Assertion Markup Language

**Note:** The user always assumes a role, it doesn't get it or something else `AssumeRoleWithSaml API`

### EC2 101 - EC2 is a virtual machine in the cloud
* Virual machine in the cloud

* Amazon Elastic Compute Cloud (Amazon EC2) - (just virtual machines in the cloud - previously you need to buy the machines, install them in a data center etc.) is a web service that provides resizable compute capacity in the cloud. Amazon EC2 reduces the time required to obtain and boot new server instances to minutes, allowing you to quickly scale capacity, both up and down, a syour computing requirements change.

* Amazon EC2 changes the economics of computing by allowing you to pay only for capacity that you actually use (no over-provisioning anymore). Amazon EC2 provides developers the tools to build failure resilient applications and isolate themselves from common failure scenario.

#### EC2 Options

* On Demand - allows you to pay a fixed rate by the hour (Windows instances) (or by the second - Linux) with no commitment.
    + Perfect for user that want the low costs and flexibility of Amazon EC2 without any up-front payment or long-term commitment
    + Applications with short term, spiky, or unpredicatable workloads that cannot be interrupted
    + Application being developed or tested on Amazon EC2 for the first time

* Resered - provides you with a capacity reservation, and offer a significant discount on the hourly charge for an instance. 1 Year or 3 Year Terms
    + Applications with steady state or predictable usage
    + Applications that require reserved capacity
    + You can use up-front payments to reduce their total computing costs even further
    + Standard Reserved Instances (up to 75% off on-demand)
    + Convertible Reserved Instances (up to 54% off on-demand) from CPU to memory instance
    + Scheduled Reserved Instances - only during specific times e.g. on fridays

* Spot Instances - enables you to bid whatever price you want for instance capacity, proiding for even greater savings if your applicaitons have flexible start and end times (like a stock market)
    + Application that have flexible start and end times
    + Application that are only feasible at very low compute prices (chemical, pharmacetical companies) use them to save a lot of money
    + Users with an urgent need for large amount of computing capacity

* Dedicated Hosts - Physical EC2 server dedicated for your use. Dedicated Hosts can help you reduce costs by allowing you ttu use your existing server-bound software licences
    + Useful for regulatory requirements that may not support multi-tenant virtualization
    + Great ofr licencing which does not support multi-tenancy or cloud deployments
    + Can be purchased on demand

### EC2 Instance Types

![Instance Types](./images/instance-types.png)

**Note:** Remember the letters and not the numbers!

![Instance Types](./images/instance-types-eselsbruecke.png)

### What is EBS?
* Virual disk in the cloud

* Amazon EBS allows you to create storage volumes and attach them to Amazon EC2 instances. Once attached, you can create a file system on top of these volumes, run a database, or use them in any other way you would use a block device. Amazon EBS volumes are placed in a specific Availability Zone, where they are automatically replicated to proctect you from the failure of a single component. 

* EBS is just a disk in the cloud that you attach to your EC2 instances. 

* The EBS volume attached to your EC2 where linux or windows is installed is called `root device volume` and then you can have other volumes on top of it. Like windows typically installed on C drive but then you can have additional disks and have a D, F, E drive etc.

#### EBS Volume Types

**SSD**
* General Purpose SSD (GP2) - normal performance
    + General purpose, balances both price and performance
    + Ratio of 3 IOPS per GB with up to 10,000 IOPS and the ability to burst up to 3000 IOPS for exended periods of time for volumes at 3334 GiB and above

**Note:** Input/output operations per second (IOPS, pronounced eye-ops) is an input/output performance measurement used to characterize computer storage devices like hard disk drives (HDD), solid state drives (SSD), and storage area networks (SAN).

* Provisioned IOPS SSD (IO1) - for very high performance applications
    + Designed for I/O intensive applications such as large relational or NoSQL databases
    + Use if you need more than 10,000 IOPS

**Magnetic**
* Throughput Optimized HDD (ST1) - cannot be a root volume / boot volume
    + Big data
    + Data warehouses
    + Log processing
    + Cannot be a boot volume

* Cold HDD (SC1)
    + Lowest Cost Storage for infrequent accessed workloads
    + File Serer
    + Cannot be a boot volume

* Magnetic (Standard) - legacy, old generation
    + Lowest cost per gigabyte of all EBS volume types that is bootable. Magnetic volumes are ideal for workloads where data is accessed infrequently, and application where the lowest storage costs is important.

**Note:** If a spot instance is terminated by Amazon EC2, you will not be charged for a partial hour of usage. However, if you terminate the instance yourself, you will be charged for the complete hour in which the instance ran.

How to remember every instance type?

![Here](./images/fight-doctor-mc-pix.png)

### Launch EC2 Lab

* AMI - Amazon Machines Images are snapshots of virtual machines on Amazon
    + comes with AWS CLI, Nodejs, Python, Ruby etc.

* If you are e.g. in London you cannot see all EC2 instace types there, just only the available instance types for London

* If you want to launch a dedicated host you need to choose tenancy `Mietvertrag`.

* When you create a new AWS account each region has it's own default VPC. VPC is just a virtual data center, where the resources are hosted.

* Subnets is basically in which availability zone you want to put your EC2 instance. Is just an address block range. A subnet is equal to a specific availability zone. One subnet === One availability zone

**Note:** A computer network, or data network, is a digital telecommunications network which allows nodes to share resources. In computer networks, computing devices exchange data with each other using connections (data links) between nodes These data links are established over cable media such as wires or optic cables, or wireless media such as WiFi. [Source](https://en.wikipedia.org/wiki/Computer_network)

* What happens to storage if you terminate EC2 instance? By default it's going to be deleted. Because `delete on termination` is just pre-defined. Volume is where you going to go boot Linux or Windows from.

* GiB - GibiByte, GigaByte, GB

* You tag resources in order to control your costs

![Tags](./images/example-tags.png)

* Security Group: A security group is a set of firewall rules that control the traffic for your instance.

* System Status Check: Verifying your instance is reachable, checking the underlying hyperviser
* Instance Status Check: checking that you can get traffic to operating system (you can reboot)

Note: A hypervisor or virtual machine monitor (VMM) is computer software, firmware or hardware that creates and runs virtual machines. 

* Basic Monitoring Check: it's pinging our machine every 5 minutes to get the data

**Key Points for the Exam**
* Termination Protection is turned off by default, you must turn it on
* On an EBS-backed instance, the default action is for the root EBS volume to be deleted when the instance is terminated
* EBS Root Volumes (where you boot your Linux/Windows) of your DEFAULT AMI cannot be encrypted. You can also use a third party tool (such as bit locker etc.) to encrypt the root volume, or this can be done when creating AMI's in the AWS console or using the API
* Additional volumes can e encrypted

### Security Groups

* A security group is a firewall and it's controlling traffic to your instances. When you first launch an EC2 instance you'll be associated with one or more security groups. You can have 1 EC2 instance with many different security groups

* A security group is the defense line against hackers e.g. lock down SSH behind my IP address

* `chkconfig httpd on` command for always restarting the apache server if the machine reboots

* `yum install httpd -y` to install the apache server

* `sudo su` to change to super user

* Any rules that you apply to your security group applies immediately. E.g. if you change or delete some rules, it will be applied asap.

* If you fixing a security group or add some rules it will be applied again immediately!!!

![Security Groups](./images/security-group-rules.png)

* Security groups are stateful, if you add a rule that rule automatically will be allowed for outbound that means if you have a rule assigned to inbound it will automatically assigned to the outbound. What comes in is also comes out, it means they are stateful.

* Everything is blocked by default but you cannot deny traffic. You simply allow traffic!

* RDP - Port Range 3389
* MySQL/Aurora - Port Range 3306

* All inbound traffic is blocked by default (you need first to allow traffic)
* All outbaound traffic is automatically allowed by default
* Change to security groups take effect immediately
* You can have any numer of EC2 instances within a security group
* You can have multiple security groups attached to EC2 Instances
* Security Groups are **STATEFUL**
    + If you create an inbound rule allowing traffic in, that traffic is automatically allowed back out again.










