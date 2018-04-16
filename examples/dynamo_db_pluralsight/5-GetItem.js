const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const print = require('./lib/helpers').printPretty
const dynamoDb = new AWS.DynamoDB

const params = {
    "TableName": "PL.Job",
    "Key": {
        "CountryId": { "S": "18" },
        "JobId": { "S": "0a3f0544-957c-43ab-9312-b7caa59116a7" }
    },
    "ReturnConsumedCapacity": "TOTAL",
}

dynamoDb.getItem(params).promise()
    .then(print)
    .catch(err => console.error(err))