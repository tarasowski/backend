const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1'})
const dynamoDb = new AWS.DynamoDB()

const params = {
    "TableName": "PL.User",
    "Item": {
        "UserId": {"S": "003"},
        "FirstName": {"S": "John"},
        "Lastname": {"S": "Doe"}
    },
    "ReturnConsumedCapacity": "TOTAL"
}

dynamoDb.putItem(params).promise()
    .then(res => console.dir(res, {depth: null, color: true}))
    .catch(err => console.error(err))