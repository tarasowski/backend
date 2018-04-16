const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const dynamoDb = new AWS.DynamoDB

const params = {
    "TableName": "PL.User",
    "Key": {
        "UserId": {"S": "001"}
    },
    "ReturnConsumedCapacity": "TOTAL",
    "UpdateExpression": "SET #LN = :t, #NOL = :n",
    "ExpressionAttributeNames": {
        "#LN": "LastName",
        "#NOL": "NoofLogins"

    },
    "ExpressionAttributeValues": {
        ":t": {"S": "Tyrson"},
        ":n": {"N": "1"}
    }
}

dynamoDb.updateItem(params).promise()
    .then(res => console.log(res))
    .catch(err => console.error(err))