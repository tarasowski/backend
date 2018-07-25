# Testing and Modular Front-End

[Source](https://frontendmasters.com/courses/testing-modular-front-end/)

* Node has already built-in an assertion library `require('assert')`:
    + assert.ok()
    + assert.equal()
    + assert.deepEqual()
    + assert.notOk()
    + assert.notEqual()
    + assert.notDeepEqual()
    + assert.ifError(): you can use it to pass the error object `assert.ifError(error)`

* The main idea with assertions, these are things that you want to test. For example if you want to test if two things are equal, you can use `assert.equal(actual, expected)`

* `assert.ok(true)` or `assert.ok(093453)`is true or truthy you'll pass the assertion and won't get an error.

* Assert library is very simply it all does throws exeptions if the arguments match or don't match.

> An exception (short for "exceptional event") is an error or unexpected event that happens while a program is running. When an exception occurs, it interrupts the flow of the program. If the program can handle and process the exception, it may continue running. If an exception is not handled, the program may be forced to quit. [Source](https://techterms.com/definition/exception)

* Problems with assert:
    + exceptions stop executing
    + false positive when test blocks don't run

## Text Anything protocol (TAP)

* old text protocol from the perl test suite (late 80s)
    + test cases begin with ok/not ok (lines with successful assertions will beging with ok and they have a sequance number after it that increments. Line that have failures will begin with not ok)
    + must plan out a number of assertions. Very important thing that specifies a number of tests that suppose to be run.
        + Why? To check if everything was called properly like do I call all the callbacks or do I call them twice etc. 

* `npm ERROR`comes from the fact that the exti library has been failed, which means exited with non 0 exit code. You can check the exit code with the following command. `echo $?`

* If you want to write tests that can be only used in node.js you can use `npm i tap`

* If you want to write tests that can be used in node and browser user `npm i tape`

* If you have callbacks or branching, better use `assert.plan(n)` in order to make sure that all tests run properly.

* You can easily support asynchronous assertions with using `assert.plan(n)`.

* If you don't use `assert.end()` or `assert.plan()` the test is going to fail. Below is an example when we are using `assert.end()`

Example with `assert.end()`
```js
test('this is a test', (assert) => { 
    t.equal(1, 1)
    t.equal(2, 2)
    thisNeverFires(() => {
        t.end()
    })     
})

const thisNeverFires = (cb) => {
    console.log('forgot a callback')
    // never call cb
}
``` 
Example with `assert.plan()`

```js
test('this is the name of the test', (assert) => {
    assert.plan(3)
    assert.equal(1, 1)
    assert.equal(2, 2)
    setTimeout(() => {
        assert.ok(true)
    }, 100)
})
```

* You can also provide a final description as a string `assert.ok(true, 'true is ok')

* You can use terminal command `echo $?` to check out the exit code

* You can specify as many tests as you like and even in another files and will execute serially. Because if you have to much parallelism in your tests, you are dealing with thins auch as I/O, it would be difficult to reason your way through. The tradeoff that tape and tap make in this case they execute things serially. 

```js
test('the first test', (assert) => {
    assert.plan(1)
    assert.equal(1+1, 2)

})

test('the second test', (assert) => {
    assert.plan(3)
    assert.equal(1, 1)
    assert.equal(2, 2)
    setTimeout(() => {
        assert.ok(true, 'true is ok, the final description')
    }, 2000)
})

test('the third test', (assert) => {
    assert.plan(1)
    assert.equal(1+5, 6)
})
```

**Note:** In the example above the tests will run sequantially means that it's going to wait the setTimeout() and only after that it's going to process the next `the third test`

* To change from tape to top simply add:

```js
//const test = require('tape')
const test = require('tap').test
```

## Making a Test Suite

* `t.plan(n)` is kind of implicit flow control, between everytime you run tests. We use it because JS has the run to completition semantic and we need to tell JS how many tests should be run. 

* What is test suite? Instead of puttin all the tests into one file, we can create different files and just add tests in different files. To run the whole test suite you can use following command `tape *.js` it's going to run all those files that matched the wildcard. 

**Note:** The cool thing about tape is even if an individual test is going to fail it runs through all other tests and just exits with 1. In comparison to `require('assert')` if you get an execption (an event that interupts the flow of your program) it stops running all other assertions.

* How to organise a real project?
    * create a test directory `mkdir test``
    * put all of your test files in there
    * Run `node ../../node_modules/.bin/tape ./test/*.test.js` it will automatically run all the files inside the `test` folder
    * You simply require all your modules inside the test files.

## Setup & Teardown Phase

* If you need something that is required to do some other pieces like e.g. http sever. Since both tape and tap API execute command serially the first thing you can do put your setup and the last thing your teardown

```js
let server
test('setup', (assert) => {
 server = http.createServer()
 server.on('listening', () => {
     assert.end()
 })
})

//...

test('teardown', (assert) => {
    server.close((() => {
        assert.end()
    })
})
```
**Note:** There is also an `assert.onFinish()` event that you can use.

* Any kind of state that you will have in your test, you can declare it in the module scope. Different test files / tests can have different setup and teardowns, since you can specify these both phases per file/test.


```js
const test = require('tape')
const http = require('http')
const concat = require('concat-stream')
const elevenizer = require('../')

let server

test('setup', (assert) => {
   server = http.createServer((req, res) => {
       const n = req.url.slice(1)
       elevenizer(n, (err, result) => {
           if (err) {
               res.statusCode = 400
               res.end(err)
           } else res.end(String(result))
       })
   })
   server.listen(0, () => {
       assert.end()
   })
})

test('single digits', (assert) => {
    assert.plan(6) // two tests per assertion
    
    const testDigit = (n, expected) => {
        const req = http.request({
        host: 'localhost',
        port: server.address().port,
        path: '/' + n
    }, (res) => {
        assert.equal(res.statusCode, 200)
        res.pipe(concat((body) => {
            assert.equal(Number(body.toString()), expected)
        }))
    })
    req.end()
}
    
    testDigit(1, 111)
    testDigit(2, 222)
    testDigit(3, 333)
})

test('teardown', (assert) => {
    server.close(() => {
        assert.end()
    })
})
``` 

Note: You don't have to have any assertions in your test, you can just call `assert.end()` and it will end the test.

* If you want to compile a program to run in a browser, you can use a tool `npm i browserfiy` and will will automatically compile all your code to run in the browser e.g. changes require() to browser implementation etc. `browserify yourfile.js > bundle.js`and include the bundle.js into your `index.html` with a `<script></script>` tag in it. 

## Testing in the browser

If you're using tape:

```
$ npm i browserify browser-run
$ browserify test/*.js | browser-run -b chrome
```

**Note:** `browser-run` copies console.log() to stdout

* Whenever you can write your code in modules and break out the pieces.

* Writing testable code:
    + make code easy to run in varied ways
    + use instance variables (Its scope is confined to whatever object self refers to), not global state

* When the author writes a code he starts with a sample directory. Inside this directory there is an example file. You can take this example file and copy it into your test directory and make a test out of it. 

**Important:** Move everything into small reusable pieces in your program. It's much easiert to test your code. 

## I/O shell

* It's good for writing reusable code and writing code that's easy to test. 

* You try to deferr (aufschieben) all the places where you try to use  I/O, these are things what you are doing has an effect on the environment, so that might include reading from a file or writing to a file. If you can push those things up to the outermost layer that is configurable it will be a lot easiert to run your code in different environments like a web browser.

```js
const module1 = require('module1')

module1({fs: require('fake-fs')})
```

**Note:** Something similar to proxyquire, where you overrride the I/O dependencies.

## Code coverage

* How much of your code gets run when you test

* Author suggest to use coverify module 

```
npm i -g coverify browserify browser-run
```

**In node**
```
browserify -t coverify test/*.js --node | node | coverify
```
**In the browser**
```
browserify -t coverify test/*.js --node | browser-run -b chrome | coverify
``` 

* Instead of the above described modules, use `nyc` for code coverage

```
npm i -g nyc
nyc npm test // here you pass the nyc infront of command whatever you run
nyc report
```

```
nyc node ../../node_modules/.bin/tape ./test/*.test.js
``` 

**Note:** The example above will printout a test with a coverage report

## Continuous Integration

* Use npm script heavily for CI e.g.

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
``` 

* Working with environment variables in node:
    
```
$ ENV=production node index.js
```

```js
//index.js

const mode = process.env.ENV
console.log(mode)
// production
``` 

* In in package.json you can use them e.g. in scripts 

```json
"scripts": {
    "test": "ENV=production tape ./*.test.js"
}
```

* Don't forget to install `npm install <package-name> --save-dev` to add it only to the dev dependencies

`echo '{}' > package.json``
`npm install --save-dev ...`