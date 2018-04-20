# AppSync Resources and Tutorials

Disclaimer: There will be many typos since these are my notes from the courses and I'm too lazy to spend my time for correction.

* In this series we'll be creating, from scratch, a full-stack application, including a GraphQL server on Node.js, a React front-end (with Apollo) and MongoDB to store all of our data. [GraphQL Tutorial - Introduction to GraphQL - 30 Step-by-Step Tutorials](https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f)

* A very good introduction how to build GraphQL w/ NodeJS stack [Building Scalable APIs with GraphQL](https://github.com/tarasowski/serverless/blob/master/aws-appsync/005_building-scalable-apis.md)

* A deep understanding about how GraphQL is structured [GraphQL Mental Model](https://github.com/tarasowski/serverless/blob/master/aws-appsync/006_graphql_mental_model.md)

* If you want to understand how the request/resolve mapping templates in AppSync work. You'll get a general overview about Apache VTL. There are some examples [Resolver Mapping Template Programming Guide](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-programming-guide.html)

* You can find here more information about how to access the information from the caller Node. In general `$context` variable holds all contextual information for your resolver invocation. [Resolver Mapping Template Context Reference](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-context-reference.html)

* Here is an example how to build a simple GraphQL API (AppSync + DynamoDb, Elastic + Lambda) [Running a scalable & reliable GraphQL endpoint with Serverless Framework](https://hackernoon.com/running-a-scalable-reliable-graphql-endpoint-with-serverless-24c3bb5acb43)

* You can find here information about how to access your GraphQL API. Currently there are 3 methods supported: API Key, IAM, Cognito User Pools [App Sync Security](https://docs.aws.amazon.com/appsync/latest/devguide/security.html)

* Ultimately, you want to automate your deployments. This article is about how you can automate your AWS AppSync deployments. [Deploy an AWS AppSync GraphQL API with Amazon CloudFormation] (https://medium.com/@FizzyInTheHall/deploy-an-aws-appsync-graphql-api-with-amazon-cloudformation-9a783fdd8491)