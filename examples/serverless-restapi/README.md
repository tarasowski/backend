# serverless-node-rest-api

A Serverless Framework Project for a REST HTTP API for CRUD operations on DynamoDB.

1. `git clone git@github.com:fernando-mc/serverless-node-rest-api.git`
OR
`git clone https://github.com/fernando-mc/serverless-node-rest-api.git`

2. `npm install`

3. `serverless deploy`

That's it!

Then...

Add a pet:
`curl -X POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets --data '{ "petName": "Bella", "petBreed": "Corgi" }'`

Sample response:
`{"id":"618b4190-6917-11e7-82a3-ed6b88661fcb","petName":"Bella","petBreed":"Corgi","createdAt":1500093479977,"updatedAt":1500093479977}`

Add another pet:
`curl -X POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets --data '{ "petName": "Riley", "petBreed": "Jack Russell Mix" }'`

List all pets:
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets`

List the details of a specific pet (in this case Bella from above):
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets/618b4190-6917-11e7-82a3-ed6b88661fcb`

General structure for listing specific pet details:
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/pets/id`

Inspired by - https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb