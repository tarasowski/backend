# Testing Serverless Applications

General approach to testing and different layers of tests [TestPyramid by Martin Fowler](https://martinfowler.com/bliki/TestPyramid.html)

In order to start with testing we first need to answer following Questions.

1. Why do we write code? So we can deliver working software that delivers business value. 
2. Why do we test? So we can deliver working software that delivers business value.

## Our Goal

To continiously deliver working software even as the software evolves. 

![Test Pyramide](https://martinfowler.com/bliki/images/testPyramid/test-pyramid.png)

* Unit tests: do our objects do the right thing? Are easy to work with? Tests are made on the module level. And it's also useful to use this tests as a gudie to design your API to make sure they are both easy to use and how to use correctly. In Lambda you can use the same frameworks that you are used to!!!
* Integration tests: does our code works against code we can't change? This is where you would test the integration points of your system and how to interact with the inserted services that you depends on. Integration tests exercise system's integration with its external dependencies. So when you running this intigrations tests, the function should be configured to real downstream systems with the real dynamodb tables, not mocks and not even simulating environments like dynamodb local. 
* Acceptance tests: Where your function has been deployed to an AWS environment and you testing your system end to end to make sure that everything is working as you expect. For the acceptance tests you need to exercise your system from the outside. Acceptance tests exercise system End-to-End from the outside through it's interfaces. It means exercising the system through HTTP request through API Gateway. 

![Test Pyramide](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-serverless-testing.png)


**Note:** The main focus in serverless should lie on Acceptance tests and not unit tests

## Writing Integration Tests

Our goal: is to continiously deliver working software even as the software evolves. Integration tests exercise our code against intended downstream systems so we can test multiple components in 1 go. The important thing to remember here is that the purpose of this test is to test the integration point with other systems. So when we run these integration tests the functions should be configured to talk to the real thing. If we test the search-restaurants function it should scan the real dynamodb table.

![Test Pyramide](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/production-ready-serverless-course/images/aws-integration-tests.png)

