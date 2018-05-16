# Deployment Workflow of Serverless 

1. Create Data flow diagram (AWS Software Architecture)
2. Create folder structure, put all functions, write them locally (scaffolding)
	+ Test functions locally with (sam invoke local)
	+ Use localstack or any other AWS mock tools
	+ Apply Hexagon Architecture
	+ Write tests

**Note:** You cannot work the whole system work right now locally

3. Commit code to your remote Github repository
4. Setup CodePipeline + CodeBuild + Cloudformation (CodeDeploy)
	+ Run unit tests
	+ Deploy the application
	+ Run integration tests
	+ Run acceptance tests [Source](https://github.com/tarasowski/serverless/blob/master/testing/001_testing-introduction.md)

5. CI / CD push to master branch
	+ Build daily working version

6. CI / CD push to release branch
	+ Build daily beta version if good deploy to production once a week
