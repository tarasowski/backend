# Enchiridion Of Testing 
* Use `tape` or `node-tap`

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

## References & Tutorials
* [Frontendmasters with Substack / James Halliday Workshop](https://github.com/tarasowski/serverless/blob/master/testing/testing-frontendmasters-james-halliday.md)
* [Peter Krumins'- Writing javascript tests with tape](http://www.catonmat.net/blog/writing-javascript-tests-with-tape/)
* [Why I use Tape Instead of Mocha & So Should You Measuring Software Quality](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4)
* [Testing JavaScript Modules with Tape](https://ponyfoo.com/articles/testing-javascript-modules-with-tape)
* [setup and teardown in tape](https://gist.github.com/substack/9561717)
* [How should we be using `t.plan` and `t.end` in our tests?](https://github.com/dwyl/learn-tape/issues/12)
* [Collection of Tape Tests from TheScienceMuseum/collectionsonline](https://github.com/TheScienceMuseum/collectionsonline/tree/master/test)
