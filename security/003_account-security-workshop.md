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

* 




