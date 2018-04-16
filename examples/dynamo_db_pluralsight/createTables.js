const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const dynamoDb = new AWS.DynamoDB()
const tablePrefix = 'PL.'

function createJobTable() {
    const params = {
        TableName: tablePrefix + 'Job',
        KeySchema: [
            {
                AttributeName: 'CountryId',
                KeyType: 'HASH'
            },
            {
                AttributeName: 'JobId',
                KeyType: 'RANGE'
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'CountryId',
                AttributeType: 'S'
            },
            {
                AttributeName: 'JobId',
                AttributeType: 'S'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    }   

    return dynamoDb.createTable(params).promise()
}

function createUserTable() {
    const params = {
        TableName: tablePrefix + 'User',
        KeySchema: [
            {
                AttributeName: 'UserId',
                KeyType: 'HASH'
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'UserId',
                AttributeType: 'S'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    }   

    return dynamoDb.createTable(params).promise()
}

function createJobApplicationTable() {
    const params = {
        TableName: tablePrefix + 'JobApplication',
        KeySchema: [
            {
                AttributeName: 'JobId',
                KeyType: 'HASH'
            },
            {
                AttributeName: 'UserId',
                KeyType: 'RANGE'
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'JobId',
                AttributeType: 'S'
            },
            {
                AttributeName: 'UserId',
                AttributeType: 'S'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    }      

    return dynamoDb.createTable(params).promise()
}

function done() {
    console.log('Finishing creating all three tables')
}

createJobTable()
    .then(createUserTable)
    .then(createJobApplicationTable)
    .catch(err => console.error(err))
    .then(done)
