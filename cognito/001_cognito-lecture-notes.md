# Notes

# Cognito User Pools vs. Federated Identity Pools

While working on the authenticationa and authorization service for Claudia CRM. I faced many issues and different solutions. Cognito is one of the most confusing services of Amazong that I've met so far. Let's dive in and explain how to use this service in clear and concise way.

There are many tutorials online and many videos, but they are not very concise. Often lot of different use cases are mixed within one tutorial. In this post I'm going to explain following cases:

1. Cogntio User Pool: Adding sign-up and sign-in functionality to your app (email + password) w/o (facebook, google, twitter)
    + Cogntio User Pool: You have an API (Api Gateway) and you want to make some resources private. So only registered users can make API calls to specific HTTP methods and resources behind them. If you don't want to use other 3rd party services for authentication (facebook, twitter, google etc.). If you only want to stick with Cognito User Pools (a user pool is simply just a record of registered users that are able to log-in and access your private resources). 

2. Federated Identity Pool: Adding sing-up and sign-in functionality to your app (email + password) and other services such as facebook, google, twitter
    + Federated Identity Pool: With federated identity user can sign-in and sign-up with social networks such as facebook, twitter, google and many other provider. Federated identity gives you the possiblity to get access to internal AWS resources from your app. That means you're having private resources and you want to access them e.g. with your facebook or twitter credentials. Federated identity grants access to internal resources through IAM roles (very important, you'll see it later)

## Case #1: Cogntio User Pool

The AWs Cognito User Pools give you the possibility easily to integrate sing-up and sing-in functionality in your mobile or web app. It's a fully managed service by AWS, you don't need to care about the security, protocols and other stuff. 

Amazon Cognito Pricing looks as follow:

Pricing Tier (MAUs)	Price per MAU
Next 50,000	$0.00550
Next 900,000	$0.00460
Next 9,000,000	$0.00325
Greater than 10,000,000	$0.00250


#### Step 1.: Setting up new user pool
1. You need to create a new user pool (here we'll use the interface)
2. You need to click "step through settings". 
3. Under Attributes please choose: "Email address or phone number"
4. Message customization choose Verification type: Link
5. On the step with App clients: Add an app client, if you use JavaScript/frontend remove **Generate client secret** 
6. Now you have your User Pool:
    + Note your Pool Id
    + Note your Client Id
7. Under App integration go to Domain name and add a domain name (needed for email verification link)

#### Step 2.: Setup Cognito SDK for JavaScript

We are going here with the simplest method (plain JS). If you want to go with React or any other frameworks, you can find examples [here](https://github.com/aws/aws-amplify/tree/master/packages/amazon-cognito-identity-js)

1. Download the JavaScript [library file](https://raw.githubusercontent.com/aws/aws-amplify/master/packages/amazon-cognito-identity-js/dist/amazon-cognito-identity.min.js) and place it in your project

2. Include all of the files in your HTML page before calling any Amazon Cognito Identity SDK APIs:

```html
<script src="/path/to/amazon-cognito-identity.min.js"></script>
    <!-- optional: only if you use other AWS services -->
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.222.1.min.js"></script>
``` 
3. Remember to import or qualify access to any of these types:

```js
// When using loose Javascript files:
    var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
``` 

#### Step 3: Init() function to initialize the webpage

**Note:** We want to set the values and put in the condition appropriate to the start of an operation here.

1. Initialising variables
```js
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool
      const COGNITO_POOL_ID = 'put your pool id here'
      const COGNITO_CLIENT_ID = 'put your client id here'
      let userPool
      let idToken
      let cognitoUser
``` 

2. Initialising the `userPool` and `cognitoUser`
```js
        function init() {
        const data = { 
          UserPoolId : COGNITO_USER_POOL_ID, 
          ClientId : CLIENT_ID
        };
        userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
        cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {          
          cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                return;
            }
            idToken = session.idToken.jwtToken;
            console.log('idToken: ' + idToken);
            console.log('session validity: ' + session.isValid());
          });
        }
        }
        init()

``` 

#### Step 4: Registration functionality for the user with your application

1. We are using here only email and password for user registration. 

```js
// Let's assume we have a form in our app and we can get ask for email and password
const email = document.getElementById('#email-from-the-form').value
const password = document.getElementById('#password-from-the-form').value

// now here comes the part with the user registration
const email = document.getElementById('#email-from-the-form').value

userPool.signUp(email, password, null, null, function(err, result){
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });

``` 

#### Step 5: Login functionality for the user with your app

1. Now we are adding the authentication details and asking to Cognito to authenticate a user

```js
      const email = document.getElementById('loginEmail').value
      const password = document.getElementById('loginPassword').value

      const authenticationData = {
        Email: email,
        Password: password,
      }
      
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
      
      const userData = {
        Email: email,
        Pool: userPool
      }

      cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            console.log('access token : ' + result.getAccessToken().getJwtToken());
            idToken = result.idToken.jwtToken;
            console.log('idToken : ' + idToken);
            alert('You are now logged in')
          },
          onFailure: function(err) {
            alert(err);
          }
        });
    }
``` 

#### Step 6: Singout functionality for the user with your app

1. Now we need to add also a signout functionality for the user

```js
 if (cognitoUser !== null) {
        cognitoUser.signOut()
        console.log('user signed out')
      }
``` 

#### Step 7: Adding Cognito Authorizer to API Gateway

1. In order to make your API resources private you can now add an Congnito User Pool as an authorizer to your resource

    1. Got to your API in the API Gateway
    2. Go to Authorizers
    3. Create New Authorizer
    4. Name, choose Cognito, choose the right Cognito User Pool
    5. Add as Token Source: Authorization

2. Add Cognito Pool as Authorization Method for your resource

    1. In your API in the API Gateway go to resources
    2. Choose the right resource you want to make private
    3. Click on the Resource method and click on Method Request
    4. On method request choose Authorization: your Cognito User pool

3. Deploy the new version of your API. 

This is actually everything you need to do in order to create sing-up and sing-in for your users in your app. Now if someone is signed-in he/she can access your resources.


#### Step 8: How to make calls to the API

1. In order to access your private resources you need to add `idToken` to the headers with your request to the resource. 

```js
fetch('put your http address here', {
        method: 'GET',
        headers: {
          "Authorization": idToken
        },
      })
      .then(response => response.json())
      .catch(err => console.error(err))
``` 

**Note:** If e.g. a Lambda function is sitting behind the API Gateway and requested resource, you'll get all information about the authenticated user as part of the `event` object.
    


---




[Managing Identity and Securing Your Mobile and Web Applications with Amazon Cognito](https://www.youtube.com/watch?v=ruo-1XT9xVU)

* Authentication: 
    + Sign in users
    + Enable federation with enterprise identities
    + Enable federation with social media identitites
* Authorization:
    + Protect data and operations
    + Provide fine-grained control
* User Management:
    + Manage user lifecycles
    + Store and manage user profile data
    + Monitor engagement



---

# Live Coding - Cognito React App

[Live Coding with AWS: API Authentication with Amazon Cognito](https://www.youtube.com/watch?v=TowcW1aTDqE&t=5913s)



* [Amazon Cognito Identity SDK for JavaScript](https://github.com/aws/aws-amplify/tree/master/packages/amazon-cognito-identity-js)
* [Summary and useful links](https://gist.github.com/jfaerman/abc31d2fefca6701e87a9e3a9e885c18)
* [Breakless App Example](https://github.com/jfaerman/breakless)
