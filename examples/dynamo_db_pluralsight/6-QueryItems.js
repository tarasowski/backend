const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const print = require('./lib/helpers').printPretty
const dynamoDb = new AWS.DynamoDB

const params = {
    "TableName": "PL.JobApplication",
    "KeyConditionExpression": "JobId = :jobid",
    "ExpressionAttributeValues": {
        ":jobid": { "S": "c408f9ea-f1c9-4902-ba95-0704b1f1081b"}
    },
    "ReturnConsumedCapacity": "TOTAL",
}

dynamoDb.query(params).promise()
    .then(print)
    .catch(err => console.error(err))