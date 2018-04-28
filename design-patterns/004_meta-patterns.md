# Meta-patters

1. Service pushes async event to Lambda (S3, SNS)
2. Lambda grabs event from service (DynamoDB, Kinesis)
3. Synchronous exchange (Alexa, Lex)
4. Batch transform (Kinesis Firehouse)
5. Micro-service (API + Lambda + your choice of DB
6. Custommization via functions (AWS Config, SES rules)
7. Data-driven fanout (s3-Lambda, Lambda-lambda)
8. Choreography (Step Functions + Lambda)
9. Lambda functions in devices (Greengrass, Snowball Edge)

[Twitter Link](https://twitter.com/davetownsend/status/981666456973684736)
![Source](https://pbs.twimg.com/media/DZ-Ub4OVQAAStZZ.jpg:large)