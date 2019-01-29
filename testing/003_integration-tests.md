# Integration Tests

[Source](https://livevideo.manning.com/module/38_3_2/production-ready-serverless/testing/writing-integration-tests?)

* Integration tests exercise our code agains intended downstream systems so we can test multiple components in one go.

> Integration tests exercise system's **Integration** with its external dependencies.

![Integration](./images/integration-test.png)

* **Important**: The purpose of this test is to test the integration points with other systems, so when we are running these integration tests, the function should be configured to talk to **the real thing**. 

* When we are testing functions that should do something with DynamoDB tables, than during the integration tests they should scan **the real** DynamoDB table. **Not mock or stub or even DynamoDB local**
