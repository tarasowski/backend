## Body Mapping Templates

If we want only wit the data that the Lambda needs, we need to pass only the data it needs and body mapping templates are helping to do so.

**Lambda function**
```js
exports.handler = function(event, context, callback) {
    const age = event.personDate.age * 2;
    callback(null, age); // 68 is the API response
};

```

**Body request**
```
{
    "personData": {
        "name": "Dimitri",
        "age": 34
    }
}
```

If we want to work only with the data we need and don't want to retrieve the data `event.personData.age` we can use body mapping templates. In case of request the data we pass into the lambda and in case of response the data that we send back from Lambda. In order to do so we are under the method we are clicking on "When there are no templates defined". 

1. We need to add a template and we need to name it "application/json". It means that incoming request with "Content-Type" application/json will be handled by this template. If we do so the body will be not forwarded by default anymore, but this teample will be used.

2. In order to create the templates we need to use the templating language from AWS. You can learn more about how to create such template [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html). If you want to see an example, simply click on **Method Request passthrough** in the body mapping template section. 

```js
{
"body-json" : $input.json('$'),
}

```
We leave only this stuff in the template, since it will extract data from the request body. We can also extract only specific data to pass to the lambda function.

```js
{
"age" : $input.json('$.personData.age'), // we assign the value to the "age" property
}

```
By creating a body mapping template as above the event parameter will only return the specific property.

`$input`refers to the request data (e.g. params, body etc.)
`.json()` we extract some data or some JSON from the `$input`
`$` refers to a request body to everything in it, on that we can simply use dot notation or array notation

Body mapping templates help us to restructure the input data and mapping a complex data to an easier one. And by doing so we have a clear separation between the API Gateway where we receive our request and work with and Lambda when we expect to get data in certain structure and do something with it. [Link:](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#input-variable-reference) 

json()  is a method on $input  which will retrieve a JSON representation of the data you access. $  here stands for the request body as a whole, $.person.name  therefore accesses the name property on the person property which is part of the whole requests body object.

The $input.json(...)  code is wrapped into quotation marks (" ) because it should be transformed into a string in this example (since both name and id are strings). If you were to access a number, boolean or object here, you would NOT wrap the expression in quotation marks.

Also in the integration response we can use body template mapping too.

If we want to use body mapping template for the integrated response, we can do the following:

```js
{
    "your-age": $input.json('$')
}
```

`$input` is the callback info sent back by Lambda, `json('$')` then gives us the data passed with the callback.

**Request body**
```js
{
    "personData": {
        "name": "Dimitri",
        "age": 34
    }
}
```
**Response**
```js
{
  "your-age": 34
}

```

This is how we can transform the response. Lambda gives us a number but let's say our client/app which calls our application expects to get an object where it is stored in the `your-age` property. We don't need to adjust Lambda to our client but we can transform the data with body mapping templates. You can separate API Gateway and Lambda, you can control what goes into Lambda and what you do what comes out of Lambda.

**Note:** You need to setup the validation on the incoming requests under Method Request and choose the right model but also you need to activate the Request Validator  = Validate body

**Note:** If you want directly to send a value from the body mapping template as a string, you can do it directly in the definiton file.

```js
{ 
    "type": "$input.params('type')" // simply use double quotes around the expression
}
```
