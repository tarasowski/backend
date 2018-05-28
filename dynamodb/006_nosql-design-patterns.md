# NoSQL Design Patterns - Summary

[An Introduction to NoSQL Patterns](https://dzone.com/articles/introduction-nosql-patterns)

The all have some common characteristics
* Key value store
* Run on large number of commodity machines
* Data are replicated an partitioning among these machines
* They relax the data consistency requirements ([CAP theorem](http://www.julianbrowne.com/article/brewers-cap-theorem))

## API Model

* The underlayign data model can be considered as a large Hashtable (key/value store)
* The basic form of API access is:
    + get(key) - extract the value given a key
    + put(key) - create or update the value given it's key
    + delete(key) - remove the key and its associated value

## Machines Layout

The underlying infrastructure is composed of large number (hundreds of thousands) of cheap, commoditized, unreliable machines connected through a network. Each machine is a physical node (PN). Each PN has the same set of software configuration but may have varying hardware capacity in terms of CPU, memory and disk storage. Whitin each PN there will be a variable number of virual nodes (NV) running according to the available hardware capacity of the PN

![PN](http://4.bp.blogspot.com/_j6mB7TMmJJY/SwogI5pkEEI/AAAAAAAAAXE/xhrfSf8dmI4/s320/p1.png)

## Data Distribution

The overall hashtable is distributed across many VNs, we need to way to map each key to the corresponding VN. In order to do so, we use partitions.

Data is distributed across many virual nodes. In order to be fault-tolerant virual nodes can be assigned in a random manner to physical nodes. Also we need to make sure that a physical node doesn't contain replicas of the same key ranges.

## Client Consistency

Once we have multiple copies of the same data, we need to worry about how to sync them such as that the client has a consistent view of data.

There is a number of client consistency models
* strict consistency: this provides the semantics as if there is only one copy of data. Any update is observed instaneously
* read your write consistency
* session consistency
* monotonic read consistency
* eventuall consistency: this provides the weakness form of guarantee. The client can see an inconsistent view as the update is in progress. 

# Data Model Design

[Data Model Design](https://docs.mongodb.com/manual/core/data-model-design/)

The key considiration for the structure of your documents is the decision to embed or to use references 

### Denormalized Data Models (Embedded Data Models)

* You can embed related data in a single structure or document. These schemas are generally known as "denormalization" models.

![Example](https://docs.mongodb.com/manual/_images/data-model-denormalized.bakedsvg.svg)

Embedded data models allows applications to store related pieces of information in the same database record. As a result, applications may need to issue fewer queries and updates to complete common operations.

Use embedded data models when:
* If you have "contains" relationships between entities. (one to one relationships with embedded documents)
* you have one-to-many relationsships between entities. In these relationships the many o child documents always appear with or are viewed in the context of the one or parent document

Embedded document provide better performance for read operations, also they make possible to update related data in a single atomic write operation. But it can also lead later to problems where documents grow after creation. Also you have to be aware of the limits of each single document in the database. In DynamoDb these are 400kb per item.

### Normalized Data Models

Normalized data models describe relationships using references between documents.

![Normalization](https://docs.mongodb.com/manual/_images/data-model-normalized.bakedsvg.svg)

In general use normalized data models:
* When embedding would result in duplication of data but would not provide sufficient read performance advantages to outweight the implications of the duplication
* to represent more complex many to many relationships
* to model large hierarchical data sets

**References provides more flexibility than embedding. However, the client-side applications must issue follow-up queries to resolve the references. In order words normalized data models can require more round trip s to the server. 

Here is an example how it would work in relational database

![Join](http://s3.amazonaws.com/info-mongodb-com/_com_assets/blog/image01_2.jpg)

Here is an example how you can do it as a document model

```js
{
    first_name: “Paul”,
    surname: “Miller”,
    city: “London”,
    location: [45.123,47.232],
    cars: [
       { model: “Bentley”,
        year: 1973,
        value: 100000, ….},
       { model: “Rolls Royce”,
        year: 1965,
        value: 330000, ….},
    ]
    }
``` 

Here is an another example relational database vs. document database

![Example](http://s3.amazonaws.com/info-mongodb-com/_com_assets/blog/image00_1.jpg)

* An aggregated document can be accessed with a single call to the database, rather than having to JOIN multiple tables to respond to a query. 
* As documents are self-contained, distributing the database across multiple nodes (a process called sharding) becomes simpler and makes it possible to achieve massive horizontal scalability on commodity hardware. 

### Data Model Design and Patterns

[Data Model Examples and Patterns](https://docs.mongodb.com/manual/applications/data-models/)

#### Model One-to-Many Relationships with Document References

```js
{
   _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA"
}

{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",
   publisher_id: "oreilly"
}

{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",
   publisher_id: "oreilly"
}
``` 



