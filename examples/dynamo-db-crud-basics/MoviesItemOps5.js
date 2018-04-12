const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-central-1',
    endpoint: 'http://localhost:8000'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'Movies';
const year = 2015;
const title = 'The Big New Movie';

const params = {
    TableName: table,
    Key: {
        year,
        title
    },
    UpdateExpression: 'remove info.actors[0]',
    ConditionExpression: 'size(info.actors) > :num',
    ExpressionAttributeValues: {
        ':num': 2
    },
    ReturnValues: "UPDATED_NEW"
}

console.log('Attempting a conditional update...');

docClient.update(params, (err, data) => {
    if (err) {
        console.error('UpdateItem failed:', err);
    } else {
        console.log('UpdateItem succeed:', data)
    }
});

