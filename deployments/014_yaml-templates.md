# YAML Templates

YAML (YAML Ain't Markup Language) is a human-readable data serialization language. It is commonly used for configuration files, but could be used in many applications where data is being stored (e.g. debugging output) or transmitted (e.g. document headers). [Source](https://en.wikipedia.org/wiki/YAML)

## AWS SAM

AWS SAM is a simplification of the CloudFormation template, which allows you to easily define AWS resources that are common in serverless applications.

You inform CloudFormation that your template defines a serverless app by adding a line under the template format version, like the following:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
```
An AWS::Serverless transform specifies the version of the AWS Serverless Application Model (AWS SAM) to use. This model defines the AWS SAM syntax that you can use and how AWS CloudFormation processes it. When you create a change set, AWS CloudFormation resolves all Transform functions. [Source](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

## Serverless resource types

Now, you can start declaring serverless resources….

### AWS Lambda function (AWS::Serverless::Function)

Use this resource type to declare a Lambda function. When doing so, you need to specify the function’s handler, runtime, and a URI pointing to an Amazon S3 bucket that contains your Lambda deployment package.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  MySimpleFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs4.3
      CodeUri: s3://<bucket>/MyCode.zip
      Events:
        MyUploadEvent:
          Type: S3
          Properties:
            Id: !Ref Bucket # we reference here to the name of the S3 bucket. Here "Bucket" is the name of the bucket
            Events: Create
  Bucket:
    Type: AWS::S3::Bucket
```
In this example, you declare a Lambda function and provide the required properties (Handler, Runtime and CodeUri). Then, declare the event source—an S3 bucket to trigger your Lambda function on ‘Object Created’ events. **Note that you are using the CloudFormation intrinsic ref function to set the bucket you created in the template as the event source.**

### Comments
In the template above we first use `Transform` to define which syntax we want to use for the CloudTransformation. After doing that we are starting to define the resources we want to create. The `Resource` is an object and within that object we define the first resources and give it a name `MySimpleFunction:` it the first resource we want to create and it's a `Type:AWS::Serverless::Function` type of a Lambda function. Next we define the properties for the resource we want to create. Including the event by which the function should be triggered. Since we want to trigger the function by an Create Object event we need to reference to a next resource we are creating with the help of CloudFormation. We reference to the `!Ref Bucket`. This is the resource we are going to create too. It's a name of the the resource `Type:AWS::S3::Bucket`. 

We can use different names we would like in the current example it's called a `Bucket` but it could have any name we like e.g. `Storage` or something else.

**Ref:** When you are declaring a resource in a template and you need to specify another template resource by name, you can use the Ref to refer to that other resource. In general, Ref returns the name of the resource.
    + When you specify a parameter's logical name, it returns the value of the parameter.
    + When you specify a resource's logical name, it returns a value that you can typically use to refer to that resource, such as a physical ID.

**S3 Bucket**
Resource: AWS::S3::Bucket
Reference: Name
Example Return value: mystack-mys3bucket-1hbsmonr9mytq

**JSON**
```json
{ "Ref" : "logicalName" }
```

**YAML**
Syntax for the full function name:
```yaml
Ref: logicalName
``` 

**YAML**
Syntax for the short form:
```yaml
!Ref logicalName
```

#### Parameters

logicalName: The logical name of the resource or parameter you want to dereference.

#### Return Value

The physical ID of the resource or the value of the parameter.

#### Example

The following resource declaration for an Elastic IP address needs the instance ID of an EC2 instance and uses the Ref function to specify the instance ID of the MyEC2Instance resource:

```json
"MyEIP" : {
   "Type" : "AWS::EC2::EIP",
   "Properties" : {
      "InstanceId" : { "Ref" : "MyEC2Instance" }
   }
}
``` 

```yaml
MyEIP:
  Type: "AWS::EC2::EIP"
  Properties:
    InstanceId: !Ref MyEC2Instance
``` 
**DynamoDb:**
Resource type: AWS::DynamoDB::Table
Reference Value: Table Name
Example Return Value: MyDDBTable

**Lambda Alias**
Resource type: AWS::Lambda::Alias
Reference Value: Amazon Resource Name of the AWS Lambda alias
Example Return Value: arn:aws:lambda:us-west-2:123456789012:function:helloworld:BETA

**Lambda Function**
Resource type: AWS::Lambda::Function
Reference Value: Name
Example Return Value: MyStack-AMILookUp-NT5EUXTNTXXD

## Amazon API Gateway API (AWS::Serverless::Api)

You can use this resource type to declare a collection of Amazon API Gateway resources and methods that can be invoked through HTTPS endpoints. With AWS SAM, there are two ways to declare an API:

1) Implicitly: An API is created implicitly from the union of API events defined on AWS::Serverless::Function. 
2) Explicitly: If you require the ability to configure the underlying API Gateway resources, you can declare an API by providing a Swagger file, and the stage name:

```yaml
MyAPI:
   Type: AWS::Serverless::Api
   Properties:
      StageName: prod
      DefinitionUri: swaggerFile.yml
```

## Amazon DynamoDB table (AWS::Serverless::SimpleTable)

This resource creates a DynamoDB table with a single attribute primary key. You can specify the name and type of your primary key, and your provisioned throughput:

```yaml
MyTable:
   Type: AWS::Serverless::SimpleTable
   Properties:
      PrimaryKey:
         Name: id
         Type: String
      ProvisionedThroughput:
         ReadCapacityUnits: 5
         WriteCapacityUnits: 5
```

**Note:** In the event that you require more advanced functionality, you should declare the AWS::DynamoDB::Table resource instead.

## AWS::Serverless Transform

Use a transform to simplify template authoring for serverless applications. For example, the following template uses AWS SAM syntax to simplify the declaration of a Lambda function and its execution role.

```yaml
Transform: AWS::Serverless-2016-10-31
Resources:
  MyServerlessFunctionLogicalID:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs4.3
      CodeUri: 's3://testBucket/mySourceCode.zip'
```

When the template is submitted, AWS CloudFormation expands the AWS SAM syntax, as defined by the transform. The processed template expands the AWS::Serverless::Function resource, declaring an Lambda function and an execution role.

```json
{
  "Resources": {
    "MyServerlessFunctionLogicalID": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Handler": "index.handler",
        "Code": {
          "S3Bucket": "testBucket",
          "S3Key": "mySourceCode.zip"
        },
        "Role": {
          "Fn::GetAtt": ["FunctionNameRole", "Arn"]
        },
        "Runtime": "nodejs4.3"
      }
    },
    "FunctionNameRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "ManagedPolicyArns": ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"],
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [{
            "Action": ["sts:AssumeRole"],
            "Effect": "Allow",
            "Principal": {
              "Service": ["lambda.amazonaws.com"]
            }
          }]
        }
      }
    }
  }
}
``` 

**Note:** AWS CloudFormation uses the processed template to create or update a stack. If you don't specify a transform value, AWS CloudFormation doesn't process your template, and the AWS SAM syntax fails template validation.

### Example Serverless App

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Simple CRUD web service. State is stored in a DynamoDB table.
Resources:
  GetFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.get
      Runtime: nodejs4.3
      Policies: AmazonDynamoDBReadOnlyAccess
      Environment:
        Variables:
          TABLE_NAME: !Ref Table
      Events:
        GetResource:
          Type: Api
          Properties:
            Path: /resource/{resourceId}
            Method: get
  PutFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.put
      Runtime: nodejs4.3
      Policies: AmazonDynamoDBFullAccess
      Environment:
        Variables:
          TABLE_NAME: !Ref Table
      Events:
        PutResource:
          Type: Api
          Properties:
            Path: /resource/{resourceId}
            Method: put
  DeleteFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.delete
      Runtime: nodejs4.3
      Policies: AmazonDynamoDBFullAccess
      Environment:
        Variables:
          TABLE_NAME: !Ref Table
      Events:
        DeleteResource:
          Type: Api
          Properties:
            Path: /resource/{resourceId}
            Method: delete
  Table:
    Type: AWS::Serverless::SimpleTable
``` 

* You start the template by specifying Transform: AWS::Serverless-2016-10-31. This informs CloudFormation that this template contains AWS SAM resources that need to be ‘transformed’ to full-blown CloudFormation resources when the stack is created.
* You declare three different Lambda functions (GetFunction, PutFunction, and DeleteFunction), and a simple DynamoDB table. In each of the functions, you declare an environment variable (TABLENAME) that leverages the CloudFormation intrinsic ref function to set TABLENAME to the name of the DynamoDB table that you declare in your template.
* You do not use the CodeUri attribute to specify the location of your Lambda deployment package for any of your functions (more on this later).
* By declaring an API event (and not declaring the same API as a separate AWS::Serverless::Api resource), you are telling AWS SAM to generate that API for you. The API that is going to be generated from the three API events above looks like the following:

```yaml
/resource/{resourceId}
      GET
      PUT
      DELETE
```

You can read more about the use case. You can find here JavaScript code, CloudFormation Template and more. [Click here](https://aws.amazon.com/blogs/compute/introducing-simplified-serverless-application-deplyoment-and-management/)


## Environment Variables Available to Lambda Functions

The following is a list of environment variables that are part of the AWS Lambda execution environment and made available to Lambda functions. The table below indicates which ones are reserved by AWS Lambda and cannot be changed as well as which ones you can set when creating your Lambda function. 

Get full list of all Lambda environment variables available at runtime [Lambda Environment Variables](https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html)