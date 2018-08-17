# Enchiridion Of Testing 

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
  const expected = 'something to test';
  const actual = 'sonething to test';

  assert.equal(actual, expected,
    'Given two mismatched values, .equal() should produce a nice bug report');

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

## References & Tutorials
* [Frontendmasters with Substack / James Halliday Workshop](https://github.com/tarasowski/serverless/blob/master/testing/001_testing-frontendmasters-james-halliday.md)
* [Clean Code: A Handbook of Agile Software Craftsmanship (Robert C. Martin Series)](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM)
* [Peter Krumins'- Writing javascript tests with tape](http://www.catonmat.net/blog/writing-javascript-tests-with-tape/)
* [Why I use Tape Instead of Mocha & So Should You Measuring Software Quality](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4)
* [Testing JavaScript Modules with Tape](https://ponyfoo.com/articles/testing-javascript-modules-with-tape)
* [setup and teardown in tape](https://gist.github.com/substack/9561717)
* [How should we be using `t.plan` and `t.end` in our tests?](https://github.com/dwyl/learn-tape/issues/12)
* [Collection of Tape Tests from TheScienceMuseum/collectionsonline](https://github.com/TheScienceMuseum/collectionsonline/tree/master/test)
