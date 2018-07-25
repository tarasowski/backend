# Models

In our sample application we want to store: age, height, income. This data we want to store in our database. We can create a data model which defines the data we want to work in our application should just have these 3 properties. In the model section we can create that model. Here is how the model looks like:

**Model**
````
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "CompareData",
  "type": "object",
  "properties": {
    "age": {"type": "integer"},
    "height": {"type": "integer"},
    "income": {"type": "integer"}
  },
  "required": ["age", "height", "income"]
}
````

As soons as we have created a new model. We need to add this model to the method request in order to validate the incoming request. In order to pass the request to Lambda, we need to have the right request body

**An example for valid request body**
```
{
    "age": 34,
    "height": 72,
    "income": 20000
}
```

By using a model we can make sure that our API is receiving the right data we need to process. 

Models are defined using JSON schema. This might look complex at first but it really isn't. It's actually pretty descriptive and ensures that we use clearly defined models.

You can learn more about JSON Schema on the following page: [here](http://json-schema.org/)

The best place to start learning is this page, though: [here](https://spacetelescope.github.io/understanding-json-schema/)

Body mapping and using models is optional. We don't have to do validation of body/headers, we can implement the same logic in Lambda if we pass data from the request body to Lambda, we can also do the validation in Lambda if the request body holds a specific property and valid integer. By using the validation of the API Gateway we can do it much more easier. 

Also the models can be used to map data or in general in the mapping process. 

Based on the model we have created we can use the integration request body mapping templates, by simply choosing from a drop down menu the right model. Here is an example:

```js
#set($inputRoot = $input.path('$'))
{
  "age" : $inputRoot.age,
  "height" : $inputRoot.heigth,
  "income" : $inputRoot.income
}
```
The `$inputRoot` is the whole request object here, so we can extract the needed data from it.

Note: The same needs to be done in the integrated response section, the body mapping template needs to be changed there too.

**Sample request**

```js
{
    "age": 34,
    "height": 72,
    "income": 20000
}
```
**Sample body mapping template**

```js
#set($inputRoot = $input.path('$'))
{
  "age" : $inputRoot.age
}
```

**Sample response**
```js
{
  "age": 34
}
```
By applying body mapping templates we can send data back to a client in a different format.


