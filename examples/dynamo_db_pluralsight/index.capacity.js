const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const dynamoDb = new AWS.DynamoDB()

console.log('Increasing RCUs/WCUs to 2: ')

const params = {
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
    },
    TableName: 'PL.Job'
}

dynamoDb.updateTable(params).promise()
    .then(() => {
        const params = { TableName: 'PL.Job'}
        console.log('Waiting for update to finish...')
        return dynamoDb.waitFor('tableExists', params).promise()
    })
    .then(res => console.dir(res, {depth: null, colors: true}))
    .catch(err => console.error(err))