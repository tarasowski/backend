const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const dynamoDb = new AWS.DynamoDB()



console.log('Listing Tables')

const params = {}
dynamoDb.listTables(params).promise()
    .then(res => console.dir(res, {depth: null, colors: true}))
    .catch(err => console.error(err))