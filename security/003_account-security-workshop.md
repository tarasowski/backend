# AWS Account Security with CloudTrail, CloudWatch, and Amazon S3
## AWS Pop-Up Loft Berlin | October 10 – 19 | Berlin

* The Swiss cheese model of accident causation illustrates that, although many layers of defense lie between hazards and accidents, there are flaws in each layer that, if aligned, can allow the accident to occur.

[Source](https://en.wikipedia.org/wiki/Swiss_cheese_model)

* There will be no 100% of security, but we need to able to dectect, reat and recover from security leak. 

* Hazard leads to UOS (undesired operational outcome) which leads to an outcome (a leak)

* CloudTrail will store logs in s3, in order to audit logs we need IAM roles. You need IAM to go into logs and to aanlyze them.

* We also have Log File Validation, if someon breaks into you account, does something harmful and goes into logs and change the.

* We will create Cloudwatch events that monitor the logs and whenever they will be changed or delted so we know that something has happened.

* You can connect lambda to cloudwatch and if someone wants to modify logs, the lambda function deletes the user, role or policy of the property thtat tries to modify the logs.

* If you use multi-account strategy, you need to aggregate all the logs in another account which has the rights to aggregate all the logs. We can call is a security account! A few people in the company have the sdecurity confiuration, and this account can onitor all other accounts. If someone breaks into an account they cannot turn off the logs from the security account.

* We need to give a s3 bucket the right to write, other users the right to read, so no one can delete the logs

* If you have basic encryption, the encryption is transparent. ES256 the data is encrypted on the device it's stored. If you use KMS, you need to decrypt/encrypt right to the key. You need the access rights on the bucket and the rights on the key (KMS).

* Every API Call to a specific resource is going to be loged into the CloudTrail. The default log happens into the CloudTrail. In the console you have the recent events, or you have the event history and it's always enabled. Not including s3 events, not including lambda function calls. All the events, calls are stored except s3 and lambda, you need to activate them manually.

* CloudTrail you only pay for reading the logs, you pay for storage. If you have to much data you can think about lifecycle management, after 31 move to Glacier. 

* We have versioning on s3 because the file shouldn't be deleted or modified, otherwise if this is happening someone has hacked your account. So that's why we have versioning active. 

* If you do log file analytics search for `Denied` to see if some calls where denied, to see if someone is trying to access the account.

* If you start writing the application you start with blank permissions, no one is able to change anything. You start with `deny` and then just add more permissions to the resources as needed. If I create a specific resource and I don't know which permissions are needed. You go into the logs and see which permissions are needed, you look who is trying to call and is getting denied by the service. You run a query through your log file and search for `denied` to see which actions needs to be allowed.

* If you write logs you need to access the workers councel (Betriebsrat) what data can be tracked and analysed. They will make a decision to what to do with the log files. You usually move the logs to a separate account and it can be only accessed with a worker council person.

* For security reasons is important to aggregate the logs into specific security account so no one can break into this account. You can then analyse the logs with Ahtena, Splunk, ElasticSearch, Kibana etc.

* Now we need to create different roles: Admin who can change the logs, and Auditor who can audit the logs.

* IAM: 
a) root can do everyhting
b) below root you have users, groups, roles = they all are entetites.
c) below users, groups, roles you have policies = permisisons are codified in policies

* You can apply many policies as you want to users, to groups and to roles. The difference between: a user is a person who is managed inside IAM can log into the console. A user is always a person, and a group is a collections of users.

* A role can be assumed by a user or a service. If the lambda function wants to read from s3 bucket it assumes a role. And the permission of the role defines what lambda can do or cannot do. A role needs to be assumed, a user needs to be logged in. 

* In a production account you will only have 1 user. And this user is the user of cloudformation that provisions your resources. There should be no reason to log into your production account. If you need to log in you will have certain roles that can be assumed. You need always create different account that can assume the role to see specific things e.g. billing details. You just create bunch of accounts for different things like finance, security etc. 

* You need a specific user that can deploy the cloudformation the resources and this user will have only the access key and this will be used by the user (cloudformation). 

* There is a subset of entities which are called principals, these all threee are entities, but onyl roles and users are principles. A group cannot be a principal, a user can be a principal and a role can be a principal. 

