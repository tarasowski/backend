const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const dynamoDb = new AWS.DynamoDB()


const listTables = () => {
    console.log('Listing Tables')
    
    const params = {}
    
    return dynamoDb.listTables(params).promise()
    .then(res => console.dir(res, {depth: null, colors: true}))
    .catch(err => console.error(err))
}

const describeJobTable = () => {
    console.log('Describe Job Table')

    const params = {
        TableName: 'PL.Job'
    }
    return dynamoDb.describeTable(params).promise()
        .then(res => console.dir(res, {depth: null, colors: true}))
        .catch(err => console.error(err))
}

listTables()
    .then(describeJobTable)
    .catch(err => console.error(err))
