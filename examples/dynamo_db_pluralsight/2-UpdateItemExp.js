const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const dynamoDb = new AWS.DynamoDB

const params = {
    "TableName": "PL.User",
    "Key": {
        "UserId": {"S": "001"}
    },
    "ReturnConsumedCapacity": "TOTAL",
    "UpdateExpression": "ADD #NOL :n",
    "ExpressionAttributeNames": {
        "#NOL": "NoOfLogins"

    },
    "ExpressionAttributeValues": {
        ":n": {"N": "1"},
        ":max": {"N": "5"}
    },
    "ConditionExpression": "#NOL < :max"
}

dynamoDb.updateItem(params).promise()
    .then(res => console.log(res))
    .catch(err => console.error(err))