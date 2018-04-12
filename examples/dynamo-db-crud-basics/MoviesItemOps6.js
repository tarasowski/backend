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
    ConditionExpression: 'info.rating <= :val',
    ExpressionAttributeValues: {
        ':val': 10.0
    }
};

console.log('Attempting a conditional delete...');

docClient.delete(params, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});