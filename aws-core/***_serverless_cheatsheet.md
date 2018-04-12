# Cheatsheet for Serverless

The cheatsheet is for [Serverless Framework](https://serverless.com/)

* Create a template/sceleton for new projects by using following command.

``` 
sls create --template aws-nodejs --path servicename
``` 

* Don't forget to install NodeJS dependencies and to initialize the projects.

``` 
npm init -y
npm install <your_dependency>
``` 

* Specify the stagename for deployment. You need also make additional changes in the yaml template.

```yaml
provider:
    name: aws
    runtime: nodejs6.10
    stage: ${opt:stage, 'dev'} # first argument from CLI, second default
``` 

``` 
sls deploy --stage <stagename>
``` 

* If you only want to deploy a specific function.

``` 
sls deploy --function <function_name>
``` 

* If you want to see Cloudwatch Logs directly in your terminal, use following command.

```
sls logs -f functionName
``` 

* You can invoke the function from the CLI window

```
sls invoke --function <function_name> --log
```

* You can invoke the function also locally in order to do some testing

``` 
sls invoke local --function <function_name> --log
``` 

* If you want to clean your project and to remove CloudFormation stack. Go into the directory.

``` 
sls remove
``` 
