const graphql = require('graphql')
const AWS = require('aws-sdk')

// fix the callbacks -> promises
AWS.config.update({
    region: 'us-east-1',
})

const docClient = new AWS.DynamoDB.DocumentClient()
const uuidv4 = require('uuid/v4')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = graphql


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                const params = {
                    TableName: 'graphql-authors',
                    Key: {
                        id: parent.authorId
                    }
                }
                
               const result = docClient.get(params).promise()
                .then(data => data.Item)
                .catch(err => err)

                return result
            }
        }

    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        age: { type: GraphQLInt },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                const params = {
                    "TableName": "graphql-books",
                    "IndexName": "authorId-index",
                    "KeyConditionExpression": "authorId = :authorId",
                    "ExpressionAttributeValues": {
                        ":authorId": parent.id
                    },
                    "ScanIndexForward": false,
                    "ReturnConsumedCapacity": "TOTAL"
                }
                
               const result = docClient.query(params).promise()
                .then(data => data.Items)                    
                .catch(err => console.error(err))
                
                return result
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getBook: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                const params = {
                    TableName: 'graphql-books',
                    Key: {
                        id: args.id
                    }
                }
                
                const result = await docClient.get(params, (err, data) => {
                    if (err) {
                        console.error(err)
                    } else {
                        return data.Item
                    }
                }).promise()
                .then(data => {
                    return data.Item
                })
                
                return result
            }
        },
        getAuthor: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                
                const params = {
                    TableName: 'graphql-authors',
                    Key: {
                        id: args.id
                    }
                }
                
                const result = docClient.get(params, (err, data) => {
                    if (err) {
                        console.error(err)
                    } else {
                        return data.Item
                    }
                }).promise()
                .then(data => {
                    return data.Item
                })
                
                return result
            }
        },
        getBooks: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                
            }
        },
        getAuthors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve (parent, args) {
                const id = uuidv4()
                let params = {
                    TableName: 'graphql-authors',
                    Item: {
                        id,
                        name: args.name,
                        age: args.age
                    }
                }
                
                const response = docClient.put(params, (err, data) => {
                    if (err) {
                        console.log(err, 'There was something wrong with adding new iteam to db')
                        throw new Error('Something is wrong with saving to db')
                    }
                        console.log('New book was saved to db')
                }).promise()
                .then(() => {
                    return {
                        id,
                        name: args.name,
                        age: args.age,
                    }
                })
                .catch(err => console.log(err))
                return response
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve (parent, args) {
                const id = uuidv4()
                
                let params = {
                    TableName: 'graphql-books',
                    Item: {
                    id,
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                }
            }
            const response = docClient.put(params, (err, data) => {
                if (err) {
                    console.log(err, 'There was something wrong with adding new iteam to db')
                    throw new Error('Something is wrong with saving to db')
                }
                    console.log('New book was saved to db')
            }).promise()
            .then(() => {
                return {
                    id,
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                }
            })
            .catch(err => console.log(err))
            return response

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})