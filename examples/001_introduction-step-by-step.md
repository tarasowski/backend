# Development Steps

[Source](https://app.pluralsight.com/player?course=aws-nodejs-serverless-framework-using&author=fernando-medina&name=714bb110-cd3f-407b-a764-749b4c9f2595&clip=6&mode=live)

1. Setup and dependencies
2. Configuration settings
3. Write function code
4. Deploy and test your application

## Starting a Project
You start to create a new service from a template provided by Serverless framework.

1. Create a Serverless Framework service from a template
serverless create --template aws-nodejs --path servicename

2. Install any Node.js dependencies
npm init -y && npm install your-dependencies

## Configuration of YAML

```yaml
# serverless.yml
service: woofGardenService

provider:
    name: aws
    runtime: nodejs6.10

function:
    Emailer:
        handler: handler.woofGardenEmailer
        description: Emails reminder
    events: 
        - schedule:
            rate: rate(3 days)
``` 

## Deployment Options


* serverless create --template aws-nodej: to create a boilerplate for serverless
* serverless deploy --stage <stagename>: you can specify any stage name you want for deployment, but it needs to be referenced in the yaml template which stage is the default one and which is from the console.
* serverless deploy (we can run this command): this command will deploy or update the entire application. You need to run this specific command if you first time deploy your service. 
* serlverless deploy function --function Emailer: once we have deployed our service we can run only this command, that will speed up the deployment process and will only deploy the function (case sensitive). 
* serverless deploy --package package-path: you can use this command to specify particular package (mostly reserved for integration for continious integration - CI and continious deployment pipelines)
* serverless remove: command can remove the service

How does the serverless deployment works:

1. Serverless.yml: the framework reviews the serverless yml file first
2. Crates a Cloudformation template from that file: API, Databases or other resources required for the service
3. Zips up the code and dependencies and sends to S3
4. Function will be created by Cloudformation from the Zip packages that were stored in S3
5. If everything is finished Serverless will display the output of the template

### Managing Secrets, API Keys with Serverless

In order to avoid any leaks of keys to github or any other resources. You can use the AWS Parameter Store to store your secrets. Serverless has added an integration with Parameter Store. The values that will be stored can be found at aws.amazon.com > AWS System Manager > Paremeter Store

1. Use AWS CLI to store new SSM parameters

```yaml
aws ssm put-parameter --name supermanToken --type String --value mySupermanToken
aws ssm put-parameter --name batmanToken --type String --value myBatmanToken
``` 

2. Add paramters to the yaml configuration file

```yaml
service: env-variables

provider:
  name: aws
  runtime: python3.6
  stage: dev
  region: us-east-1

functions:
  superman:
    handler: superman.main
    events:
      - schedule: rate(10 minutes)
    environment:
      TWITTER_ACCESS_TOKEN: ${ssm:supermanToken}
  batman:
    handler: batman.main
    events:
      - schedule: rate(10 minutes)
    environment:
      TWITTER_ACCESS_TOKEN: ${ssm:batmanToken~true} # true means it is decrypted
```
You can find more information [here](https://serverless.com/blog/serverless-secrets-api-keys/)

### Testing

1. Look ahead - Write testable function code (not testable Lambda function, the code can be deployed everwhere)
2. Separate business logic and IaaS - specific code
3. Unit test for business logic and integration tests with other services

### After Deployment

1. serverless invoke --function dailyReminder --log
    + --log: we make sure any logging information is printed to the console
    + --function: function name specified in the serverless.yml template
    + invoke: manually invoking the function for testing
2. serverless invoke local --function functionName --log (test locally)

**Note:** For the function name use only the function name not the file .js, you don't need to specify the folder or any directory, since it's already specified in yml configuration file.

## Serverless Plugins

External plugins are added per service-basis and are not usually applied globally. If you want to install a plugin, make sure you are at the service root directory and install the plugin with the help of nmp

* npm install --save-dev custom-serverless-plugin: this is the command and if we want to use the plugin for development purposes we should save it as a dev dependency `--save-dev`
* plugin configuration: the next step after the installation is the configuration of the plugin in the serverless.yml:
    ```yml
    # serverless.yml
    plugins: // here we include the plug
        - custom-serverless-plugin
    
    custom: // custom configuration for the plugin 
        custom-config-category:
            configBucket: configBucketName
    ``` 

**Note:** For better visualization you can install `tree` package, so in the terminal if you are in a folder you simply type `tree` and you'll get a `tree` visualisation shown. 

## Serverless CRUD Opertions Workflow

1. HTTP request is made by the browser or another HTTP client
2. Those request are sent to the API Gateway where the request data gets processed and directed to a specific Lambda function depending on the API endpoint requested.
3. Each CRUD operation will have their own Lambda function. If the API receives a request to create an endpoint it will directed to the Lambda create function, alternatively if theere is a DELETE request it will rout it to the delete function. 
4. Each of this functions will process the JSON payload which comes in via the API Gateway in order to validate them and take appropriate actions on the backing DynamoDB database.

### DynamoDB Overview

1. Tables
2. Items:
    + Needs to have distinct primary keys (simple primary key - partition key only)
    + Composed primary key (partition key + sort key): you can have multiple items with the same partition key as long as they have different sort keys. Example (primary key:name + sort key:date)
3. Attributes: are the fundamental data element in DynamoDb (in many ways similar to fields and columns)
    + If the key is avaiable everything else is schemaless

### DynamoDB Gotchas

* NOSQL isn't relational: table scans are expensive
* Table keys are immutable: once set you cannot change them, so if you need to change them you need to create a new DynamoDb table. 
* Picking uniform partition keys: for scaling can be an issue

## Severless Debugging

* CloudWatch Logs for monitoring of logs (console.log() too)
* Postman to test serverless APIs (create and test HTTP request)
* Serverless framework GitHub Issues section

**Note:** If you get {"message: "Internal server error"} go and see Cloudwatch logs 



