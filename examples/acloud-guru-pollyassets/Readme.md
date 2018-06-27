# Polly Serverless Application

![Architecture](https://github.com/tarasowski/serverless/raw/master/certification/images/polly-architecture.png)

We have a client that accesses a static hosted website on S3. The client enters the notes on this website.

Once the notes are entered is going to POST to API Gateway. The notes are pushed to the Lamba function.

These notes are going to be stored in DynamoDb

The Lambda function is going to trigger an SNS event

The SNS event is going to trigger another Lambda function

That lambda function is going to take your notes and pass it Amazon Polly service. Which will return it back as mp3

That mp3 file is going to be saved to S3 bucket

And this Lambda function is going to update DynamoDb that the notes are converted into audio

You are going to visit the website and do a search for your notes. That search is going trigger an API Gateway

The API Gateway is going to trigger a Lambda function which is going to do a scan of DynamoDb and return your notes to you

Note: The workflow for setting up a new architecture. You first create your resources buckets, functions, tables (scaffolding). And after that you start to wire them up and write some code.

