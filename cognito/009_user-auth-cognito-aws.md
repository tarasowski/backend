# User authentication - AWS Cognito

In our API Gateway the Method Request acts as a kind of a gatekeeper. It can validate the body, can check for authorization and can require an API key. 

In the API Gateway you can choose the option for authorization it's called Authorizers. There you can define the authorization rules for your API. 

## Customer Authorizer

A custom authorizer uses Lambda behind the scenes. It does tell the API Gateway to call a specific Lambda function, to pass some data/information from the incoming request to the function and that function then has to run some code to validate to authenticate the user. In this function you can chain the jwt token, setup your own authentification workflow. 

The goal fot the Lambda function is to return the AIM policy back to us. The policy needs to decide are you a user that makes a request, are you allowed to invoke this API endpoint. The policy will be generated dynamically and it will expire after a certain time, but before doing so it will grant/deny the access.

```js
{
    "Effect": "Allow",
    "Action": "execute-ap"
}
```
Also it will return an ID of the user

```js
Return Principal ID (User Id)
```

**Note:** For custom authorization we can use jwt token as a service.

## Cognito Adding Authentication

AWS gives us a working service to sign users up, reset passwords, authenticate users, generate the tokens and the whole verificitaton process. It can be integrated with other providers Google, Facebook, Linkedin. For instance we have an application and Cognito defines how to authenticate users and issues authentication tokens that are stored on user devices.

**Note:** Cognito also can issue temporary AIM credentials so you can access depending on certain roles.

![Cognito](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-cognito.png)

### Cognito Options

* Manage your user pools: is the complete solution for people who have no authentication process at all and don't want to use 3rd party providers like Facebook and Google, they get user pools where users can signup/signin. 

* Manage federated identities: allow to connect 3rd party providers like Facebook, Google, to then create temporary AIM credentials to issue these users with the rights of performing certain actions depending on which credentials you have provided e.g. to provide to upload files on S3 bucket. 

**Note:** By default users are identified with username and password. But we can also have additional attributes that we can choose for user authentication. If we want to allow to use email insted of a user name we need to check the alias options. By doing so each email needs to be unique and can be checked by Cognito. 

Also it has already built-in functionality of Multi-Factor-authentication (MFA) that can be activated if needed. Another option is to enable phone number verification. 

**Note:** If your app is running in the browser you have to disable **Generate client secret**. Because there in JS you cannot protect this secret. The signup will work diferent and we can't set this up. 

## Full Authentication Flow (User Pools)

1. We have our user and user is using our application and through that application he is signing up to our user pool. 
2. In the user pool a new user is created and stored in the database, we don't have to manage that database, everything is done by Amazon Cognito. Then the confirmation promt goes directly to the user (email or sms). 
3. User receives a confirmation, user confirms the registration then the account is confirmed. Once it's confirmed it can be used for signing up. The whole confirmation thing can be skipped, but for making sure that emails actually reach someone it's a good thing to include it 
4. With the confirmed account we can authenticate so we sign in to the user pool and there we validate if the combination of email or password is valid and can be found in the database.
5. Once this happens Cognito issues a couple of tokens to our frontend application, no matter if it's JS, Android or iOS app. We get 3 tokens:
    + Identity Token: this token we are sending to our backend (API Gateway) to authenticate request and work with it.
    + Access Token: can be used to send to Cognito if we want to change some attributes
    + Refersh Token: the refresh token is required to get new identity and access tokens, because they are only living 1h. It's a security measure since the tokens can be stolen, so they don't live that long. The refresh tokens gets a new token by singin us in without requiring email and password again.

![Auth Flow](https://github.com/mittyo/javascript-pocketguide/blob/master/serverless/images/aws-auth-flow.png)

---

# Authentication & Authorization - ClaudiaJS

[Source](https://livebook.manning.com/#!/book/serverless-apps-with-node-and-claudiajs/chapter-6/v-5/5)

There are two things that needs to be done:
* Enable the users to authenticate themselves via email or any other social networks
* Create a user list for the API, and restrict each user to seeing only their own orders

**Authentication:** This process of validating a persons identity is called authentication. If the person identity is trusted, the person is authenticated. -- Checking if the user is who they claim to be is authentication. 

**Authorization:** This process of validating if the person is allowed to do something in the system is called authorization. -- Checking if the user is allowed to access is authorization. 

**Permission:** The right of spending e.g. the company’s money, or doing something restrictive, is called a permission. The right given to a user to do something is called permission.

**Identity:** Information representing who the user is, is called identity.

**User Pool:** A user pool represents a single user collection or a user directory.

![Authentication/Authorization](./images/aws-cognito-auth-author.jpg)

![Cognito](./images/aws-claudiajs-cognito.png)

![Cognito](https://d2908q01vomqb2.cloudfront.net/0a57cb53ba59c46fc4b692527a38a87c78d84028/2017/07/19/CognitoDiagram.png)
Source: [Building fine-grained authorization using Amazon Cognito User Pools groups](https://aws.amazon.com/blogs/mobile/building-fine-grained-authorization-using-amazon-cognito-user-pools-groups/)

**The details of this flow are as follows:**

1. Client authenticates against a user pool.
2. The user pool assigns 3 JWT tokens (Id, Access, and Refresh) to the client.
3. The Id JWT is passed to the identity pool and a role is chosen via the JWT claims.  The user then receives IAM temporary credentials with privileges that are based on the IAM role that was mapped to the group that user belongs to.
4. The user can then make calls to DynamoDB based on their privileges.  Those privileges are dictated by IAM policies that we provide later in this post.



## 1. Create an User Pool
To create a new user pool, you can use following command from the AWS CLI. Just provide the right name, all other settings can be used as here in this example

``` 
aws cognito-idp create-user-pool \
    --pool-name Pizzeria \
    --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false,RequireLowercase=false,RequireNumbers=false,RequireSymbols=false}" \
    --username-attributes email \
    --query UserPool.Id \
    --output text
``` 

**Note:** The output will be the id, keep the id you'll need it for later steps. You can do the same from the user interface [link](https://console.aws.amazon.com/cognito/home?region=us-east-1) be aware that there many other options from the user interface. You can add different validation rules..

## 2. Create a Client
Now you need at least one client for your user pool. Remember: you need to provide the pool id from the step above. Here is an simple web client without a client secret. If you want to connect e.g. a mobile app, you need to setup another client.

``` 
aws cognito-idp create-user-pool-client \
  --user-pool-id eu-central-1_userPoolId \
  --client-name PizzeriaClient \
  --no-generate-secret \
  --query UserPoolClient.ClientId \
  --output text
``` 

This command will return a client id. Keep this client id for the next step.

## 3. Create an Identity Pool

Here you need to provide the identitiy provider name and also check false for the ServerSideTokenCheck. Also don't forget to adjust the ClientId in the command below

```
aws cognito-identity create-identity-pool \
  --identity-pool-name Pizzeria \
  --allow-unauthenticated-identities \
  --supported-login-providers graph.facebook.com=266094173886660 \
  --cognito-identity-providers ProviderName=cognito-idp.eu-central-1.amazonaws.com/eu-central-1_qpPMn1Tip,ClientId=4q14u0qalmkangdkhieekqbjma,ServerSideTokenCheck=false \
  --query IdentityPoolId \
  --output text
``` 

## 4. Setup the Roles

After the creation of the identity pool you need to create two roles:

* Authenticated users
* Unauthenticated users

[More Information](https://aws.amazon.com/blogs/mobile/understanding-amazon-cognito-authentication-part-3-roles-and-policies/)

**Note:** You can do it from the user interface.

```
aws cognito-identity set-identity-pool-roles \
  --identity-pool-id eu-central-1:2a3b45c6-1234-123d-1234-1e23fg45hij6 \
  --roles authenticated=<ROLE1_ARN>,unauthenticated=<ROLE2_ARN>
``` 

**Note:** This command will return an empty response if it was successfully executed.

## 5. Control API Access with Cognito

The Cognito Identity Pool is not used by Lambda function. It's used by the front-end applications to get temporary access to Cognito user pools without having to hardcode the AWS profile access and secret keys. 

---
## Amazon Cognito Explained

You can find detailed explanation in the following video: [Deep Dive on User Sign-up and Sign-in with Amazon Cognito](https://www.youtube.com/watch?v=KWjgiNgDfwI). Here are some important explanations summarized:


![Federation](./images/aws-cognito-federation.png)
---

![Pools](./images/aws-user-identity-pools.png)
---

![Process](./images/aws-identity-pools.png)
---

![Auth](./images/aws-cognito-auth-process.png)
---

![Cognito Flow](./images/aws-cognito-flow.jpg)

## Custom Authorizer with Cognito User Pools & Lambda

![Steps](./images/aws-cognito-step-1.png)
---

![Steps](./images/aws-cognito-step-2.png)
---

![Steps](./images/aws-cognito-step-3.png)
---

![Steps](./images/aws-cognito-step-4.png)
---

![Steps](./images/aws-cognito-step-5.png)
---

![Steps](./images/aws-cognito-step-6.png)
---

![Steps](./images/aws-cognito-step-7.png)
---

![Steps](./images/aws-cognito-step-8.png)
---

[Source - Securing Serverless Workloads with Cognito and API Gateway Part II](https://www.slideshare.net/AmazonWebServices/securing-serverless-workloads-with-cognito-and-api-gateway-part-ii-aws-security-day)