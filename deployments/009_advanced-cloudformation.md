# Advanced CloudFormation Course

## Introduction

* You can use CloudFormation to deploy pre-sales environment (automating provisioning) in minutes for your product e.g. demo environments for pre-sales or environment for testing etc. 

* You can also use CloudFormaiton to create services such as wordpress hosting, where a customer can self-deploy a new version of wordpress just by clicking a button

* If you push your code to a central repo you can run some simple automated tests such as linting, base syntax checking and other automated processes

* CloudFormation templates fo the production system should be stored in the central repo (infrastructure as Code) and as part of every major code change the cloudformation template is used to automatically spinup an entire test environment based on the latest code comitted to repository. **Automated testing runs within this temporary environment, after which the whole infrastructure set is deleted and cleaned up...**

* Every commit into the repository is tested, integrated with another changes and tested again. And finally it's deployed in fully working environment for user acceptance testing without running base level infrastructure. 

* A stack is a concept in Cloudformation that represents AWS resources and the lifecycle of these resources. A stack always have at least one resource. A Stack has three main operations:
    + Create: is run only once per stack, we give CF a template and we populate the parameters of this template. CF processes the template and creates a stack.
    + Update: Is the only operation that can be run many times during the lifecycle of the stack. It's also different the inputs that accespts:
        1. It accepts the existing or new version of the template
        2. It accepts the existing or new parameters
        3. It takes the existing stack and associated resources
    + Delete: We provide cloudformation with the stack, instructing the system to delete the stack. The stack contains the template, CF accesses that information and deletes all the resources. Only run once and has the policy
        + retain: retain the resources
        + delete: will be deleted
        + snapshop: arranges the snapshot

**Note:** The resources can be updated without changing the physical id and without any interrruptions or a resource can be updated with some interrruption (in form of restart or connectivity). The resource change may require replacement, old will be removed and a new one will be created with a new physical id (create a new one and remove the old one)

* Template is a JSON/YAML document:
    + Parameters (optional): a template can get some input and be referenced from other areas from the template. If you have default make sure that you will only use this template once e.g. with s3 bucket (default name).
    + Outputs (optional): They provide the ability to reference resource parameters, additionaly you can use functions to join stuff etc.
    + Mappings (optional): Lookup table, you can get the values e.g. for multiple regions
    + Conditions (optional): allows to define if or how the resources are created based on this conditions. Are defined once and can be used multiple times across the template
    + Metadata (optional): data that ca provide some useful information for the UI
    + Resources (required): Definition of resources that CF can create.

## YAML 101

* YAML is the superset of JSON and is designed to be human readable
* YAML is designed for storing data and the structure
* Identation converys structure - rather than {} [] * 
* YAML allows in-line comments - Begin with # -> EOL
* Syntax maps to modern programming languages
* Lists (Arrays)
* Associate Array (HASH)
    + ...and scalars (simple data types)
* Lines and Whitespaces are delimeters - they have significance
* Avoid tabs - assume they don't work (use spaces for identation)

* No double quotes needed in YAML, but you can use "" and it's still valid, it becomes mandatory if you want to enter special characters.

```yaml
name: value
name: 20
anothername: false
name: [value1, value2]  # inline array
name:                   #yaml specific array
 - value1
 - value2
name:                   # associative array
 - obj1key1: objvalue
 - obj2key1: objvalue
name:
 - obj1key1: objvalue
   obj1key2: objvalue
 - obj2key1: objevalue
   obj2key2: objvalue
```

Here is the JSON example for the last yaml example

```json
{
    "name": [
        {
            "obj1key1": "objvalue",
            "obj1key2": "objvalue"
        },
        {
            "obj2key1": "objvalue",
            "obj2key2": "objvalue"
        }
    ]
}
``` 

Here is another example where people get often confused about

```yaml
fruitlist: [apple, organge, pear] # inline array

fruitlist:
 - apple
 - organge
 - pear

 person: {name: Adrian, age: 37} # but we can also create an object like this here
 
 person:    # this is the best way
  name: Adrian
  age: 37

name:       # here is an example for lists
 - obj1key1: objvalue
   obj1key2: objvalue
 - obj2key1: objevalue
   obj2key2: objvalue
```

**Note:** Hyphens represent a list and identation on another line represent an subobject. If we want to create a list with many subobject, we need to combine both. 

* **Whenever you see hyphens you know that they represent individual elements of a list.** 

* **Whenever you you see things on the same level of identation you know they belong to the same object**

## Case Study: Wordpress

* Wordpress is built on a LAMP stack (Apache, PHP, Linux, MySQL)
    + MySQL + Linux is the infrastructure level
* On an architectural level:
    + We start with a users
    + In order to access the website for the user, some things needs to be there
        1. VPC needs to have an Internet Gateway 
        2. Public IP address
        3. At least we need 1 subnet
        4. This subnet will have Internet Gateway
    + We need MySQL Database (we'll use managed MySQL by AWS)
        1. RDS Instance


