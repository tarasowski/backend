# What is S3 (Simple Static Storage)

It's a file storage service and you can store all different fyles, it can be web related files like index.html, css, app.js etc. but it can also be any other files like photos, docs, videos. In S3 you organise these files in buckets, kind like a folder, each bucket is separated, you can have a structure inside the buckets etc.

**Note:** In the example we have only couple of static files and we don't neet do run server-side code. But there are other solutions by using Lambda.

In order to make it work as a webserer we need to grant access rights to the buckets. For the app bucket we need to give a standard access type and anonymous access control.

![S3](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-s3-overview.png)

**Note:** reverse company domain name for a bucket name: com.academind.compare-yourself in my case it would be io.hackers.compare-yourself!

**Note:** Use cloudfront (content delivery network) to server static files across all edge locations.

## What is Rout53?

AWs Domain name service you can buy domains or manage your domains. 

![Route53](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-route53.png)