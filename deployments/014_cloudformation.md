# CloudFormation AWS

[Course on Pluralsight](https://app.pluralsight.com/library/courses/aws-automating-cloudformation/table-of-contents)

Cloudformation allows you to create, update or delete your infrastructure on AWS automatically. It allows you to automate almost every part of AWS.

Automating infrastructure helps you to lower costs, improve quality, improve flexibility. Describing infrastructure in code without a need of scripting or programming a lot (mainly done through a json / yaml file). AWS CloudFormation allows to create infrastructure based on a blueprint, you can describe your infrastructure in code. 

The most important advatage of using Amazon AWS is their API. Every part of AWS is controllable via an API. **API first** is an important principle of AWS. API Usage examples: 1) Launch an EC2 instance, 2) Create a security group, 3) Update cofig of RDS database, 4) Create networking infrastructure etc., 5) Add a new IAM user or anything alese you can do manually. (Shell or SDK).

## Describing Infrastructure in Code

1. Step: Defining a target state in form of a blueprint. The blueprint contans information about your infrastructure and configuration.
2. Step: You are then using a tool to transform your blueprint into a real cloud infrastructure. All necessary steps are calculated and executed automatically.

**Note:** Cloudformation is a tool maintained by Amazon and it's free to use!!!

![Cloudformation](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-cloudformation.png)

Cloudformation allows you to create an template including all resources needed for your infrastructure. The tools is able to create a stack based on the template, which means Cloudformation is creating all resources as described in the template. 

A stack is the instance of a template. It means it includes real AWS resources:
* AWS Lambda
* VPC
* S3 Bucket
* R53
* DDB (DynamoDB)
* SG (Security Group)
etc.

**Important:** You can create multiple stacks with the help of a template (1 Teample = Multiple Stacks). For example you can use a template to spin up a separate environment for every customer. Or you can use the same template to create a development or production environment. 

## Cloudformation Templates

The following tools help you to create a template:

* Texteditor: You need to create a json file. 
* IDE Integration: Eclipse + Visual Studio
* AWS Cloudformation Designer: is a graphical tool for creating templates, part of the AWS management console. 

```json
{
    "AWSTeampleFormatVersion": "2010-09-09",
    "Description": "Simple Wordpress",
    "Parameters": {
        "VPC": {
            "Description": "The default VPC",
            "Type": "AWS::EC2::VP::Id"
        },
        "Subnets": {
            "Description": "At least two public subnets from default VPC",
            "Type": "List<AWS::EC2::Subnet::Id>"
        }
    },
    "Mapping": {
        "RegionMapping": {
            "eu-west-1": {"AMI": "ami-bff32cc"}
        }
    }
}
``` 

## Creating a Cloudformation Template

We'll start with an example to create an SHH Bastion Host

![Bastion Host](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-ssh-bastion-host.png)

What is needed to setup a Bastion Host on AWS:
* EC2 Instance: Running a SSH server (acting as a Bastion Host)
* Elastic IP: To be able to connect o Bastion a static IP is needed linked to EC2 instance
* Security group: Firewall rules controlling incoming traffic to EC2 instance Port:22 to reach server running on EC2

## Anatomy of a Cloudformation Template

A Cloudformation template is written in JSON

### Minimal Cloudformation Template

A minimum setup contain:
* Template Format Version: only valid value needs to be added (might change in the future)
* Description: helps for documentation purposes
* Resources: include the description of the infrastructure, the target state of all resources + properties is described here

```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "SSH Bastion Host",
    "Resources": {
        "EC2Instance": {...},
        "ElasticIP": {...},
        "SecurityGroup": {...}
    }
}
``` 
### Working with Resources

Cloudformation supports more than 100 different resource types. There are almost resource types for each service available on AWS. For example:

AWS::EC2::Instance
AWS::EC2::SecurityGroup
AWS::EC2::IP
AWS::RDS::DBInstance
AWS::AIM::Role
AWS::EC2::VPC
AWS::ElasticCache::CacheCluster
AWS::DynamoDB::Table
...

**Note:** In the Cloudformation template or SAM template we describe the traget state of our infrastructure. As soon it's deployed it will be avialable as a resource and part of the stack. If we need special security roles or any other resources they needs to be described as a target state in the template. A target state is a desired state of our infrastructure. 

The resource section contains of one or multiple resources

```json
...
    "Resources": {
        "EC2Instance": { // name of the resource
            "Type": "AWS::EC2::Intance", // resource type
            "Properties": {...} // depending on the resource type you can define properties
        }
    }
```

* Name of the resource "EC2Instance" it has to be unique and it does not define the type or the properties of the resource. Each resource needs to have a name and it's only visible within Cloudformation. 

* It's mandatory to define a resource type for each resource. In this case "AWS::EC2::Instance" is used, this means that the resource is describing the EC2 instance. 

* Depending on the resource type you are able to define properties for each resource. The properties describe the configuration of the resource in detail.

```json
...
    "Type": "AWS::EC2::Instance",
    "Properties": {
        "ImageId": "ami-bff32ccc",
        "InstanceType": "t2.nano"
    }

```

### EC2Instance
Important properties for the EC2Instance are the Amazon Machine Image AMI and the instance type. Here follows the example of a complete EC2 instance definition. It contains the name of the resource, the type and 3 properties.

```json
"EC2Instance": {
    "Type": "AWS::EC2::Instance",
    "Properties": {
        "ImageId": "ami-bff32ccc",
        "InstanceType": "t2.nano",
        "NetworkInterface": [{"SubnetId": "..."}]
    }
}
```
### Elastic IP
It's possible to describe Elastic IP in the template as well. Properites of resource of type AWS::EC2::EIP. An Elastic IP address needs to be linked to an EC2 instance and a domain VPC as we are operating in a VPC

The resource type indicates that the resource is describing an Elastic IP, the properties of the resource are describing the resource in more detail. In this example the Elastic IP is linked to an EC2 instance and used inside of VPC

```json
"Type": "AWS::EC2::EIP",
"Properties": {
    "InstanceId": "i-d0f2e055",
    "Domain": "vpc"
}
```

### Security Group

It's resource a describing a security group, includes link to VPC and nested ingress rules. You define the type and the resources, important for this is that a security group needs to be linked VPC and it's possible to add nested ingress rules to the properties. 

```json
"Type": "AWS::EC2::SecurityGroup",
"Properties": {
    "GroupDescription": "ssh-bastion-host",
    "VpcId": "vpc-6d53320e",
    "SecurityGroupIngress": [{ // allowing incoming traffic from everywhere on port 22
        "CidrIP": "0.0.0.0/0",
        "FromPort": 22,
        "IpProtocol": "tcp",
        "ToPort": 22
    }]
}
```
### Dependencies between resources

Cloudformation is able to resolve dependencies between resources automatically. But how do you define dependencies within a template. Let look at the current example with the Bastion SSH Host:

The EC2 Instance depends on a security group. When launching an EC2 Instance a security group is needed as a parameter. The Elastic IP adress needs to be attached to an EC2 instance, so Elastic IP depends on the EC2 Instance. 

**Referencing Security Group**

```json
"EC2Instance": {
    "Properties": {
        "NetworkInterfaces": [{
            "GroupSet": [{"Ref": "SecurityGroup}]
        }]
    }
},
"SecurityGroup": {...}
``` 
When specifing the properties to the EC2 Intance the Security Group needs to be referenced doing so is possible by using the built-in function Ref. But what to reference? YOU ARE ABLE TO REFERENCE OTHER RESOURCES BY THEIR NAME. In this case the name SecurityGroup is used to reference Security Group resource. 

**Referencing EC2 Instance**

```json
"EC2Instance": {...}
"ElasticIP": {
    "Type": "AWS::EC2::EIP",
    "Properties": {
        "InstanceId": {"Ref": "EC2Instance"},
        "Domain": "vpc
    }
}

```
The Elastic IP depends on an EC2 instance again the built-in Ref function is used to describe the dependency. The name of the "EC2Instace" resource is used for referencing. Referencing other resources in the template allows you to define dependencies and frees you from using hardcoded identifiers in your templates. Cloudformation uses the dependencies defined in the template to determine the correct order during creating, updating or deleting the stack. 

**Note:** If you create a stack you can assess the creation of the stack by using CLI: `aws cloudformation describe-stacks`. Interesting is that `aws` keyword is calling the command line interface `cloudformation` is selecting the service and `describe-stacks` is the method to call. The AWS CLI allows us also to delete a stack `aws cloudformation delete stack --stack-name ssh-bastion-host`. We use the `delete-stack` as method and `--stack-name...` is needed as parameter. 

Minimal Cloudformation template consists of a format version, description and resources section. Target state is defined within resources section. Three steps are needed to describe a resource: Name, Resource Type, Properties (Parameters).

## Using Parameters and Outputs to Customize a Stack

If you are creating multiple stack based on the same template it might be necessary to make small changes for different use cases. If you want to implement a special request for important customer. Reusing templates for multiple slightly different stacks is possible by using multiple paramters. You can add parameters while creating a stack!!! 

Outputs are used of integrating the stack into existing environments. When a stack was created or updated successfully, you are able to access the results. You can use outputs to access results from a running stack.

In order to setup different stack for dev, test, prod environments the template needs to be customized. Cloudformation offers the possibility to define specific input parameters to create a new or updating an existing stack, after creating or updating a stack it's possible to access the outputs of the stack by accessing the AWS API. Inputs and Outputs need to be described in the template.

![I/O](https://github.com/mittyo/javascript-pocketguide/blob/df375cdf4eaa515155208af6fe2edbd0dd7e86e4/serverless/images/aws-input-output-cloudformation.png)

### Parameters to Specify Input

With the help of parameters we can reuse the template for different setups such as dev, test, prod. Small changes are needed for different setups. In the example of "SSH Bastion Host" a Key Pair is needed to restrict the access to the Bastion Host. The same Key Pair is used for the development and testing environment, to be able to restrict the production environment, we can use a different Key Pair. Also the EC2Instance acting as a Bastion Host needs to be deployed with different instance types to satisfy different networking workloads. We are able to use the same template for all environments. In order to do so, we need to define the needed parameters in the Cloudformation template. When creatin a stack based on the template, we'll now specify the values for every parameter, this allows us to create multiple stacks based on the same template by using different inputs. 

![Cloudformation Stacks](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-multiple-stacks-cloudformation.png)

```json
"AWSTemplateFormatVersion": "2010-09-09",
"Description": "SSH Bastion Host",
"Parameters": {...}, // here are the parameters to specify
"Resources": {...},
"Output": {...}
```
**Note:** The parameters section is optional

### Defining a Parameter

Each parameter needs a name KeyPair in this example, It's highly recommended to add description to each parameter, doing so allows you easily document the input parameters of your document. Describing the parameter is not only useful within the template itself. The parameter description is shows when creating or updating the stack in the management console and helps you out to fill the parameters later. It's required to define a type for each parameter. There are general parameter types available: String: "string", Number: 1, List<Number>: [1, 2, 3], CommaDelimitedList: "1, 2, 3". On top of general parameter types, there are AWS specific parameter types available:

AWS::EC2::Image::Id: "ami-..."
AWS::EC2::Instance::Id: "i-47..."
AWS::EC2::SecurityGroup::Id: "sg-65...."
AWS::Route53::HostedZone::Id: "ZVH..."

AWS Parameters are usefull because the input is validated accordingly, you can be sure that the type with the parameter id contain a valid instance id for example. 

```json
"Parameters": {
    "KeyPair": {
        "Description": "A SSH key pair",
        "Type": "AWS::EC2::KeyPair::KeyName" // "String", "Numbers", "Lists" or AWS Parameter for input validation
    }
}
``` 

### How to use parameter in the template?

```json
"Parameters": {
    "KeyPair": {...}
},
"Resources": {
    "EC2Instance": {
        "Type": "AWS::EC2::Instance",
        "Properties": {
            "KeyName": {"Ref": "KeyPair"} // here we reference a parameter KeyPair
        }
    }
}
``` 

It's possible to reference a parameter within resources section of the template. In this example the property KeyName references the value of the input parameter KeyPair the built-in function `Ref` is used. The name KeyPair is used for Referencing. Whenver your software allows user inputs you need to validate them. It's true for Cloudformation template as well. Validating input reduces failures when creating or updating a stack or also can be used to restrict adverse inputs. 

* AllowedValues: ["a", "b", "c"]
* AllowedPattern: "[a-z0-9]*"
* MaxLength/MinLength: 1
* MaxValue/MinValue: 2

### Example for input validation

```json
"InstanceType": {
    "Description": "The instance type.",
    "Type": "String",
    "AllowedValues": ["t2.nano", "t2.micro", "t2.small"]
}
```
The name of this parameter is InstanceType it's a string and values that are allowed are defined under "AllowedValues". Another useful option is when to define an input parameter is to define a default value. By default the default value is used when creating or updating a stack. 

```json
"InstanceType": {
    "Description": "The instance type.",
    "Type": "String",
    "Default": "t2.nano" // optional in this case
}
```

![Parameters](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-cloudformation-parameters.png)

Each Parameter can be identified by name and contains a short description. The first parameter is used to handover the id of the virtual private cloud, therefore an AWS specific parameter type called "AWS::EC2::VPC:Id is used, this means a parameter value has to be a valid vpc id. The second parameter is used to specify the subnet for the EC2 instance acting as a ssh bastion host, again AWS specific parameter type is used "AWS::EC2::Subnet::Id" in this case the Subnet requires a valid subnet id as a parameter value. Both parameters are needed to create different stacks based on the template. The third parameter excepts the name of the KeyPair, therefore an AWS specific parameter type called "AWS::EC2::KeyPair::KeyName" is used, this allows to use different KeyPairs for different environments. The forth parameter defines a parameter named InstanceType of type string and only 3 values are allowed ["t2.nano", "t2.micor", "t2.small"]. The parameter is used to be able to customize the E2 instance for the different environment for example in dev and testing we don't need big machines, but in prod it could be different. 

All parameters are referenced within the resources section with "Ref": "ParameterName". When creating or updating a stack these references will be replaced with the real values. 

### How to create a stack and specify the values

```
aws cloudformation create-stack --stack-name ssh-bastion-host \
--template-body file://ssh-bastion-host.json \
--parameters ParameterKey=VPC, ParameterValue=vpc-6d53320e \ 
ParameterKey=Subnet, ParameterValue=subnet-3454954 \
ParameterKey=KeyPair, ParameterValue=mykey \
ParameterKey=InstanceType, ParameterValue=t2.nano
``` 
**Note:** To add a backslash use shift+alt+7 on the keyboard

The stack is created based on the parameter values defined in CLI. It's possible to create another stack with different parameters immediately. 

More about [Lambda Function and Properties](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html#w2ab2c21c10d808c11)

### Output to access results from the stack

If you want to integrate the new stack into existing environment. To be able to do so, you need to access the results from the stack. In the case of SSH Bastion Host, you need to update the DNS record with the a Public IP from the Bastion Host, to add a rule to add a private IP to firewall configuration. 

In order to do so we need to define the output in the Cloudformation Template. After the stack was successfully created you are able to access these outputs via AWS API. 

![Output](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-cloudformation-output.png)

Outputs can be used to handover the results from the stacks to other environments. This enables integration.

```json
"AWSTemplateFormatVersion": "2010-09-09",
"Description": "SSH Bastion Host",
"Parameters": {...},
"Resources": {...},
"Output": {...} // here is the output section and it's optional as well as parameters section
``` 

**Defining an Output**

```json
"Outputs": {
    "SSHBastionHostPublicIP": {
        "Description": "Public IP address...",
        "Value": {"Ref": "ElasticIP"}
    }
}
``` 
It's possible to define multiple outputs inside the template, each output consists of a unique name. A description allows you to document each output within the template. Each output needs to define a value, usually the value includes information about the stack resources, there are two different options available to access values from the resource. 

**Default Resource Return Value**
It's possible to use the `Ref` function to get information about stack resources, the return value depends on the resource type (see example above) `"Ref": "ElasticIP"`. 

**Specific Resource Return Value**
Accessible via built-in Fn::GetAtt function. You can access different return values depending on the Resource type. Depending on the resource type there are also specific return values are available, you are able to access them by using the built-in `Fn::GetAtt` function.

```json
"SSHBastionHostPrivateIP": {
    "Description": "Private Ip address...",
    "Value": {
        "Fn::GetAtt": ["EC2Instance", "PrivateIP"]
    }
}
``` 

### Example of Returning of Public IP

```json
"Resources": {
    "ElasticIP": {...}
},
"Outputs": {
    "SSHBastionHostPublicIP": {
        "Description": "Public IP address...",
        "Value": {"Ref": "ElasticIP"}
    }
}
```
The `Ref`function return the public IP address in this example. The resource name is used to reference elastic ip. 

### Example of Returning of Private IP

```json
"Resources": {
    "EC2": {...}
},
"Outputs" {
    "SSHBastionHostPrivateIP": {
        "Description": "Private IP address...",
        "Value": {"Fn::GetAtt": ["EC2", "PrivateIp"]}
    }
}
```

The output here contains the private IP address of the EC2 instance. The private IP address is only avaiable by using a specific resource return value that's why the `Fn::GetAtt` function is used to extract the value from the resource. The resource name is refered to EC2 instance and the attribute PrivateIp references the resouce attribute. 

**Note:** You can find here a detailed description how to create AWS SAM templates in JSON and YAML format [Source](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html)

![Cloudformation](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-cloudformation-output-json.png)

This section contains two different outputs. Each output can be indentified by name and contains a short description. The first output will return the public ip address assigned used by elastic ip. The elastic ip resource is referenced, the resource return value of the elastic ip is the public ip itself. This is why is simple `Ref` function is used here. 

The second return value will return a private ip address of EC2 instance. The private ip address is accessible through a specific resource return value (comment: probably it's a loop that's why an array). The `Fn::GetAtt` is used to access the values, the first parameter references the resource, the second parameter indicates the specific return value `PrivateIP` in this case. 

### How to access this output?

It's possible to access the output using the AWS API. For that reason we can use the AWS CLI that accesses the AWS API through the terminal window. The `aws cloudformation describe-stacks`command lists the outputs of the stacks. You can use these outputs to integrate the stack into your existing environment. 

![Stack Output](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-cloudformation-stack-output.png)

You can use the outputs in existing environment by using them in a short shell script. 

* Parameters: allows to use the template in slightly different use cases (by inputing the values). All possible input parameters needs to be defined in a separate section of a cloud formation template. The parameters needs to be specified when a new stack is created or updated.
* Outputs: allows us to access the results from a stack. All outputs needs to be defined within the Cloudformation template. Outputs can be accessed after the stack was created or updated successfully via AWS API

## Building More Powerful Templates with Built in Helpers

Creating multi-region templates can be tricky. The Helpers will help to create region based templates with mappings (Fn::FindInMap). Also there are some pseudo parameters, these parameters are available within template by default (AWS::AccountId, AWS::Region, Fn::GetAZs). Also there User Data and Fn::Join and Fn::Base64 are used for provisioning an EC2 Instance. 

Adding Mappings allows us to describe the infrastructure. What is a Map? "A map is an object that maps keys to values." 

```json
"AWSTemplateFormatVersion": "2010-09-09",
"Description": "SSH Bastion Host",
"Mappings": {...}, // optional. 
"Resources": {...}
``` 

### Defining a Mapping

```json
"Mappings": {
    "Mapping": { // a name of the map
        "Key": {
            "Name": "Value"
        }
    }
}
``` 
You are able to add multiple mappings to the secion. Each Mapping does need a unique name. A mapping can contain multiple keys, each key can contain multiple named values. 

```json
"Mapping": {
    "KeyA": {},
    "KeyB": {}
}
```
A key has to be unique within the mapping. A key can contain multiple named values or to say it in other words contain another map. A name has to be unique within the key

```json
"Mapping": {
    "NameA": "ValueA",
    "NameB": "ValueB"
}
```

### Example for a map containing regions Map AMIs per Region

The map (RegionAMI) contains two AMI Ids. Region identifiers are used as keys `us-east-1` and `us-west-1`. Each key consists of two named values the operating system is used as name and and the values contain the ami-ids. 

```json
"RegionAMI": {
    "us-east-1": {
        "AmazonLinux": "ami-454545",
        "Ubuntu": "ami-345345"
    },
    "us-west-1": {
        "AmazonLinux": "ami-454096",
        "Ubuntu": "ami-331093"
    },
}
```

The built-in function "Fn::FindInMap": ["RegionAMI", "eu-west-1", "AmazonLinux] allows to access values from a Mapping. It accenpts Mapping name, Key, and Name as a parameter. 

`Fn::GetAZs": {"Ref": "AWS::Region}` this function returns all availability Zones for the region. Uses current region of stack in this example. 
`Fn::Select": ["0", ["a", "b", "c",]` allows to select values from a list. In this example the first value of the list is selected. 

**Sidenote:** The process of bootstrapping an EC2 instance on AWS

![Bootstrap](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-ec2-instance-bootstrap.png)

An EC2 instance is started from an Image "ami". It's useful to make changes on top of that and boostraping an EC2 instance. User Data allows you to achieve that goal. User data: defined when EC2 Instance is launched. Contains a Shell script. EC2 Instance is able to access User Data. Execute Shell script during bootstrap. User Data can be described as a property of an EC2 instance, but user data needs to be encoded in base64. 

```json
"Type": "AWS::EC2::Instance",
    "Properties": {
        "UserData": "..."
    }
``` 
In order to encode the content in base64 there is built-in function `"Fn::Base64": "A String"` this function encodes a string in base64. 

**Note:** You can add a shell script to the Cloudformation template to create a custom bootstrap process. 

![Bootstrap Shell Script](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-shell-bootstrap.png)

**Note:** Use can use package.json as a task runner to deploy your cloudformation stack, since npm run is running terminal commands

```
"scripts": {
    "package": "aws cloudformation package --template-file template.yaml --s3-bucket app-sam --output-template-file packaged-template.yaml",
    "deploy": "aws cloudformation deploy --template-file packaged-template.yaml --stack-name app-sam-1-stack --capabilities CAPABILITY_IAM"
  },
``` 
[Source](https://github.com/simalexan/twitch-serverless-app-with-aws-sam/blob/master/package.json)