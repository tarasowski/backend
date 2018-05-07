# RBAC System

[Source - A Role-Based Access Control (RBAC) system for PHP](http://www.tonymarston.net/php-mysql/role-based-access-control.html)

## What is Access Control?
In a multi-user application which is deployed over numerous devices which are linked together in a network it is more than likely that not all functionality will be available to all users. There are several components of this system:
* A list of all funcitons that are available within the system. These 'functions' are sometimes referred to as `transactions` or `tasks`
* A list of all persons who are allowed to access the application as a whole. These persons are sometimes referred to as `users`.
* A list of permissions which identifies which functions are accessible by which users.

**Note:** Each of these lists is normally maintained as a table within a database.

## What is role based?
* Level based: In this system each TASK is given a security level number in the range 1 to 99, with 1 being the lowest level and 99 the highest. Each USER is then given a security level number and is allowed to access only those TASKs which have a security level which is the same or lower.

* User based: In this system permissions are defined for individual users. This involves a many-to-many relationship between USERS and TASKS with PERMISSIONS being the link or intersection table. 

* Group based: In this design the users are split into groups and permissions are assigned to the group, not the individual user.

* Responsibility based: In this design it is possible for a user to belong to more than one group at the same time. This involves two many-to-many relationships.

---
# Implement Access Control in Node.js

[Source](https://blog.nodeswat.com/implement-access-control-in-node-js-8567e7b484d1)

## Different Types of AC (Access-Control)
* ACL (Access-Control-List):  usually represented as table of privileges
![ACL](https://cdn-images-1.medium.com/max/1600/1*cWIls-mP48UC5T5WPta9OQ.png)

* RBAC (Role-Based-Access-Control): is an access control method where users are given roles and the roles determine what privileges they have. Operational privileges are grouped into roles and each user is assigned a role. The role, instead of the individual, is the basis of access checks. It's often implemented in hierarchical model, where higher level roles inherit the privileges from lower levels. 
![Roles](https://cdn-images-1.medium.com/max/1600/1*yft8kia8boyuSCC0ABnxXw.gif)

* ACLg (Access-Control-List grouped): we substitute the individual for a group. This means ACLg (g stands for grouped) is equivalent of RBACm (m stands for minimal).
![Group](https://cdn-images-1.medium.com/max/1600/1*YeyeYUbgCEsSGF7Nqs96og.png)

* ABAC (Attribute-Based-Access-Control): In system where there are many attributes that separate access to internal resources (i.e. has the user passed some tests and been educated in the use of this part of the system etc.) using RBAC model would result in what is known as the role explosion. ABAC aims to solve this problem by providing a framework for defining access rights based on the various **properties** of a user.

![ABAC](https://cdn-images-1.medium.com/max/1600/1*Jo8yL1GWZE1CEEyekETEIA.gif)

### Implementation of RBAC (Role Based Access Control)
RBAC is usually implemented as a Hierarchy of roles (HRBAC). This allows roles to inherit provileges from other roles, which in turn makes it easier to add new operational privileges to the whole tree. In short RBAC is the de-facto standard access control method for most web applications.

The logic of RBAC model is simple - you define a number of roles and each role has privileges assigned to it. When checking for access you check if the role has access and that's it.

So our example from before can be summed in two tables:

![Roles](https://cdn-images-1.medium.com/max/1600/1*PcnPeCVGHjDcc7EWlS_5Ow.png)

```js
let roles = {
    manager: {
        can: ['read', 'write', 'publish']
    },
    writer: {
        can: ['read', 'write']
    },
    guest: {
        can: ['read']
    }
}

function can(role, operation) {
    return roles[role] && roles[role].can.indexOf(operation) !== -1;
}
``` 

More examples in the [Blogpost](https://blog.nodeswat.com/implement-access-control-in-node-js-8567e7b484d1)
---

# Role Based Access Control (RBAC) Database Schema Design and ER Diagram

This is here an youtube video with the explation and SQL queries you can use 
* [Video Click here](https://www.youtube.com/watch?v=LZz_eY1Gag8)
* [SQL code on Github](https://github.com/talk2amareswaran/simple-rbac-database/blob/master/simple-rbac-database.sql)

![RBAC](./images/er-diagram-example-rbac.png)

* Further examples: 
    + [DynamoDB RBAC](https://github.com/hinxcode/dynamo-rbac)
    + [Simple RBAC Checker](https://github.com/swarajgiri/rbac2)

```sql
drop database if exists profile;
create database profile;
use profile;
create table resource (id int primary key auto_increment, resource_name varchar(50) not null);
create table role (id int primary key auto_increment, role_name varchar(50) not null);
create table users (id int primary key auto_increment, user_name varchar(45) not null, password varchar(255) not null);

create table users_role (id int primary key auto_increment, user_id int, foreign key(user_id) references users(id), role_id int, foreign key(role_id) references role(id));

create table resource_role (id int primary key auto_increment, resource_id int, foreign key(resource_id) references resource(id), role_id int, foreign key(role_id) references role(id), can_add char(1), can_edit char(1), can_view char(1), can_delete char(1));

insert into resource (resource_name) values ('MOBILE-SERVICE');
insert into resource (resource_name) values ('TELEPHONE-SERVICE');
insert into resource (resource_name) values ('TELEVISION-SERVICE');

insert into role (role_name) values ('Administrator');
insert into role (role_name) values ('Service Engineer');
insert into role (role_name) values ('Quality Assurance');

insert into users (user_name,password) values ('william_s','william_s');
insert into users (user_name,password) values ('mike_k','mike_k');
insert into users (user_name,password) values ('kane_a','kane_a');
insert into users (user_name,password) values ('lawarance_v','lawarance_v');
insert into users (user_name,password) values ('anderson_w','anderson_w');

insert into users_role (user_id, role_id) values (1,1);
insert into users_role (user_id, role_id) values (2,1);

insert into users_role (user_id, role_id) values (3,2);
insert into users_role (user_id, role_id) values (4,2);

insert into users_role (user_id, role_id) values (5,3);

insert into resource_role (resource_id, role_id, can_add, can_edit, can_view,can_delete) values (1,1,'Y','Y','Y','Y');
insert into resource_role (resource_id, role_id, can_add, can_edit, can_view,can_delete) values (2,1,'Y','Y','Y','Y');
insert into resource_role (resource_id, role_id, can_add, can_edit, can_view,can_delete) values (3,1,'Y','Y','Y','Y');

insert into resource_role (resource_id, role_id, can_add, can_edit, can_view,can_delete) values (2,2,'Y','Y','Y','Y');
insert into resource_role (resource_id, role_id, can_add, can_edit, can_view,can_delete) values (3,2,'Y','Y','Y','Y');

insert into resource_role (resource_id, role_id, can_add, can_edit, can_view,can_delete) values (3,3,'Y','Y','Y','Y');


select r.resource_name, r_role.can_add, r_role.can_edit, r_role.can_view, r_role.can_delete from resource r 
inner join resource_role r_role on r.id=r_role.resource_id
inner join role ro on ro.id=r_role.role_id 
inner join users_role users_r on ro.id=users_r.role_id
inner join users u on u.id=users_r.user_id where u.user_name='anderson_w';
``` 

---
# How to build role-based access control in SQL Teil 1 & 2

[Source Part #1](https://www.xaprb.com/blog/2006/08/16/how-to-build-role-based-access-control-in-sql/)
[Source Part #2](https://www.xaprb.com/blog/2006/08/18/role-based-access-control-in-sql-part-2/)

### How is the system designed?

1. Every object (row in a table) is owned by both a user and a group.
2. Users can belong to multiple groups.
3. Privileges can be granted to a row’s owner, or to its group-owner.
4. Privileges can be granted not only on rows, but on tables too (in UNIX, privileges apply to both files and directories).
5. There is a “root” group which always has permission to do everything.
6. By default, an object (row) stores its own minimal set of read/write/delete privileges, which are sufficient for most common tasks. These are similar to UNIX’s read, write, and execute privileges.
7. The minimal read/write/delete privileges specify User, Group, and Other, just as in UNIX.
8. Schema defaults (default column values) are similar to “sticky bits” in UNIX directories.

### The Database Schema

A word on naming: In this article `t_` stands for tables and `c_` stands for columns. By doing so we can keep the queries clear and use reserved words (such as `c_group`). 

```sql
create table t_foo (
    c_uid           int     not null        auto_increment primary key,
    c_owner         int     not null        default 1,
    c_group         int     not null        default 1,
    c_unixperms     int     not null        default 500,
    /* other columns ... */
);
``` 

You need these columns in every table.
1. `c_uid` is the primary or surrogate key for each row 
2. `c_owner` is the ID of the row's owner. This corresponds to `c_uid` in the `t_user` table
3. `c_group` defines which group owns the object
4. `c_unixperms` defines the object's UNIX-style read/write/delete permissions

### Groups and group memebership

Groups can be defined in the database but in practice they are so static that it's better to hardcode a lookup table or enumeratio in the application code, eliminating a trip to the database to fetch the group's definitions for every request. 

```js
const groups = {
    root: 1,
    officer: 2,
    user: 4,
    wheel: 8
}
```

**Note:** A row's `c_group` column contains the ID of the group that owns the row, so if the officer group owns a row, it will have the value `2`.

A user's group memberships are handled differently. Since group IDs are power of two, instead of being normalized  into a separate table, they can be packed into a single integer. This is stored in the `c_group_memberships` column on the `t_user` table. This denormalization removes complexity and data from your system, and makes queries much more efficient. 

**Note:** People are often get confused about group memberships, because the `t_user` table also has a `c_groups` column like every table, but that has nothing to do with which groups the user is a member of; it stores the group that owns the user. 

**A user who is in both the 'root' and 'users' groups has a `c_group_memberships` value of 5**

### UNIX-style read/write/delete permissions

The UNIX-style read/write/delete permissions are defined in another object in the code and packed into each row's `c_unixperms` column:

```js
const permissions = {
    owner_read: 256,
    owner_write: 128,
    owner_delete: 64,
    group_read: 32,
    group_write: 16,
    group_delete: 8,
    other_read: 4,
    other_write: 2, 
    other_delete: 1
}
``` 

**Note:** A row whose `c_unixperms` column has the value 500 (decimal) has the value 111110100 binary, so that means, from most to least significant bit, the owner can read, write, delete; memebers of the owner group can read and write; and other can just read. 

### Sample Schema

```sql
drop table if exists t_user;
create table t_user (
    c_uid           int             not null    auto_increment primary key,
    c_owner         int             not null    default 1,
    c_group         int             not null    default 1,
    c_unixperms     int             not null    default 500,
    c_username      varchar(50)     not null,
    c_group_memeberships    int     not null
);

insert into t_user (c_username, c_group_memberships)
   values('root', 1), ('xaprb', 4), ('sakila', 5);

drop table if exists t_event;

create table t_event (
   c_uid             int             not null auto_increment primary key,
   c_owner           int             not null default 1,
   c_group           int             not null default 1,
   c_unixperms       int             not null default 500,
   c_description     varchar(50)     not null
);

insert into t_event(c_owner, c_group, c_description) values
   (1, 1, 'MySQL Camp'), (1, 4, 'Microsoft Keynote');

``` 

### How to determine whether a user can take an action

In order to know if the user can perform any actions on the row, you need to figure out following data:

* The user's ID and group memebership
* The type and identitiy of the thing in questions (table and c_uid)
* The desired action (read, write, delete)

**Question:** Now we can ask questions in a way that traditional ACL does: can a user X do Y to object Z? For example, let's see if user `xaprb`has the right to read the `MySQL Camp` event:

* username = xaprb, user id = 2, c_group_membership = 4 `user`
* owner of the event is `root` and the event is part of the group 1 `root` 
* the event has unixperms = 500
    + owner_read, owner_write, owner_delete, group_read, group_write
        + the user xaprb is part of the `user` group he is not the owner and not part of the `root` group, therefore he/she can only `other_read`

1. xaprb’s user ID is 2 and c_group_memberships is 4.
2. The event’s c_unixperms column is 500, which grants owner_read, owner_write, owner_delete, group_read, group_write, and other_read.
3. The event’s c_owner column is 1, so xaprb is not the object’s owner, and none of the owner read/write/delete privileges applies.
4. The event’s c_group column is 1, and xaprb is not in the group that owns the object. None of the group privileges applies.
5. xaprb is in the ‘other’ role (everyone always is). So the other_read privilege applies.

Therefore `xaprb` can only read the event.

**Question:** Can user `sakila` update (write) the `Microsoft Keynote` event?

* user id = 3, she is part of the group `root` and `user`
* event is owned by `root` and is in the group `root`. Since the owner is in the group `root` and `sakila`too,
* `unixperms` 500 that means the group can read/write.

1. sakila isn’t the event’s owner, so none of the owner privileges applies.
2. sakila is in group 1 and 4, and the event’s group owner is 1, so group_read and group_write apply.

Therefore `sakila` can update the `Microsoft Keynote` event.

### Role-based access control in SQL, part 2

* Roles: groups are subset of roles, which is why they are often a convinient way to implement a role. You can have e.g. a superviser role in the group of roles.

* Actions: are important because they are the verbs in the "can user X do Y to object Z" questions. Since actions are verbs (write/update/delete), chances your application already defines a lot of actions as class method, and you may even maintain a list of actions as part of your design process.

* Status: Your privilege system can represent reality better if it respects the object's status, because some things can only be done when an object is in a certain status. 

```js
const statuses = {
    deleted: 1,
    inactive: 2,
    active: 4,
    cancelled: 16,
    pending: 32
}

``` 
An object’s status is stored in its `c_status` column, which I need to add to my generic set of columns. Now my table template looks like this:

```sql
create table t_foo (
    c_uid             int not null auto_increment primary key,
    c_owner           int not null default 1,
    c_group           int not null default 1,
    c_unixperms       int not null default 500,
    c_status          int not null default 0,
    -- other columns ...
);
```
Read more [here](https://www.xaprb.com/blog/2006/08/18/role-based-access-control-in-sql-part-2/)

---
# Case Study: Build yourself a simple CRM from Scratch

[Source - Build yourself a simple CRM from scratch in PHP and MySQL](https://medium.freecodecamp.org/building-a-simple-crm-from-scratch-in-php-58fef061b075)

We’ll be creating a simple CRM system for salespeople to:

* Access their tasks
* View their leads
* Create new tasks for each lead
* Create new opportunity
* Close a sale

Sales managers will be able to:

* Manage all customers
* Manage sales team
* View current sales activities

[You can find all demo files here](https://github.com/phpcontrols/phpgrid-custom-crm)

Here is a list of the essential components of the CRM:

* Leads: initial contacts
* Accounts: Information about the companies you do business with
* Contact: Information about the people you know and work with. Usually, one account has many contacts
* Opportunities: Qualified leads
* Activities: Tasks, meetings, phone calls, emails and any other activities that allow you to interact with customers
* Sales: Your sales team
* Dashboard: CRM dashboards are much more than just eye candy. They should deliver key information at a glance and provide links to drill down for more details.
* Login: Salespeople and managers have different roles in the system. Managers have access to reports and sales pipeline information.

We will start by creating our custom CRM database. The main tables we will be using are:

* contact — contains basic customer data
* notes — holds information collection from Contact by sales people.
* users — information about sales people

![Tables](https://cdn-images-1.medium.com/max/1600/0*gJgr4DrRJ3O_OEYr.)

* **The Contact** table contains basic customer information including names, company addresses, project information, and so forth.
* **The Notes** table stores all sales activity information such as meetings and phone calls.
* **The Users** table holds login information about users of the system such as usernames and passwords. Users can also have roles, such as Sales or Manager.
* All **other tables** are lookup tables to join to the three main relational database tables.
    + contact_status — contains contact status such as Lead and Opportunity. Each indicates a different stage in a typical sales cycle
    + task_status — the task status can be either Pending or Completed
    + user_status — a sale person can be Active or Inactive
    + todo_type — a type of task either Task or Meeting
    + todo_desc — description of a task such as Follow Up Email, Phone Call, and Conference etc.
    + roles — a user can be either a Sales Rep or a Manager

![Design](https://cdn-images-1.medium.com/max/1600/0*qExvrxjr5WZERLEO.)

**Note:** The key symbol in each table represents the table primary key. The magnifying glass indicates foreign key linking another table in the database. Sometimes we call it the “lookup” table.

[Checkout install.sql file here](https://github.com/phpcontrols/phpgrid-custom-crm/blob/master/db/install.sql)


