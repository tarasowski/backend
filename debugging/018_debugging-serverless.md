# Debugging Serverless Apps

[Source](https://livebook.manning.com/#!/book/serverless-apps-with-node-and-claudiajs/chapter-5/v-5/6)

You can't use regular techniques to debug serverless applications, since they are integrated with many systems. Amazon does provide a service CloudWatch to debug your Lambda functions and tracking, monitoring your other AWS resources. AWS is available in the AWS CLI and you can use it from there. 

There are different ways how you can use CloudWatch:

* Via the AWS web console from the browser
* Using the AWS CLI from your terminal
* With the AWS API
* With the AWS SDK (depending on the programming language)

> CloudWatch is a simple service that captures logs and errors from your serverless functions. Whenever you log something in your function `console.log()` - those logs are automatically sent to AWS CloudWatch. 

By default the logs are stored for ever, but you can configure how long you want to keep them. In order to save costs you should investigate the retention period. 

## Debugging your Lambda function

```js
'use strict'

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const rp = require('minimal-request-promise')

module.exports = function createOrder(request) {
  console.log('Save an order', request) // this goes to CloudWatch

  if (!request || !request.pizza || !request.address)
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')

  // ...
``` 

In order to find these log files from the AWs console you can use following command

```
aws logs \
  filter-log-events \
  --filter='Save an order' \
  --log-group-name=/aws/lambda/pizza-api \
  --output=json
``` 

The output will be a not very readable json file in order to output only the message you can simply use following command from the CLI

```
aws logs \
  filter-log-events \
  --filter='Save an order' \
  --log-group-name=/aws/lambda/pizza-api \
  --query='events[0].message' \
  --output=text
``` 

## Debugging with X-Ray

AWS X-Ray shows the dataflow of your application and all of it's involved services in near realtime. In addition, the X-Ray SDK automatically captures metadata for all API calls made to AWS services using the AWS SDK.

**Note:** To enable X-Ray for your Lambda function, you'll need to add a policy that allows X-Ray to interact with it and you need to set tracing mode to `Active` in your function configuration.

You can find here detailed documentation how to integrate X-Ray with your Lambda [Source](https://docs.aws.amazon.com/lambda/latest/dg/lambda-x-ray.html)

You need now to attach policy to activate X-Ray

```
aws iam \
  attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess \
  --role-name pizza-api-executor \
  --output json
``` 
**Note:** If the command is executed successfully it will return an empty result. 

In the next step you need to update your function configuration

```
aws lambda \
  update-function-configuration \
  --function-name pizza-api \
  --tracing-config Mode=Active
``` 

This command will return the Lambda function configuration as JSON output. To be able to see other AWS services supported by X-Ray, you’ll need to wrap the AWS SDK for Node.js in the aws-xray-sdk-core module. 

```
'use strict'

const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = function updateDeliveryStatus(request) {
  console.log('Save an order', request)

  if (!request.deliveryId || !request.status)
    throw new Error('Status and delivery ID are required')

// ...
``` 

To see the visual representation of your function you can check out the X-Ray section of the AWS web console.