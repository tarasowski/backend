const graphql = require('graphql')
const AWS = require('aws-sdk')
const { accessKeyId, secretAccessKey } = require('../../config/env')

AWS.config.update({
    region: 'us-east-1',
    //endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
    accessKeyId,
    secretAccessKey
})

const docClient = new AWS.DynamoDB.DocumentClient()
const uuidv4 = require('uuid/v4')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    } = graphql

// dummy data 

const dummyBooks = [
    { name: 'The first book in the list', genre: 'Fantasy', id: 1, authorId: 1 },
    { name: 'The second book in the list', genre: 'Action', id: 2, authorId: 2 },
    { name: 'Just another XYZ book', genre: 'Action', id: 2, authorId: 2 },
    { name: 'Random books for the second author', genre: 'Action', id: 2, authorId: 2 },
    { name: 'The third book in the list', genre: 'Fantasy', id: 3, authorId: 3 }
]

const dummyAuthors = [
    { name: 'Patrick 1', age: 33, id: 1 },
    { name: 'Patrick 2', age: 48, id: 2 },
    { name: 'Patrick 3', age: 55, id: 3 }

]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            async resolve(parent, args) {
                const params = {
                    TableName: 'graphql-authors',
                    Key: {
                        id: parent.authorId
                    }
                }
                
               const result = await docClient.get(params, (err, data) => {
                    if (err) console.log(err)
                    else return data.Item
                }).promise()
                .then(data => {
                    return data.Item
                })
                
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
            async resolve(parent, args) {
                const params = {
                    TableName: 'graphql-books',
                    Key: {
                        authorId: parent.id
                    }
                }
                
               const result = await docClient.get(params, (err, data) => {
                    if (err) console.log(err)
                    else return data.Item
                }).promise()
                .then(data => {
                    return data.Item
                })
                
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
                    console.log(data)
                    return data.Item
                })
                
                return result
            }
        },
        getAuthor: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                
                const params = {
                    TableName: 'graphql-authors',
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
                    console.log(data)
                    return data.Item
                })
                
                return result
            }
        },
        getBooks: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return dummyBooks
            }
        },
        getAuthors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return dummyAuthors
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
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            async resolve (parent, args) {
                const id = uuidv4()
                let params = {
                    TableName: 'graphql-authors',
                    Item: {
                        id,
                        name: args.name,
                        age: args.age
                    }
                }
                
                const response = await docClient.put(params, (err, data) => {
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
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            async resolve (parent, args) {
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
            const response = await docClient.put(params, (err, data) => {
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