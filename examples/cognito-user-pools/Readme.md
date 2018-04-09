# Cognito User Pools - Example

**Important:** This is just an example with plain simple html/js file. It's a quick and dirty prototype. It's not production ready. Code is not tested.

## Setup

1. Download the source code
2. Run `npm install`
3. Create a new Cognito Pool [Tutorial](https://serverless-stack.com/chapters/create-a-cognito-user-pool.html). Get and save somewhere following values, you'll need them later:
    + Pool Id
    + Pool ARN
    + Client ID
4. Add a `config` folder in the client > dist directory (this gets uploaded to s3 for hosting)
5. Add to the config folder `env.js` file with following values:

```js
// Source: https://www.simonewebdesign.it/how-to-get-environment-variables-in-the-browser/
env = {
    COGNITO_POOL_ID: 'add your user pool id here',
    COGNITO_CLIENT_ID: 'add your client id here',
    baseUrl: 'base Url of the lambda function that you\'ll get in the next step'
  }
``` 
6. Navigate to `serverless.yml` file and add on **Line 24** your ARN from step 3
7. Run `sls deploy`
8. You'll get the URL of your Lambda function. Grab this url and add it to the `env.js`
9. Run `sls client deploy` It will upload your static content from client > dist folder to your s3 bucket
10. Visit the url and register a new account. After registering a new account log in and see what you get!

