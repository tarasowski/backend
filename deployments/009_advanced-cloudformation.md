# Advanced CloudFormation Course

* You can use CloudFormation to deploy pre-sales environment (automating provisioning) in minutes for your product e.g. demo environments for pre-sales or environment for testing etc. 

* You can also use CloudFormaiton to create services such as wordpress hosting, where a customer can self-deploy a new version of wordpress just by clicking a button

* If you push your code to a central repo you can run some simple automated tests such as linting, base syntax checking and other automated processes

* CloudFormation templates fo the production system should be stored in the central repo (infrastructure as Code) and as part of every major code change the cloudformation template is used to automatically spinup an entire test environment based on the latest code comitted to repository. **Automated testing runs within this temporary environment, after which the whole infrastructure set is deleted and cleaned up...**

* Every commit into the repository is tested, integrated with another changes and tested again. And finally it's deployed in fully working environment for user acceptance testing without running base level infrastructure. 

