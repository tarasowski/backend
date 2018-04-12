const express = require('express')
const app = express()
const graphHTTP = require('express-graphql') // allows express to understand graphql and run a server
const schema = require('./schema/schema')
const cors = require('cors')

const PORT = 4000

app.use(cors())

app.use('/graphql', graphHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => console.log(`Listeting for request on ${PORT}`))