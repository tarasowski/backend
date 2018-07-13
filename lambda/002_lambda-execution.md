# Lambda Execution Context

### Cheatsheet

### Working with Asyn() functions:

* Async function always returns a resolved promise. If the return value is not a promise it will wrap it into a promise. So you can simply return a promise and it will be resolved. In this case it can be used instead of `callback()` to return information back to the caller.

* Lambda's execution context exits before waiting for any completion of backgroup processes or callbacks. In case of `async` everthing that is in the event loop is going to be lost. Things like setTimeout callbacks and event listeners are scheduled into the event queue. They will be lost!

* You need to resolve the promises with `await` before your exit the execution context, or pass the promise to the `return statement` to be resolved. 

* Everything that is not in the `job queue` is going to be lost. The job queue is a completely separate queue. More importantly, messages in this queue are processed immediately at the end of each tick before the beginning of the next tick. Success handlers for promises are scheduled into this job queue. They get executed before the next message in the event queue. To a promise into a queue use `await`

**Summary**
* Return a promise or a value out of the function
* Promisify everything inside the function
* Use `await` to resolve promises // you need to resolve a promise otherwise Lamba will exit with Promise {Pending}
* Don't use the event loop, everything in it will get lost
* Work only with promises or promisified functions


```js
exports.lambda_handler = async(event) => {
    const id = Math.random().toString(36).substring(7)
    const params = {
        TableName: 'ServerlessWebTracker',
        Item: {
            website: {
                "S": id
            },
            url: {
                "S": 'test'
            }
        }
    }
    // will wait till the promise is resolved before the next tick, since it's in a job queue
    await dynamodb.putItem(params).promise()
        .then(() => console.log('successfully saved'))
        .catch(err => console.log(err))
    // Lambda's execution context doesn't exit without firing the callback, since it's not in the event loop
    process.nextTick(() => console.log('IM COMING FROM THE END OF THE TICK'))
    console.log('Im the first')
    // will not be executed since it will be pushed to the event loop and gets lost
    setTimeout(() => console.log('From the event queue'), 0)

    return 'Hello from Lambda'
}

// successfully saved
// Im the first 
// IM COMING FROM THE END OF THE TICK 
// "Hello from Lambda"
``` 

**Note:** If you want Lambda to process something you need that is asynchronous. First you need to promisify it and add `await` so it get's scheduled into the `job queue`. The job queue will be processed immediately at the end of each tick before the beginning of the next tick. Because there is only one tick, at the beginning of the next tick Lambda will exit the execution context.

**Note:** any time you call process.nextTick() in a given phase, all callbacks passed to process.nextTick() will be resolved before the event loop continues

Here is an example below of a function that would not work because `dynamodb.putItem` get pushed into the event loop / queue, that is not going to be processed with `async()` functions. So the data will not be saved into the database

```js
exports.lambda_handler = async(event, context, callback) => {
    const id = Math.random().toString(36).substring(7)
    const params = {
        TableName: 'ServerlessWebTracker',
        Item: {
            website: {
                "S": id
            },
            url: {
                "S": 'test'
            }
        }
    }

    // data gets not saved into the database
    dynamodb.putItem(params, (err, data) => {
        if (err) console.log(err)
        if (data) console.log('successfully saved')
    })


    process.nextTick(() => console.log('IM COMING FROM THE END OF THE TICK'))
    console.log('Im the first')
    setTimeout(() => console.log('From the event queue'), 0)
    return 'Hello from Lambda'

}

//Im the first
//IM COMING FROM THE END OF THE TICK
``` 

---
### Working with Callback():

* By default, lambda waits until the event loop is empty before terminating. You can set `context.callbackWaitsForEmptyEventLoop = false` to tell lambda to terminate the function soon after the callback is called, even if there is still items in the event loop.

* When the callback is called (explicitly or implicitly), AWS Lambda continues the Lambda function invocation until the event loop is empty.

```js
exports.lambda_handler = (event, context, callback) => {
    const id = Math.random().toString(36).substring(7)
    const params = {
        TableName: 'ServerlessWebTracker',
        Item: {
            website: {
                "S": id
            },
            url: {
                "S": 'test'
            }
        }
    }

    dynamodb.putItem(params, (error, data) => {
        if (error) console.log(error)
        if (data) console.log('successfully saved')
    })
    process.nextTick(() => console.log('IM COMING FROM THE END OF THE TICK'))
    console.log('Im the first')
    setTimeout(() => console.log('From the event queue'), 0)
    callback(null, 'Hello form Lambda')
}

// Im the first 
// IM COMING FROM THE END OF THE TICK 
// From the event queue 
// successfully saved 
// "Hello from Lambda"
``` 
* The Node.js runtimes v6.10 and v8.10 support the optional callback parameter. You can use it to explicitly return information back to the caller. The general syntax is:

```js
callback();     // Indicates success but no information returned to the caller.
callback(null); // Indicates success but no information returned to the caller.
callback(null, "success");  // Indicates success with information returned to the caller.
callback(error);    //  Indicates error with error information returned to the caller.
``` 

**Note:** If you don't use callback in your code, AWS Lambda will call it implicitly and the return value is null.

**Note:** AWS Lambda treats any non-null value for the error parameter as a handled exception.

**Summary:**
* Use `callback()`to return information back to the caller
* Push everything you need to process into the event loop (queue)
* Lambda execution environment will wait untill the event loop is empty

---
### Other Information

* When a Lambda function is invoked, AWS Lambda launches an Execution Context based on the configuration settings you provide.

* Execution Context is a temporary runtime environment that initializes any external dependencies of your Lambda function code.

* AWS Lambda tries to reuse the Execution Context for subsequent invocations of the Lambda function.

**Note:** Execution context is a concept in the language spec that—in layman's terms—roughly equates to the 'environment' a function executes in; that is, variable scope (and the scope chain, variables in closures from outer scopes), function arguments, and the value of the this object.

* After a Lambda function is executed, AWS Lambda maintains the Execution Context for some time in anticipation of another Lambda function invocation. 

### AWS Lambda supports two invocation types:

* **RequestResponse**, or synchronous execution: AWS Lambda returns the result of the function call to the client invoking the Lambda function. If the handler code of your Lambda function does not specify a return value, AWS Lambda will automatically return null for that value.

* **Event**, or asynchronous execution: AWS Lambda will discard any results of the function call. If you discover that your Lambda function does not process the event using asynchronous invocation, you can investigate the failure using Dead Letter Queues.

* In effect, the service freezes the Execution Context after a Lambda function completes, and thaws the context for reuse

* This Execution Context reuse approach has the following implications:
    - Any declarations in your Lambda function code (outside the handler code, see Programming Model) remains initialized, providing additional optimization when the function is invoked again. For example, if your Lambda function establishes a database connection.
    - Each Execution Context provides 500MB of additional disk space in the /tmp directory. The directory content remains when the Execution Context is frozen, providing transient cache that can be used for multiple invocations.
    - Background processes or callbacks initiated by your Lambda function that did not complete when the function ended resume if AWS Lambda chooses to reuse the Execution Context. **You should make sure any background processes or callbacks (in case of Node.js) in your code are complete before the code exits.**

**Note:** Add logic to your Lambda function code to check for the existence of an Execution Context.

```js
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

let html;


const loadHtml = () => {
  if (!html) {
    html = fs.readFile('static/index.html', 'utf-8')
  }

  return html;
}

module.exports.handler = async(function* (event, context, callback) {
  let template = await loadHtml()

  const response = {
    statusCode: 200,
    body: html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  }
    
    return response
  
}
``` 
* You invoke your Lambda function using the Invoke operation, and you can specify the invocation type as synchronous or asynchronous.

* For example, Amazon S3 always invokes a Lambda function asynchronously and Amazon Cognito always invokes a Lambda function synchronously. For poll-based AWS services (Amazon Kinesis, Amazon DynamoDB, Amazon Simple Queue Service), AWS Lambda polls the stream or message queue and invokes your Lambda function synchronously.

https://docs.aws.amazon.com/lambda/latest/dg/running-lambda-code.html
https://stackoverflow.com/questions/38987129/lambda-nodejs-4-3-not-finishing-executing-success-callback
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
http://www.reactjunkie.com/promises-promises/