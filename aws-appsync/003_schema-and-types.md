# GraphQL Schema & Types

## Type System

GraphQL language is basically about selecting fields on objects. 

```js
// request
{ // special root object
    hero { // selector, we select hero on the object
        name // this is what we want to be returned from the selection
        appearsIn
    }
}

// response
{
    "data": {
        "hero": {
            "name": "Subzero", 
            "appersIn": [
                "New",
                "Empire",
                "Jedi"
            ]
        }
    }
}
``` 

1. We start with a special root object
2. We select the `hero` field on that
3. For the object returned by `hero`, we select `name` and `appearsin` fields

Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service. Then, when queries come in, they are validated and executed against the schema.

## Type Language

GraphQL services can be written in any language. In the examples below we are going to user the GraphQL schema definition language (DSL), it allows us to talk about GraphQL schemas in a language-agnostic way.

### Object Types & Fields

The most basic component of GraphQL schema are object types, which represent a kind of object you can fetch from your service and what fields it has. In the GraphQL schema language we can do something like that:


**This is an object type**
```js
type Character {
    name: String!
    appersIn: [Episode]!
}
``` 

**What is a type?**
In computer science and computer programming, a data type or simply type is a classification of data which tells the compiler or interpreter how the programmer intends to use the data.

**What is an object type**
In computer science, an object type (a.k.a. wrapping object) is a datatype that is used in object-oriented programming to wrap a non-object type to make it look like a dynamic object (Source: Wikipedia). An object type is a user-defined composite datatype that encapsulates a data structure along with the functions and procedures needed to manipulate the data. (Source: Oracle)

1. `Character` is a GraphQL Object Type, meaning it's type with some fields.
2. `name` and `appersIn`are fields on the `Character` type. That means that `name` and `appearsIn` are the only fields that can apper in any part of GraphQL query that operates on the `Character` type
3. `String` is one of the built-in scalar types - these are types that resolve to a single scalar object  and can't have sub-selections in the query. 
4. `String!` means that the field is non-nullable, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language we'll present those with an exclamation mark. 
5. [Episode]! represents an arry with `Episode` objects. Since it's also non-nullable, you can always expect an array (with zero or more items) when you query the `appearsIn` field

### Arguments

Every field on GraphQL object type can have zero or more arguments, for example the `length` field below:

```js
type Starship {
    id: ID!
    name: String!
    length(unit: LengthUnit = METER): Float
}
``` 
All arguments are named. Unlike languages like JavaScript and Python where functions take a list of ordered arguments, all arguments in GraphQL are passed by name specifically. In this case field `length` has one defined argument `unit`. Arguments can be either required or optional. When an argument is optional, we can define a default value - if the `unit` argument is not passed, it will be set to METER by default. 

### The Query and Mutation Types

There are two special types in the GraphQL schema:

```js
schema {
    query: Query
    mutation: Mutation
}
```

Every GraphQL has a `query` type and may or not have a `mutation` type. These are the same as regular object types, but they are special because they define the entry point of every GraphQL query. 

So if you see query that looks like this:

```js
query {
    hero {
        name
    }
    droid(id: "2000") {
        name
    }
}

// output
{
    "data": {
        "hero": {
            "name": "R2-D2"
        }
        "droid": {
            "name": "Droid2000"
        }
    }
}
``` 

That means that GraphQL service needs to have a `Query` type with `hero` and `droid` fields:

```js
type Query {
    hero(episode: Episode): Character
    droid(id: ID!): Droid
}
``` 

Mutation works in similar way you define fields on the `Mutation` type, and those are available as the root mutation fields you can call in your query. 



[Source](https://graphql.org/learn/schema/)