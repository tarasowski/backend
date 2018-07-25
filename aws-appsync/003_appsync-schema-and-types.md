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

GraphQL services can be written in any language. In the examples below we are going to user the GraphQL schema definition language, it allows us to talk about GraphQL schemas in a language-agnostic way.

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

**What is an object type?**
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

#### Passing Arguments
By defining an argument in the schema language type checking happens automatically. Imagine we have an endpoint:

```js
type Query {
    rollThreeDice: [Int]
}
``` 
Instead of hardcoding "three" we want something more general.

```js
type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
}
``` 

When a resolver function takes arguments, they are passed as one "args" object, as the first argument to the function. We can use ES6 destructuring assignment fo these parameters, since you know the format they will be. More information [here](http://graphql.org/graphql-js/passing-arguments/)

```js
var root = {
  rollDice: function ({numDice, numSides}) {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};
``` 

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


### Scalar types

**What are scalar types?**
A scalar is a simple single numeric value (as in 1, 2/3, 3.14, etc.), usually integer, fixed point, or float (single or double), as opposed to an array, structure, object, complex vector. However, note that a large very complex data type of the sort that can also be flattened and represented in 8-bit bytes of computer memory can also be represented as one single very long/large binary scalar number.


A GraphQL object type has a name and fields. In the following query, the `name` and `appearsIn` will resolve to scalar types:

```js
//request

{
  hero {
    name
    appearsIn
  }
}

// response
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ]
    }
  }
}
``` 
**Note:** We know this because those fields don't have any sub-fields - they are the leaves of the query.

GraphQL has a set of defined scalar types:

* Int: A signed 32-bit integer
* Float: A signed double-precision floating-point value
* String: A UTF-8 character sequence
* Boolean: true or false
* ID: The ID scalar type represents unique identifier

**Note:** You can define also custom scalar types. For example you could define a `date` type: `scalar Date`. Then it's up to our implementation to define how that type should be serialized, deserialized and validated.

### Enumeration Types

Also called Enums, enumeration types are s special kind of scalar that is restricted to a particular set of allowed values. This allows you to:

1. Validate any arguments of this type are one of the allowed values
2. Communicate through the type system that a field will always be one of a finite set of values

Here is how an enum defintion looks in GraphQL

```js
enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
}
``` 

That means whenever we use the type `Episode` in our schema, we expect it to be exactly one of `NEWHOPE, EMPIRE OR  JEDI`

### Lists and Non-Null

Object types, scalars and enums are the only types you can define in GraphQL. But when you use this types in other parts of the schema, or in your query variable declarations, you can apply additional type modifiers that affect validation of those values. 

```js
type Character {
    name: String!
    appersIn: [Episode]!
}
```
Here we are using a `String` type and making it non-nullable by adding an exclamation mark after the name. This means that our server expects to return a non-nullable value for this field, and if ends up getting a null it will actually trigger a GraphQL execution error. It can be also used when defining arguments.

List works in similar way: We can use a type modifier to make a type as a List `[ ]`. During the validation steps it will expect an array for that value. The Non-nullable and list modifiers can be combined. For example you can have a list of Non-Null strings:

```js
myField: [String!]
```
That means the the list itself can be null, but it can't have any null members. For example JSON:

```js
myField: null // valid
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // error
``` 
Now, let's say we define a Non-Null List of Strings:

```js
myField: [String]!
```
This means that the list itself cannot be null, but can contain null values

```js
myField: null // error
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // valid
``` 

### Interfaces

GraphQL supports interfaces. An interface is an abstract type that includes a certain set of fields that a type must include to implement the interface

```js
interface Character {
    id: ID!
    name: String!
    friends: [Character]
    appersIn: [Episode]!
}
``` 
That means that any object type that implements `Character` needs to have these exact fields, with these arguments and return data types.

```js
type Human implements Character {
    id: ID!
    name: String!
    friends: [Character]
    appersIn: [Episode]!
    starships: [Starship]
    totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
``` 
You can see that both of these types have all of the fields from the `Character` interface, but also bring extra fields, `totalCredits`, `starships`, `primaryFunctions`, that are specific to that particular type. 

**Note:** Interfaces are useful when you want to return an object or set of objects, but those might be of several different types.

### Input Types

So far we only talked about passing scalar values, like enums or strings, as arguments into a field. But you can also pass complex objects. This is useful for mutations when you want to pass a complete object to be created. In GraphQL input types look exactly the same like regular object types, but with the keyword input instead of type:

```js
input ReviewInput {
    stars: Int!
    commentary: String
}
``` 

Here is how you can use the input object in a mutation:

```js
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}

// VARIABLES

{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
``` 

```json
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```
The fields on an input object type can themselves refer to input object types, but you can't mix input and output in your schema. Input types also can't have arguments on their fields. 


[Source](https://graphql.org/learn/schema/)