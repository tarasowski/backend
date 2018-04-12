# Serverless Framework & Permissions

* Serverless framework automates the process of packaging, deploying and versioning Lambda functions and configuring AWS resources such as setting up and configuring API Gateway. 

* It also forces for consistent naming convention which makes function easy to find and to manage. By prefix or by stage (--stage prod|dev). The naming convention becomes important when you have to manage hundreds of functions. 

## Why Serverless Framework?

There are tons of different deployment frameworks. Even Amazon has published their own SAM framework. Don't try to write your own framework, instead pick one and stick to it. Build your knowledge of framework of your choice and the team, so people can help each other. The reason why to choose Serverless Framework:

1. commercial backing: there are people working full-time on the stuff and it's funded. It's likely to see constant improvement and it will be staying here for a while. 
2. community support: besides the financial backing it has also a lot of community support. Current features where proposed or implemented by community itself.
3. maturity: one of the first frameworks on the market and is very mature. 
4. multi-cloud support: not a silver bullet, since you are locked-in not to the computing power, you are locked in to the services around such as S3, messaging etc.

## How to start with Serverless

1. Make a folder `mkdir folder-name`
2. `serverless create --template aws-node-js` it creates a sceleton for a serverless project (handler, yaml)
3. change the name of the service in `serverless.yaml`
4. Add event source to the function
5. `serverless deploy` it ships your code to production or any stage you have defined (stack will be created)
6. If you change the function code and want to redeploy your function `serverless deploy --function function-name`
    + It's faster then `serverless deploy`

**Minimal configuration for Serverless.yaml**
```yaml
service: service-name # a way to group the functions together. Functions deployed as units

provider:
    name: aws
    runtime: nodejs6.10
    stage: dev #optional, but there are more advanced settings. See variables.
    region: eu-central-1 #optional, but there are more advanced settings. See variables.

functions:
    get:
      handler: get.handler
      timeout: 3 # in seconds, default settings
      memory: 256 # in mb, default settings
      events: 
        -http:
            path: /
            mothod: get
```

## Permissions as AWS User to deploy functions

1. Approach #1: Use IAM user with admin access: you simply create a new user and give the admin rights to the user. Dot use your AWS credentials. This approach is conviniet but not secure at all. 
2. Approach #2: Give tightly-scoped permissions by trial-and-error: principle of least privilege and gradually give more permissions as the developer tries to deploy the code. The problem with this approach is that the range of the permissions is diversed. The very secure approach but very complicated to manage. You can use the [Yeoman generator to crate IAM policy](https://github.com/dancrumb/generator-serverless-policy) which spits out policy json file that you can use to create your policy. It's good starting point but far away from complete. Many companies and enterprises have adopted this approach.
3. Approach #3: use an admin user for dev account for development, then apply required permissions to user in prodc account. You can check the event history in the IAM user account and see what actions where performed, and grant access to those version and reverse actions for rollback. 

![Mental Model](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-iam-policy-new.png)

**Permissions to Deploy**
 1. `serverless deploy, serverless remove` : creating and deleting s3 buckets, creating CloudFormation stacks
 2. custome resources: as you see later you can always declare later additional resources such as DynamoDb table, SNS topics in the serverless.yaml and those needs to be included as a part of CloudFormation stack. In some cases serverless will do it for you automatically when you configure some functions event source.
 3. plugins: one of the main things is the extensibility, you can fill the gap by adding some plugins such as serverless fich that deploys static files to S3 and make them available. The introduce more permissions that needs to be added to your IAM user.
 4. CloudFormation rollback for all of the above: if the deployment fails for what reason than CloudFormation needs to rollback any changes that you made during the deployment (db tables, API Gateway etc.). So you need permissions to delete these resources. 
