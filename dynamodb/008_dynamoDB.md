# What is DynamoDB

DanymoDB is a fully managed NOSQL database provided by AWS. With NOSQL there are no relations in the database. This is super important. In MYSQL you would have multiple tables which you could connect to each other, you can set a relation. In NOSQL the different tables in the database stay for their own. 

## Why is DynamoDB a good fit for serverless architecture?

Because it's fully managed and you don't have to spinup any database servers. There are no server clusters behind it, instead there are couple of solid state drives which stores your data. Again it's about hosted DB on AWS.

## Data Model?

The date format for the DynamoDB has a key/value pairs, just like JSON/JS Object. There are no any schemas! One important things that needs to be present is the ID of the entry, but besides that you can store whatever you want in one storage. It's transactional manner of NOSQL and makes it interesting for large sets of data, because of the flexibility. 

## How to organise the data in DynamoDB?

In a DynamoDB in the table we are always required to have a partition key. Then you can have as many attributes as you need, but that partition key is a must. We can use for a partition key e.g. a user id, but we need to tell DynamoDB that is the partition key. The special thing about the partition key it has to be unique, it has to have unique values. 

**Fact:** Why is it named partition key? That's related to the DynamoDB how it stores the data behind the scenes. It uses a fleet of solid state drives and it tries to store the data efficiently by partitioning these state drives. To put in to very simple example, it stores it by letters from A to Z (A, B, C, D, E, F, G...), but if the partition key stars with A it's going to be in the A partition, if it starts with C it could be in the C partition. Back to the user id if the first user has A1, A2, A3 etc. that would probably sit in the A partition. For very efficient distribution which makes accessing the data as fast as possible, you should aim to split the data among many partitions. It would be good to have random partition keys, so user 1 has A5, user 2 has C6 and user 3 has D8...

## Primary Key?

Primary key is by which the data is identified and can be queried, sometimes to have a single attribute could be a good identifier, instead we want to have a combination of two: partition key + sort key. The DynamoDB gives us the opportunity to do so. The sort key is a timestamp. In the example we would have as a partition key the user id but sometimes we will have the same data since the user e.g. with the same id can be doing any things. In order to have it unique we can use the sort key (timestamp) to create unique primary keys for data management.

## Global Secondary Index? 

But even sometimes these combination is not enough. For instance I want to query the first name, for this reason we can setup a global secondary index, this can be setup explicitly and you can setup 5 of this per table this forces DynamoDB to manage this attribute in kind of special way and more optimal way and it makes quering much more efficient and it allows also to query this secondary index.

## Local Secondary Index?

If you want to use a combination of primary key (user id + timestamp) and an attribute you can also setup a local secondary index. And all these features give a lot of flexibility to query the data.

**Note:** Often we'll work only with the combination of primary key and sometimes with a global secondary index. The key takeaway is that DynamoDB is very flexible and gives many options for structuring the data and then quering the data.

![DynamoDb](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-dynamodb-keys.png)

## NoSQL vs. SQL

We need to understand when to use NoSQL and when to use SQL databases:

* NoSQL: 
    + No relations
    + High Flexibility (No/Weak Schemas: you can store whatever data you want in the same table)
    + Data repetition
    + No data integrity checks unlike in a relatiotional database 
    + Easy scalable there are no servers to be managed it's all stored on a fleet of solid state drives

* SQL:
    + Relations: we have relations there it's not disadvantage
    + Limited flexibility (Strong Schemas) each table has strongly defined schemas, each entry we add has to match the schema
    + No data repetition
    + Strong integrity checks
    + Harder to scale because we have limited flexibility and we have to manage the servers on own (e.g. clustering)
        - That's why AWS has no comporable service for SQL, there is no fully managed/rescale service

## AWS DynamoDB + AWS Lambda

DynamoDB can be an event source (trigger AWS Lambda) because you can configure Lambda to changes in DynamoDB table, if you add a new element you can trigger a function in Lambda. But you can also access DynamoDB as your data repository and store or retrieve a data from a Lambda function. 

What's "Provisioned Throughput" or "Read and Write Capacity" all about? It defines how many read or write actions you may perform per action. [more](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ProvisionedThroughput.html)

How do you access DynamoDB actions via Lambda? That's correct, you'll have to create a new instance of the DynamoDB object and can then start using it.

What's the difference between `scan()` and `getItem()`? `getItem()` returns one item, `scan()` returns multiple items.

## Provisioned Capacity?

You provision (bereitstellen) certain read/write capacity. You tell AWS how often do yu plan read/write data per second. The calculation is not about only reading/writing but also about the size we are talking about kb/s (size limit 400kb per item). 5/5 is within the free tier even though it shows you costs. 

## UI walkthrough

* Time to live attribute: difines how long the data should lieve and when it should be deleted. 
* Items: allows us to view and create items in the table
* Metrics: here you can see your throttled read/write requests. !!!Important: if you exceed your read/write request you are not going to pay more it just fails.
* Alarms: when you read the limits to get an email or sms
* Capacity: allows to change the capacity
* Indexes: add new global/secondary indexes
* Access control: who can access the data in this table

Programmaticaly: creating items from the Lambda function to the database or make it from the AWS Interface from their GUI just by doing it manually

## Multiple DynamoDB Databases?

We can only create tables? And this is exactly how DynamoDB works. For your whole account you will only have one database per region. We can also switch the region to get a new database. But if you stay within one region you will only have one database and couple of tables, which are by nature are not related to each other but there is no way of separating them into different databases. 

## How to access DynamoDB from a Lambda Function?

The good thing AWS gives us an SDK to do so not from the GUI but programatically from the IDE/function. [Node.js SDK](https://aws.amazon.com/sdk-for-node-js/)

First of all you need to install it, but in this example we are choosing another way to work with it. When using it from Lambda you don't need to install it, you only need to install it on your machine if you plan on using it on your machine. But code is going to run on Lambda and not on our machine. On Lambda the full SDK is provided in each function by default. You can simply access AWS SDK in any of your Lambda function, no matter which language you are using. The configuration part also doesn't apply because we are using it in Lambda, we still need to do something about the permissions. 

For us is the Run part is the important one.

```js
var AWS = require('aws-sdk');

var s3 = new AWS.S3();

// Bucket names must be unique across all S3 users

var myBucket = 'my.unique.bucket.name';

var myKey = 'myBucketKey';

s3.createBucket({Bucket: myBucket}, function(err, data) {

if (err) {

   console.log(err);

   } else {

     params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};

     s3.putObject(params, function(err, data) {

         if (err) {

             console.log(err)

         } else {

             console.log("Successfully uploaded data to myBucket/myKey");

         }

      });

   }

});
```

First of all we need to import the module `aws-sdk` and then we need to instanciate a new object for each AWS service to then access a couple of methods to use on these services. How do you know which methods and services we can use. Check out the API documentation [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html)

For DynamoDB you can find [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html) the information how to put items, how to change items etc. all the methods needed to manipulate the data. 

```js
const AWS = require('aws-sdk'); // import the AWS object with the methods
const dynamodb = new AWS.DynamoDB(); // create new dynamodb object by invoking the DynamoDB() constructor
```
**Note:** We can pass settings into our constructor `const dynamodb = new AWS.DynamoDB({region: 'eu-central-1', apiVersion: '2012-08-10')});` in this case it's needed so the DynamoDB looks into the right region. The SDK documentation shows more options we can pass into the constructor as an object. [Read more here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#constructor-property)

**Note:** Why we have added the the code above outside of the handler function. It has something to do with the way Lambda is executed.

```js
// outside
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-central-1', apiVersion: '2012-08-10')});

// inside
exports.handler = function(event, context, callback) {
    const calc = event.income * 5;
    callback(null, calc);
};
```

So why we are doing it? Because the code is not running all the time. In general when the trigger occurs. AWS quickly spins up service environment some wrapper containing the Lambda function. When the function finishes it keep the wrapper alive for couple of minutes and therefore if the function executes couple of times in a short time spent it will reuse that wrapper. Now we are taking advate out of it. If the wrapper is being started it will execute everything in this file not just the function handler. If the wrapper is still up it will no re-execute the part outside of the handler and that of course gives us a little performance edge, if we put the code that doesn't need executed on the triggering event outside of that handler.

## How to add a new item to the DynamoDB?

```js
/* This example adds a new item to the Music table. */

 var params = {
  Item: {
   "AlbumTitle": {
     S: "Somewhat Famous"
    }, 
   "Artist": {
     S: "No One You Know"
    }, 
   "SongTitle": {
     S: "Call Me Today"
    }
  }, 
  ReturnConsumedCapacity: "TOTAL", 
  TableName: "Music"
 };
 dynamodb.putItem(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
   /*
   data = {
    ConsumedCapacity: {
     CapacityUnits: 1, 
     TableName: "Music"
    }
   }
   */
 });
```
Note: We need to have a `Item` & `Table` properties under all conditions. We need to tell Amazon where to add something und under which conditions. `Item` is a javascript object, now when we can define this item:

```js
const params = {
    Item: {
        "UserId": { // this is an object, we are passing objects
            S: "1234569605956956" // we assign a data type it can be N (number), S (string), Map (object) etc.
        },
        "Age": {
            N: "34" // we need to use here the double quotes since we are always passing everything as a string
        },
        "Height": {
            N: "176"
        },
        "Income": {
            N: "20000"
        }
    },
    Table: "compare-yourself"
};
```
You need to keep in mind these structure if you work with the DynamoDB

## Defining execution roles

You can manage the roles under [IAM](https://console.aws.amazon.com/iam/home?region=eu-central-1#/home). Under roles you can find the roles that were created and now are used for the Lambda functions to access different services. In order to extend the roles we can click on attach new policy and search for the predefined roles. 

**Note:** `$inputRoot` holds the full request body in the body mapping templates. 

**Note:** If we are trying to write some data into DynamoDB we need to pass strings and not numbers, even if these are numbers. 

```js
#set($inputRoot = $input.path('$'))
{
    "age": "$inputRoot.age", // to string always
    "height": "$inputRoot.height", // to string always
    "income": "$inputRoot.income" // to string always
}
```
**Note:** Each function should have different roles according to the task it does. If you have a function that only `get` the data you need to give only the permisson for that. For a function that does `post` a data you need to create a special role for that function that only does write to DB. etc. The principle of leat privilige is to grant only needed access and not more.

**Note:** every role needs to get this policy `AWSLambdaBasicExecutionRole` by doing so the Lambda function will get access to write logs to CloudWatch.