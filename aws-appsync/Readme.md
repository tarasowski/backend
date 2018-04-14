# AppSync Resources and Tutorials

* Here is an example how to build a simple GraphQL API (AppSync + DynamoDb, Elastic + Lambda) [Running a scalable & reliable GraphQL endpoint with Serverless Framework](https://hackernoon.com/running-a-scalable-reliable-graphql-endpoint-with-serverless-24c3bb5acb43)

* If you want to understand how the request/resolve mapping templates in AppSync work. You'll get a general overview about Apache VTL. There are some examples [Resolver Mapping Template Programming Guide](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-programming-guide.html)

* You can find here more information about how to access the information from the caller Node. In general `$context` variable holds all contextual information for your resolver invocation. [Resolver Mapping Template Context Reference](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-context-reference.html)

* You can find here information about how to access your GraphQL API. Currently there are 3 methods supported: API Key, IAM, Cognito User Pools [App Sync Security](https://docs.aws.amazon.com/appsync/latest/devguide/security.html)