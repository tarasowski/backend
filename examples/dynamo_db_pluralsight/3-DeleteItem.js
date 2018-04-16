const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const dynamoDb = new AWS.DynamoDB

const params = {
    "TableName": "PL.User",
    "Key": {
        "UserId": {"S": "001"}
    },
    "ReturnConsumedCapacity": "TOTAL"
}

dynamoDb.deleteItem(params).promise()
    .then(res => console.log(res))
    .catch(err => console.error(err))