# Advanced CloudFormation Course

## Introduction

* You can use CloudFormation to deploy pre-sales environment (automating provisioning) in minutes for your product e.g. demo environments for pre-sales or environment for testing etc. 

* You can also use CloudFormaiton to create services such as wordpress hosting, where a customer can self-deploy a new version of wordpress just by clicking a button

* If you push your code to a central repo you can run some simple automated tests such as linting, base syntax checking and other automated processes

* CloudFormation templates fo the production system should be stored in the central repo (infrastructure as Code) and as part of every major code change the cloudformation template is used to automatically spinup an entire test environment based on the latest code comitted to repository. **Automated testing runs within this temporary environment, after which the whole infrastructure set is deleted and cleaned up...**

* Every commit into the repository is tested, integrated with another changes and tested again. And finally it's deployed in fully working environment for user acceptance testing without running base level infrastructure. 

* A stack is a concept in Cloudformation that represents AWS resources and the lifecycle of these resources. A stack always have at least one resource. A Stack has three main operations:
    + Create: is run only once per stack, we give CF a template and we populate the parameters of this template. CF processes the template and creates a stack.
    + Update: Is the only operation that can be run many times during the lifecycle of the stack. It's also different the inputs that accespts:
        1. It accepts the existing or new version of the template
        2. It accepts the existing or new parameters
        3. It takes the existing stack and associated resources
    + Delete: We provide cloudformation with the stack, instructing the system to delete the stack. The stack contains the template, CF accesses that information and deletes all the resources. Only run once and has the policy
        + retain: retain the resources
        + delete: will be deleted
        + snapshop: arranges the snapshot

**Note:** The resources can be updated without changing the physical id and without any interrruptions or a resource can be updated with some interrruption (in form of restart or connectivity). The resource change may require replacement, old will be removed and a new one will be created with a new physical id (create a new one and remove the old one)

* Template is a JSON/YAML document:
    + Parameters (optional): a template can get some input and be referenced from other areas from the template. If you have default make sure that you will only use this template once e.g. with s3 bucket (default name).
    + Outputs (optional): They provide the ability to reference resource parameters, additionaly you can use functions to join stuff etc.
    + Mappings (optional): Lookup table, you can get the values e.g. for multiple regions
    + Conditions (optional): allows to define if or how the resources are created based on this conditions. Are defined once and can be used multiple times across the template
    + Metadata (optional): data that ca provide some useful information for the UI
    + Resources (required): Definition of resources that CF can create.

## YAML 101

* YAML is the superset of JSON and is designed to be human readable
* YAML is designed for storing data and the structure
* Identation converys structure - rather than {} [] * 
* YAML allows in-line comments - Begin with # -> EOL
* Syntax maps to modern programming languages
* Lists (Arrays)
* Associate Array (HASH)
    + ...and scalars (simple data types)
* Lines and Whitespaces are delimeters - they have significance
* Avoid tabs - assume they don't work (use spaces for identation)

* No double quotes needed in YAML, but you can use "" and it's still valid, it becomes mandatory if you want to enter special characters.

```yaml
name: value
name: 20
anothername: false
name: [value1, value2]  # inline array
name:                   #yaml specific array
 - value1
 - value2
name:                   # associative array
 - obj1key1: objvalue
 - obj2key1: objvalue
name:
 - obj1key1: objvalue
   obj1key2: objvalue
 - obj2key1: objevalue
   obj2key2: objvalue
```

Here is the JSON example for the last yaml example

```json
{
    "name": [
        {
            "obj1key1": "objvalue",
            "obj1key2": "objvalue"
        },
        {
            "obj2key1": "objvalue",
            "obj2key2": "objvalue"
        }
    ]
}
``` 

Here is another example where people get often confused about

```yaml
fruitlist: [apple, organge, pear] # inline array

fruitlist:
 - apple
 - organge
 - pear

 person: {name: Adrian, age: 37} # but we can also create an object like this here
 
 person:    # this is the best way
  name: Adrian
  age: 37

name:       # here is an example for lists
 - obj1key1: objvalue
   obj1key2: objvalue
 - obj2key1: objevalue
   obj2key2: objvalue
```

**Note:** Hyphens represent a list and identation on another line represent an subobject. If we want to create a list with many subobject, we need to combine both. 

* **Whenever you see hyphens you know that they represent individual elements of a list.** 

* **Whenever you you see things on the same level of identation you know they belong to the same object**

## Case Study: Wordpress

* Wordpress is built on a LAMP stack (Apache, PHP, Linux, MySQL)
    + MySQL + Linux is the infrastructure level
* On an architectural level:
    + We start with a users
    + In order to access the website for the user, some things needs to be there
        1. VPC needs to have an Internet Gateway 
        2. Public IP address
        3. At least we need 1 subnet
        4. This subnet will have Internet Gateway
    + We need MySQL Database (we'll use managed MySQL by AWS)
        1. RDS Instance

**Note:** If you want to validate your cloudformation template you can use `aws cloudformation validate-template --template-body file://file-name.json` in order to validate your current template.

In this case study we are building the so-called LAMP stack. Which means we are starting from the architectural level, which system components are needed and based on the needs we create a template that gets translated into a stack.

![1](./images/cf-stack-1.png)
---
![2](./images/cf-stack-2.png)

**Note:** Database instance will take from 5 to 20 minutes when you create new resources.

**Important:** If you have any resources e.g. such as S3, where the BucketName needs to be unique everytime, you cannot redeploy your template unless you have deleted all the resources (stack), created before.

```yaml
S3:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: test-wp-cloudguru-cf-course
```

**Important:** Since we have hardcoded the `imageId`we canot recrate the same stack in another region, since the `imageId` is assigned to the specific region. To make the template portable use `mapping`. 

```yaml
EC2: # logical id name / we need it to run linux
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-c481fad3 #north-verginia region
      InstanceType: t2.micro
```

### Template Portability & Reuse

* Critical concept to understand!
* Nothing should be hard-coded (like s3 bucket name)
* Template needs to applied multiple times
* Template should be used across all AWS regions

* To make templates reusable we can use parameters, the least elegant solution from the authors perspective. We can define paramters in the template. We need to create a Key, Type and Default and a list of AllowedValues, Desription.

```yaml
Parameters:
 Instancesize:
  Type: String
  Default: t2.micro
  AllowedValues:
   - t2.micro
   - t2.small
   - t2.medium
  Description: Instance size
  EnvironmentSize:
   Type: String
   Defaul: SMALL
   AllowedValues:
    - SMALL
    - MEDIUM
    - LARGE
   Description: Choose you proper environment size to assign the right value

###############

InstanceType: !Ref Instancesize # use the parameter 
```

* Mapping is a data structure that you define in your template and it's similar to a hash array or an associative array. Whithin this mapping (EnvSize) are 3 keys: SMALL, MEDIUM, LARGE, each key maps to a corresponding set to name/value pairs. 

```yaml
Mappings:
 EvnSize:
  SMALL:
   "EC2": "t2.micro"
   "DB": "db.t2.micro"
  MEDIUM:
   "EC2": "t2.small"
   "DB": "db.t2.small"
  LARGE:
   "EC2": "t2.medium"
   "DB": "db.t2.medium"
```

* Intrinsic CF function `!FindInMap` consists of `[MAP, KEY, NAME]`

![Example](./images/dynamic-templates-intrinsic.png)

* When we create a new template we don't need to assign a bucket name, since it's an optional element, so we can simply remove `BucketName`and AWS is going to assign a random bucket name, but we can reference it within our CF template.

**Note:** Don't explicitly specify resource names if you want to reuse the tample over and over again. Rely on the ability of CF to generate a random name, based on the logical id and the stack-name, it improves protabity!!!

* Pseudo-parameters are like normal parameters with one key difference, they are provided by AWS via CloudFormation such as `AWS::Region` it contains the region where the stack was created. We have `AWS::AccountId`. You can reference pseudo paramters with `!Ref` or `!Sub` should work too. You can get the full list of [Pseudo Parameters here](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/pseudo-parameter-reference.html)

![FindInMap](./images/findinmap-example-pseudo.png)

* If we want to update the stack we can see if the resource is going to be replaced or not. Also under aws documentation under each property of a resource we can see `Update requires: No interruption`. That means in case of update there will be no interruptions.


## User Data Method - EC2

Is procedural method of providing direct instruction to EC2. You can tell the instance what to do after the instace finishing being created. 

We need to add to our stack additional components

* Install PHP 5.X - Required for WP
* Install MySQL to talk to RDS
* Install Apache 2.X (http server)
* Install Wordpress & configure
* Update System

* User Data has to be 64 encoded (we need a function to encode it to base64) and it expects that everything is passed to be one string. 

**Note:** `#!/bin/bash` this is called a Hashbang, by writing it we say to shell to execute following commands on the next lines.

**Note:** Instead of using `!GetAtt LogicalId.Key` you can also use `!Sub ${LogicalId.Key.Name}`. With `!Sub` you can perform a substitution of pripary or secondary attributes.

```sh
sed -i 's/database_name_here/${DatabaseName}/g' wp-config.php sed -i 's/localhost/${DB.Endpoint.Address}/g' wp-config.php
sed -i 's/username_here/${DatabaseUser}/g' wp-config.php
sed -i 's/password_here/${DatabasePassword}/g' wp-config.php
``` 

**Note:** (|) in YAML means that takes everything that follows and interpret it as a one line STRING (type)

* You can use `DependsOn: ResourceLogicalID` in order to wait for the resource that needs to be created before the current resource gets created. But if you use `Sub! or !REf` you don't need to define `DependsOn` because CloudFormation understands it and will wait. In case you would add something manually, there is no way to know it for CFN.

## CloudFormation Init

* Userdata - procedural steps A -> B -> C (you design a script and it runs under root user) -> not easy to manage

* CloudFormationInit - pass directives to cfn-init process
    + Critical that you understand between CFN init vs. Cloud Init -> CFNINI is OS independent over Cloud Init (Userdata)

* CFinit is a desired state enginge - not procedural (you just design the state and not giving the instructions)

* CFNinit is flexible and support sets of configuration

* CFNinit supports order and allows control of timing (in some cases)

* CFNinit allows authentication files/folders can be created from ZIPS, S3, or HTTP/S or GITHUB (download protected resources)

* CFNinit is idempotent.. if its already done, it won't try to do it again

```yaml
Resources:
 EC2:
  Type: "AWS::EC2::Instance"
  Properties:
   :
   :
   :
  Metadata:
   AWS::CloudFormation::Init
   config:
``` 
You can config sets which contain multiple config key, if you don't have config sets or you don't call a config set, it will call a specific config key and a specific config key is the default. Inside the config key you have sections, these sections are processed in order it's defined

```yaml
Resources:
 EC2:
  Type: "AWS::EC2::Instance"
  Properties:
   :
   :
   :
  Metadata:
   AWS::CloudFormation::Init
   config:
    package:
        :
    groups:
        :
    users:
        :
    sources:
        :
    files:
        :
    commands:
        :
    services:
        :

``` 


* `packages` allow you to provide a directive to CFNinit that the packages you indicate are installed. If the packages are installed, nothing will happen, if they are not installed they will be installed to meet the desired state directive.

* `groups` they direct the system to create or to confirm the system to create one or more groups. You can specify the group name or group id mapping. Only supported on Linux/Unix

* `users` directs the CFN process that the desired state is that one or more users exists or one or more configs for those users also exists

* `sources`it allows you to specify zip, tar etc. located on a remoted endpoint and have instracted into a folder into a resource. If you are using s3 you need to use different auth

* `files` you can specify a file and specify a source, it's similar to sources but it only operates on files. You can specify a remote files and move it into local directory. But additionally you can specify user, permission etc.

* `commands` allow you to run command in a structure way. You can run commands and they will be executed in the alphabetical order

* `services` have dependencies that you have satisfied with the previous keys.

* You can specify a config set and you can tell CFNinit to run the optional config set. The config set can have different config keys. You can have one set that create and another set that deletes stacks.


* The `cfn-hup` helper is a daemon that detects changes in resource metadata and runs user-specified actions when a change is detected. This allows you to make configuration updates on your running Amazon EC2 instances through the UpdateStack API action.

### Creation Policies

To understand the creation policies, you need to understand the lifecycle:

1. We start with the template (cloudformation)

2. We feed the template into CloudFormation

3. Begins the process of stack creation

4. The stack moves into the create in progress state and CFN begins the resource orchestration:
    1. It reads the template
    2. It calculates any dependencies
    3. Communicates with other AWS services to create the resources

5. When the resources are completed the stack changes to complete state.

* Creation Policies allow us to influence CFN, we can wait for some operation or an user event to occur before signaling the stack that the creation has been completed successfully.

* CFNinit und UserData rely on exit codes to determine if the bootstrapping has completed. 

* Creation Policies are a way in which it allows template creators to influence the success or failure of stack creation via actions e.g. we have an automated testing framework that is supplied to the instance after wordpress is installed and configured and this framework may run some advanced functionality and performance tests on our infrastructure and signal CFN that this process has passed or failed. CFN can use it to move the stack into complete or a failure state. 

* Creation Policy consitst of 2 components:
    1. Definition within CFN template
    2. A way of communicating of success or failure to CFN itself. We need to send a signal back to CloudFormation!
        + CFNsignal is used to signal to the stack
        + CreationPolicy has a count (the amount of signals) and timeout

![Policies](./images/creation-policies-example.png)


