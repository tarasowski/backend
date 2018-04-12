const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-central-1',
    endpoint: 'http://localhost:8000'
})

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: 'Projects', // a new table name to create 
};

dynamodb.deleteTable(params, (err, data) => {
    if (err) {
        console.error('Unable to create table', JSON.stringify(err, null, 2));
    } else {
        console.log(`Deleted Table: ${params.TableName}`, JSON.stringify(data, null, 2));
    }
});