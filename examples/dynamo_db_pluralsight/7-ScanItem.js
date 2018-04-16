const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'})
const print = require('./lib/helpers').printPretty
const dynamodb = new AWS.DynamoDB();

const epochNow = 1506043477;

const params = {
  "TableName": "PL.Job",
  "FilterExpression": "CountryId = :country AND ClosingTime > :time",
  "ExpressionAttributeValues": {
     ":country": {
        "S": "18"
     },
     ":time": {
        "N": epochNow.toString()
     }
  },
  "ReturnConsumedCapacity": "TOTAL"
};

dynamodb.scan(params).promise()
  .then(print)
  .catch(print);
