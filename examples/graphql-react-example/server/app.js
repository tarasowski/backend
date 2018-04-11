const express = require('express')
const app = express()
const graphHTTP = require('express-graphql') // allows express to understand graphql and run a server
const schema = require('./schema/schema')

const PORT = 4000

app.use('/graphql', graphHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => console.log(`Listeting for request on ${PORT}`))