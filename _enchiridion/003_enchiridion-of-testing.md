# Enchiridion Of Testing 

> "Other than that, learning how to test well is really all about learning better software architecture." by Eric Elliot at JSMentorship


> "At the end of the day, ship the fucking thing! It’s great to rewrite your code and make it cleaner and by the third time it’ll actually be pretty. But that’s not the point—you’re not here to write code; you’re here to ship products." by Jamie Zawinski at Coders at Work.

> "If you are trying to work out if anyone will actually use your software, it may make much more sense to get something out now, to prove the idea or the business model before building robust software. In an environment where this is the case, testing may be overkill, as the impact of not knowing if your idea works is much higher than having a defect in pro‐ duction. In these situations, it can be quite sensible to avoid testing prior to production altogether." by Sam Newman at Building Microservices.

* TDD for Serverless (side-effects): Use testing libraray to write functions that hit the endpoint, posts messages to SNS or save data to database. Actually you are writing and automating the integrations tests. So instead test it manually you do it via testing tool by writing asserts that test the functionality. 

* Isolate side-effects from logic so there's more pure logic to test easily. (Eric Elliot)

* Don't try to unit-test side-effects, instead use functional or integration tests, and you won't need to mock. (Eric Elliot)

* Use better/more functional abstraction around side-effects to make them easier to isolate. (Generators e.g., redux-saga, or Tasks - like lazy promises) (Eirc Elliot)

**ISOLATE THE SIDE-EFFECTS!**
```js
const logic = () => (....) // logic is isolated from the rest -> unit testable
const dbCall = () => (....) // database call (side effect) is isolated from the rest -> integration / functional tests

// combine logic and dabase call -> integration / functional tests
const combine = () => {
  const output = logic()
  const response = dbCall(output)
  return (...)
  
// Another version of combine  
const combine = (logic, dbCall, data) => {
  return R.pipe(
          logic,
          dbCall
        )(data)
```

* Think before you act: 1) write the whole logic, 2) Than start with writing the stuff with side-effects (DON'T MIX LOGIC WITH SIDE-EFFECTS)

* Unit tests exist to test individual units of software functionality. A unit is a module, component, or function. They’re bits of the program that can work independently of the rest of the program.

* If you find that it’s hard to write unit tests for your program without mocking lots of other things, that’s a sign that your program is not modular enough. 

* Every module should have unit tests, and every application should be made up of modules.

* If you spend a lot of time on mocks and stubs, that’s a strong code-smell.

* You can probably dramatically simplify both your tests and your application by breaking your app into more modular chunks.

* When you do have a genuine need for mocks (reading from or writing to the network or filesystem), keep them simple. Little more than basic stubs are ideal.

* The more you break your problems down into simple, pure functions, the easier it will be to test your code without mocks.

* Testing is not what you should spend most of your time doing.

* Test assertions should be dead simple, & completely free of magic.

* `equal`, `deepEqual`, `pass` & `fail` are my primary go-to assertions.

> If `equal` and `deepEqual` were the only assertions available anywhere, the testing world would probably be better off for it. Why? `equal` & `deepEqual` provide quality information about expectations, and they lead to very concise test cases that are easy to read & maintain.

* Test cases should be written in much the same way:

1. Describe the feature that you’re testing in plain English.
2. Provide the expected outcome of the test. 
3. Compare that to the actual value.
4. When a unit tests fails, the error message is your bug report.

> Your test descriptions should be clear enough to use as documentation.

```js
import test from 'tape';

test('A passing test', (assert) => {

  assert.pass('This test will pass.');

  assert.end();
});

test('Assertions with tape.', (assert) => {
  const msg = 'Given two mismatched values, .equal() should produce a nice bug report'
  const expected = 'something to test';
  const actual = 'sonething to test';

  assert.equal(actual, expected, msg);

  assert.end();
});
```

* Testing tools should be modular: Some test frameworks (Mocha, Jest, etc…) provide more services than a simple test runner. They want to format your tests so they’re easy to read, or they’ll do your mocking for you automagically.

* Mocha, Jasmine, Jest and the rest? Just say no to clutter. Simplify your life. Experience testing zen.

* The goal is writing for close to 100% coverage.

* Test code is just as important as production code. It is not a second-class citizen. It requires thought, design, and care. It must be kept as clean as production code. The reason is simple. If you have tests, you do not fear making changes to the code! Without tests every change is a possible bug. No matter how flexible your architecture is, no matter how nicely partitioned your design, without tests you will be reluctant to make changes because of the fear that you will introduce undetected bugs.

* So having an automated suite of unit tests that cover the production code is the key to keeping your design and architecture as clean as possible.

* What makes a clean test? Three things. Readability, readability, and readability. Readability is perhaps even more important in unit tests than it is in production code.
  + What makes tests readable? The same thing that makes all code readable: clarity, simplicity, and density of expression. In a test you want to say a lot with as few expressions as possible.

* There is a school of thought that says that every test function in a JUnit test should have one and only one assert statement. The best thing we can say is that the number of asserts in a test ought to be minimized. Perhaps a better rule is that we want to test a single concept in each test function. We don’t want long test functions that go testing one miscellaneous thing after another.

* So probably the best rule is that you should minimize the number of asserts per concept and test just one concept per test function.

* Clean tests follow five other rules that form the above acronym:
  1. Fast Tests should be fast. They should run quickly. When tests run slow, you won’t want to run them frequently.
  2. Independent Tests should not depend on each other. One test should not set up the conditions for the next test.
  3. Repeatable Tests should be repeatable in any environment. You should be able to run the tests in the production environment, in the QA environment, and on your laptop while riding home on the train without a network.
  4. Self-Validating The tests should have a boolean output. Either they pass or fail. You should not have to read through a log file to tell whether the tests pass.
  5. Timely The tests need to be written in a timely fashion. Unit tests should be written just before the production code that makes them pass.

* Turning off failing tests and telling yourself you’ll get them to pass later is as bad as pretending your credit cards are free money.

* We like to think of unit testing as testing against contract(see Design by Contract). We want to write test cases that ensure that a given unit honors its contract. This will tell us two things: whether the code meet the contract, and whether the contract means what we think it means. We want to test that the module delivers the functionality it promises, over a wide range of test cases and boundary conditions.

* If a bug slips through the net of existing tests, you need to add a new test to trap it next time. Once a human tester finds a bug, it should be the lasttime a human tester finds that bug. The automated tests should be modified to check for that particular bug from then on, every time, with no exceptions, no matter how trivial, and no matter how much the developer complains and says, "Oh, that will never happen again."

* Maximizing code coverage brings diminishing returns — the closer you get to 100% coverage, the more you have to complicate your application code to get even closer, which can subvert the important goal of reducing bugs in your application.

* Additionally, different types of code need different levels (and different kinds) of mocks. Some code exists primarily to facilitate I/O, in which case, there is little to do other than test I/O, and reducing mocks might mean your unit test coverage would be close to 0.

* If there is no logic in your code (just pipes and pure compositions), 0% unit test coverage might be acceptable, assuming your integration or functional test coverage is close to 100%.

**Note:** functional tests are a subset of integration tests, because they test all of the units of an application. They test the application from the point of view of the user, including complete user interactionworkflows from smiluated UI manipulation.

* If we’re mocking something, there may be an opportunity to make our code more flexible by reducing the coupling between units. Once that’s done, you won’t need the mocks anymore. Coupling is the degree to which a unit of code (module, function, class, etc…) depends upon other units of code. Mocking is required when the units used to break the large problem down into smaller parts depend on each other. Put another way, mocking is required when our supposed atomic units of composition are not really atomic.

* In general, units are tests using only the public interface of the unit (public API aka module.exports). This is referred to as black box testing. Black box testing leads to less brittle tests, because the implementation details of a unit tend to change more over time than the public API of the unit. 

* Increasing coverage beyond ~90% seems to have little continued correlation with lower bug density. Code coverage starts to deliver diminishing returns as it gets closer to 100%.

* The need to mock in order to achieve unit isolation for the purpose of unit tests is caused by coupling between units. Tight coupling makes code more rigid and brittle: more likely to break when changes are required. From this we can deduce that if we're mocking something, there may be an opportunity to make our code more flexible by reducing the coupling between units. **Once it's done, you won't need the mocks anymore!** Coupling is the degree to which a unit of code (module, function, class etc..) depends uplon other units of code. IMPURE FUNCTIONS LEAD TO COUPLING!.

* If there’s no logic, there’s nothing meaningful to unit test. That means that the code you use to set up network requests and request handlers won’t need unit tests. Use integration tests for those, instead. Don’t unit test I/O. I/O is for integrations. Use integration tests, instead. It’s perfectly OK to mock and fake for integration tests.

> Mocking is required when our decomposition strategy has failed. Mocking is required when our supposed atomic units of composition are not really atomic. The essence of all software development is the process of breaking a large problem down into smaller, independet pieces (decomposition) and composing the solutions together to form an application that solves the large problem (composition).

**Note:** If you can use function composition `lodash/fp/compose` means you have done it right. When you use generic composition utilities, each element of the composition can be unit tested in isolation without mocking the others.

* Can the unit be tested without mocking dependencies? If it can't, it's tightly coupled to the mocked dependencies. The more dependencies your unit has, the more it is that there may be problematic coupling. 

* How to avoid coupling?
1) Use pure functions: as the amotic unit of composition, as apposed to classes, imperative procedures, or mutating functions.

```js
// Not pure
const signInUser = user => user.isSignedIn = true;
const foo = {
  name: 'Foo',
  isSignedIn: false
};
// Foo was mutated
console.log(
  signInUser(foo), // true
  foo              // { name: "Foo", isSignedIn: true }
);

vs.

// Pure
const signInUser = user => ({...user, isSignedIn: true });
const foo = {
  name: 'Foo',
  isSignedIn: false
};
// Foo was not mutated
console.log(
  signInUser(foo), // { name: "Foo", isSignedIn: true }
  foo              // { name: "Foo", isSignedIn: false }
);
``` 

2) Isolate side-effect: from the rest of your porgram logic. That means don't mix logic with I/O.
- Use pub/sub to decouple I/O from views and programming logic. Rathen than directly triggering side-effects in UI views or program logic, emit an event or action object describing an event or intent. Pub/sub is bakedinto the DOM. Any component in your app can listed to events disptached from DOM elements, such as mouse clicks. 

- Isolate logic from I/O. It's trivial to test each of these functions in isolation form each other without mocking. 
```js
const log = (...args) => console.log(...args)

const readUser = () => Promise.resolve(true)
const getFolderInfo = () => Promise.resolve(true)
const haveWriteAccess = () => Promise.resolve(true)
const uploadToFolder = () => Promise.resolve('Success!')

const user = '123'
const folder = '456'
const files = ['a', 'b', 'c']

async function uploadFiles({ user, folder, files }) {
    const dbUser = await readUser({ user })
    const folderInfo = await getFolderInfo({ folder })
    if (await haveWriteAccess({ dbUser, folderInfo })) {
        return uploadToFolder({ dbUser, folderInfo, files })
    } else {
        throw new Error('No write access to that folder')
    }
}

uploadFiles({ user, folder, files })
    .then(log)


const asyncPipe = (...fns) => x => (
    fns.reduce(async (y, f) => f(await y), x)
)

const uploadFilesPipe = asyncPipe(
    readUser,
    getFolderInfo,
    haveWriteAccess,
    uploadToFolder
)

uploadFilesPipe({ user, folder, files })
    .then(log)```

3) Remove dependent logic from imperative compositions so that they can become declararitve compositions, which don't need their own unit tests.

> The code you use to set up network request and request handlers won't need unit tests. Use integration tests for those, instead. Don't unit test I/O. I/O is for integrations. Use integration tests, instead.

## References & Tutorials
* [Frontendmasters with Substack / James Halliday Workshop](https://github.com/tarasowski/serverless/blob/master/testing/001_testing-frontendmasters-james-halliday.md)
* [Clean Code: A Handbook of Agile Software Craftsmanship (Robert C. Martin Series)](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM)
* [Peter Krumins'- Writing javascript tests with tape](http://www.catonmat.net/blog/writing-javascript-tests-with-tape/)
* [Why I use Tape Instead of Mocha & So Should You Measuring Software Quality](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4)
* [The Pragmatic Programmer: From Journeyman to Master](https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X)
* [Testing JavaScript Modules with Tape](https://ponyfoo.com/articles/testing-javascript-modules-with-tape)
* [setup and teardown in tape](https://gist.github.com/substack/9561717)
* [How should we be using `t.plan` and `t.end` in our tests?](https://github.com/dwyl/learn-tape/issues/12)
* [Collection of Tape Tests from TheScienceMuseum/collectionsonline](https://github.com/TheScienceMuseum/collectionsonline/tree/master/test)
* [Mocking Code Is Code Smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)
