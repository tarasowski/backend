# Getting Started with Databases

[Source - 8 Lectures](https://www.youtube.com/watch?v=4Z9KEBexzcM&list=PL1LIXLIF50uXWJ9alDSXClzNCMynac38g)

## Purpose of a Database

* The purpose of a database is:
    - to store data (repository for storing data)
    - to provide an organized structure where this data can be placed
    - to provide a mechanism for querying, creating, modifying and deleting data (machanism for interacting with data - CRUD)
    - STORE, ORGANIZE, CRUD

* Database can store information and relationships that are more complicated than a simple list (e.g. customers and orders, employees and departments). A relational database allows us to represent these relations.

* Database solves a problem with a redundancy (to much waste of space), data anomalies (deletion problems (we may loose some important knowledge through deleting some rows), update problems (if you have to update all fields and not just one attribute, insertion problems (we insert one attribute and all the data across attributes is missing)), data integrity (to have all data be correct across the whole database)

* Relational databases are designed to address many of the information complexity issues that arise in business e.g. a product can be assembled from many different components. There are these natural complexities arise in the business. 

### Relational Database

* A relational database stores information in tables. Each informatial theme (business concept) is stored in its own table.
* **In essense, a relational database will break-up a LIST into several parts.**
    - One part for each theme in the list. For example, a project light might be divided into a CUSTOMER table, a PROJECT table, and a PROJECT MANAGER table.
* In our relational database examples (see above), we broke apart our list into serveral tables. Somehow the table must be joined back together.
* In a relational database, tables are `joined`(we join the tables together) together using mathed pairs of data values
    - If a PROJECT has a CUSTOMER, the Customer_ID can be sotred as a column in the PROJECT table. Whenever we need information about a customer, we can use the Customer_ID to look up the customer information in the CUSTOMER TABLE
* A relational database minimizes data redundancy, allows to model complex relationships among topics, and allows for partial data (null values)

**Note:** SQL (structured query language) is the primary tool for CRUD operations. SQL was designed simple to use and simple to understand. **With SQL we can restore a LIST view of the data again, since database simply breaks the LIST into different tables and assigns relationships**

### Database System

It's important to remember that database system is not just a database itself. The four componenets of a database system are:

1. Users (people or other apps)
    - Use a database apps to keep track of information
    - Use different user interface forms to enter, read, delete, and query data
    - Producte reports

2. Database Applications (website, client, mobile app, desktop)
    - A database application is a set of one or more commputer programs or websites that server as an intermediary between the user and the DBMS
    - These application are not allowed to talk to database directly, they must go to DBMS to talk to the database.

3. Database Management System (Gatekeeper - all the information that flow in/out from a database must travel through DBMS - is a critical mechanism to mantain the quality of our data in the database, we don't allo our users or applications to directly access the data in the database)

4. Database (store data in separate tables)
    - A database is a self-describing collection of related records. A database doesn't only contain it's own data but it has also a defintion of it's own structure.
        - Self-describing:
            + The database itself contains the defintions of its structure
            + Metadata: are data which describe other data e.g. en employee table conaints attribute called `employeeId`is an integer and that is knows as metadata. So the information that    `employeeId`is an integer
            + Indexes and other overhead data (tables to improve performance)
            + Application metadata (user preferences)
            + User data

    - **Tables within a relational database are related to each other in some way**
    
![Database Systems](./images/database-system.png)

### Database Management System (DBMS)

Is a special kind of software program not only to create databases but also process and manage these databases. DBMS itself is not the database!!!

* A database management system (DBMS) servers as an **intermediary** between database applications and the database
* The DBMS manages and controls database activities
* The DBMS creates, processes and administers the database it controls

#### Functions of a DBMS
* Create a new database
* Crate a new tables (and establish relationships between tables)
* Create supporting structures
* Read database data
* Modify database data (insert, update, delete)
* Maintain database structures
* Enfore rules
* Control concurrency
* Provide security
* Perform data backup and recovery

* Referential Integrity Constraints
    + A DBMS can enforce many constraints (Einschränkungen)..
    + **Referntial integrity constraints** ensure that the values of a column in one table are valid based on the values in another table (Referential integrity is a property of data stating references within it are valid. In the context of relational databases, it requires every value of one attribute (column) of a relation (table) to exist as a value of another attribute (column) in a different (or the same) relation (table).)
        - For example, if a 5 was entered as a CustomerID in the PROJECTS table, a Customer having a CustomerID value of 5 MUST exist in the CUSTOMER TABLE. If the CustomeriD 5 doesn't exist it won't allows u to enter it as CustomerId in the PROJECTS table. This is how we maintain DATA INTEGRITY.

## Types of Database Systems

* Personal database systems typically (not support big businesses - MS ACCESS):
    + Support one application
    + Have only a few tables
    + Are simple in design
    + Involve only one computer
    * Support one user at a time

* Enterprise-Level database systems typically (Oracle, SQL Server, MySQL):
    + Support several users simultaneously
    + Support more than one application
    + Involve multiple computers
    + Are complex in design
    + Have many tables
    + Have many databases (database for website, but also for a dashboard)
    + Support thousands of users 
    + Spread across many physical servers, geographically distributed
    + **Support more than 1 database: within the same DBMS we can have operational database, and we also can create datawarehouse. They can all be managed by the same DBMS.**

![Examples](./images/database-systems.png)

# The Relational Model

### Entity

* Entity is something of importance to user or organization that needs to be represented in a database
    + An employee, a department, a project can be an employee (single business concept)

### Relation

* A relation is a two-dimensional table that has specific characteristics
* The table dimensions, like a matrix, consist of rows and columns

**Note:** A relation is a specific type of table that is in order for a table to qualify as a relation, the table must have certain characteristics. Certain Characteristics must be met in order for a table to qualify a relation.

#### Characteristics of a Relation

* Rows contain data about instances of an entity (e.g. a single employee)
* Columns contain data about attributes the entity (e.g. employee name, id)
* Cells of the table hold a single value
* All values in a column are of the same kind (data type)
* Each column has a unique name
* The order of the columns is unimportant
* The order of the rows is unimportant
* No two rows can be identical (if we take all rows together entirely, they cannot be identical with other rows in the table - that's why we need a primary key or composite key, they make the specific row unique) - When all values of row a considered together, there must be something unique about the row, not two rows can be identical to each other!!!

![Simple](./images/sample-relation.png)

> an RDBMS is called a relational database system because the data is stored in tables. [Source](https://www.xaprb.com/blog/2012/03/13/what-makes-relational-databases-relational/)

![Non](./images/non-relation.png)

There are two problem here. In the first row the cell doesn't hold a single value. And there are two rows that are identical.

**Important:** All relations are tables, but not all tables are relations

![Terminology](./images/terminology.png)

### Keys
* A key is one (or more) columns of a relation (table) whose values are used to identify a row
    + Unique Key
        - Data value is unique for each row (e.g. within an id column)
        - Consequently, they key will uniquely identify a row
    + Nonunique Key
        - Data value may be shared among several rows
        - Consequently, the key will identify a set of rows

![Example](./images/non-key.png)
---

![Examples of Keys](./images/database-keys.png)

#### A Composite Key
* A composite key is a key that is composed of two or more attributes/columns (in order to get uniques)
* For a key to be unique, it must often become a composite key

![Composite](./images/composite-key.png)

#### A Candidate Key
* A candidate key is called "candidate" because it has the potential to become the primary key
* A candidate key is a unique 

**Note:** Like in a presidential election where a candiate can become a president.

#### A Primary Key
* A primary key (the main identifier for a relation and is a unique key) is a candiate key chosen to be the main key for the relation
* If you know the value of the primary key, you will be able to uniquely identify a single row within the table.

![Primary](./images/primary-key.png)

#### A Surrogate Key
* Surrogate key is a unique, numeric value that is added to a relation to server as the primary key. 
* Surrogate key values have no meaning to users and are usually hidden on forms, queries, and reports
* A surrogate key is often used in place of composite primary key

**Note:** Surrogate Key is intentially added as a database designer for a purpose of serving as primary key. Often used when we don't have a column within a table that naturally serve as a unique identifier as a primary key.

![Surrogate](./images/surrogate-key.png)
---

![Surrogate](./images/surrogate-key-2.png)

#### A Foreign Key - Relationships Between Tables
* A table may be related to other tables
    + For example
        - An Employee works in a Department
        - A Manager controls a Project
* To establish relationships, we need to implement a foreign key
* A foreign key is a primary key from one table that is placed into another table for the purpose of linking the records of the table together
* Referential integrity states that every value of a foreign key must match a value of an existing primary key (RDBMS forces it)

![Foreign Key](./images/foreign-key.png)

#### Null Values
* A Null value means that no data exists (missing or unkonwn value)
    + You can think of a null value as an empty cell in the table
* This is different from a zero, space, character, empty string, or tab character
* A Null is often ambiguous. It could mean...
    + The column value is not appropriate for the specific row
    + The column value has not been decided
    + The column value is unknown or missing

# Topic 02: Dependencies & Data Normalization

#### Functional Dependency
* A relationship between attributes in which one attribute (or group of attributes) determines the value of another attribute in the same table
* Illustration...
    + The price of one delicious Girl Scout cookie can determine the price of a box of 12 cookies. (CookiePrice, Qty) -----> BoxPrice
* Determinant are the atributes that we use as the starting point (the variable on the left side of the equation) is called a determinant (CookiePrice, Qty), because we can use these value to determine the values of other attributes in the table such as `BoxPrice``
* By definition...
    + A candidate key (will eventually selected and promoted to the primary key) of a relation will functionally determine all other non-key attributes in the row
* Likewise, by definition...
    + A primary key of a relation will functionally determine all other non-key attributes in the row

![Dependency](./images/dependency.png)

If we know the `EmployeeId` by definition we should find another attributes that are associated with that employee. In this case we have two additional attributes `(EmpLastName, EmpPhone)`. Therefore `EmployeeId` is the determinant since we can use it to find other attributes that are associated with this particular employee.

### Data Normalization

* A process of analyzing a relation to ensure that it is `well formed`
    + not susceptible for 3 types of data anomalies: 
        - deletion anomalies
        - update anomalies
        - insertion anomalies
* Normalization involves decomposing relations with anomalities to produce smaller, well-structured relations
* More specifically, if a relation is normalized (well-formed), rows can be inserted, deleted, or modified without creating anomalies.

Data normalization process is that we are attempting to create relations in which we can insert new data, delete existing data, or modify existing data without creation one of these anamolies

![Anomalies](./images/anomalies.png)

#### Data Normalization Process Design Principles
* Relational design principles for normalized relations:
    * To be a well-formated relation, every determinant must be a candidate key
    * Any relation that is not well-formed should be broken into two or more well-formed relations!
* TIP: As a general rule, a well-formed relation will not encompass more than one business concept (An employee, a department, a project can be a single busines concept). If you have non-key attributes that contain more than one business concept, then it's not a well formed relation. We need to break it down...

![Example](./images/normalization-example.png)
----
![Example2](./images/normalization-example.png)
----

The objective is to arrive at the 3rd normal form. In order to arrive at the 3rd normal form, we'll need to get our tables into 1st normal form, and then into a 2nd normal form. For the vast majority of most business cases, the 3rd normal form is enough.

![Normalization Steps](./images/normalization-steps.png)


##### First Normal Form
* Table contains no multivalued attributes
    * Every attribute value is atomic (we are not storing one or more value in each of the table)
    * All relations are by definition in 1st Normal Form
    * If a table meets a defintion of a relation, it's automatically in the 1st normal form

![Table](./images/first-normal-form.png)
---

Each cell within a table contains a single value, the values are atomic
![Table](./images/first-normal-form-transformed.png)

##### Second Normal Form
* 1NF PLUS every non-key attribute is fully funcionally dependent on the ENTIRE primary key (the values of the primary key must be able to fully functually determine the values of all other non-key attributes within table)
    + Every non-key attribute must be defined by the entire key, not by only part of the key
    + No pratial dependecies 

![Dependency](./images/dependency-diagram.png)

**Note:** `Product_Description, Product_Finish, Unit_Price` are partially dependent on `Product_ID`. I don't need to know the `Order_ID` to know the attributes of the product, I can simply use `Product_ID` this is called a partial dependency. 

> In order to move from a lower Normal Form into higher Normal Form we need to break the relation apart into smaller relations. By breaking our original relation into these 3 relations we have removed all the partial dependencies, that is if I look at the non-key attributes in any of these 3 relations, I'll find that all of those non-key attributes are fully functionally dependent on the entire primary key. Look e.g. at the `Product` relation, if I know the `Product_ID` I also know the `Product_Description, Product_Finish, Unit_Price`

### Partial Functional Dependency Example:
Assume you have a table called, “OrderLines” that describes order lines, and the primary key is a composite primary key consisting of OrderID + ProductID, and you have ProductName and ProductCost stored in this table. ProductName and ProductCost are partial functional dependencies because they are functionally dependent on ProductID, but not OrderID. They need to be removed from the OrderLines table and placed in a parent table called Products with a primary key of ProductID. [Source](https://www.quora.com/What-is-the-difference-between-partial-and-transitive-dependency-in-database-management)

![Partial](./images/no-partial-dependencies.png)

**Note:** But we still have another problem in our `Order` relation we have the so-called transitive dependency. In order for our relational design to be in 3rd Normal Form we need to eliminate this transitive dependency. 

#### Third Normal Form
* 2NF PLUS no transitive dependencies (functional dependencies on non-primary-key attributes)
    + Such dependencies are called transitive, because the primary key is a determinant for another attribute, which in turns is a determinant for a third.
* Solution: Non-key determinant with transitive dependencies goes into a new table; non-key determinant becomes primary key in the new table and remains as a foreign key in the old table.

![Transitive Dependencies](./images/transitive-dependencies.png)

**Remember:** Each relation should contain attributes that are related to one and only one business concept and business theme!!!!


# Topic 03: SQL

* SQL is not a programming language, but rather is a data sub-language
* SQL is comprised of
    + A data defintion language (DDL)
        - Used to define and manage database structures
            + Create database objects
    + A data manipulation language (DML)
        - Data defintion and updating
        - Data retrieval (Queries)
            + Provides with CRUD
    + A data control language (DCL)
        - For creating user account, managing permissions, etc.
            + Permissions and security etc.

### SQL for Data Definition
* The SQL data definition statements include
    * CREATE
        - To create database objects (create new table)
    * ALTER
        - To modify the structure and/or characteristics of existing database objects (modify the structure of a table)
    * DROP
        - To delete existing database objects (delete the table or view)

A database object in a relational database is a data structure used to either store or reference data. The most common object that people interact with is the table. Other objects are indexes, stored procedures, sequences, views and many more.

```sql
CREATE TABLE Employee (
    empId       Integer     NOT NULL,
    empName     Char(25)    NOT NULL,
    CONSTRAINT  empPk       PRIMARY KEY(empId)
); 
```
**Note:** The SQL statement ends with a semicolon, it's a good partice always to end the statement with a semicolon. Also in the statement in parenthesis we see a comma, the comma tells the database that we are finished with defining an attribute.

Within SQL key is such as primary key are considered to be CONSTRAINTS. In the case above we define a primary key for our Employee table and we are naming that constraint `empPk`. Important point that is within a database, every constraint must have a unique name. We are telling the database, that each value in the `empId` attribute/column must be unique. 

#### Why to have a constraint name?
1. If a query (insert, update, delete) violates a constraint, SQL will generate an error message that will contain the constraint name. If the constraint name is clear and descriptive, the error message will be easier to understand; if the constraint name is a random guid-based name, it's a lot less clear. 
2. If a constraint needs to be modified in the future (yes, it happens), it's very hard to do if you don't know what it's named. (ALTER TABLE MyTable drop CONSTRAINT um...) And if you create more than one instance of the database "from scratch" and use system-generated default names, no two names will ever match.


### Composite Primary Key
If we want to create a composite primary key we can use something like this

```sql
CREATE TABLE Skill (
    empId       Integer         NOT NULL,
    skillId     Integer         NOT NULL,
    skillLevel  Integer         NULL,
    CONSTRAINT  empSkillPk      PRIMARY KEY(empId, skillId)
);
``` 

### Foreign Key
If we want to create a foreign key constraints

```sql
CREATE TABLE EmployeeSkill (
    empId       Integer         NOT NULL,
    skillId     Integer         NOT NULL,
    skillLevel  Integer         NULL,
    CONSTRAINT  empSkillPk      PRIMARY KEY(empId, skillId),
    CONSTRAINT  empFk           FOREIGN KEY(empId)      REFERENCES Employee(empId),
    CONSTRAINT  skillFk         FOREIGN KEY(skillId)    REFERENCES Skill(skillId)
);
``` 
 
![Tables](./images/table-connect.png)

### Cascading Deletes & Cascading Update

```sql
CREATE TABLE EmployeeSkill (
    empId       Integer         NOT NULL,
    skillId     Integer         NOT NULL,
    skillLevel  Integer         NULL,
    CONSTRAINT empSkillPK       PRIMARY KEY(empId, skillId),
    CONSTRAINT empFk            FOREIGN KEY(empId)      REFERENCES Employee(empId) ON DELETE CASCADE,
    CONSTRAINT skillFk          FOREIGN KEY(skillId)    REFERENCES Skill(skillId) ON UPDATE CASCADE
)
``` 

`ON DELETE CASCADE` tells the database that we want to establish a cascading delete relationship between this table and the Employee table. It's used to help us to maintain the integrity and the quality of our data in the database. If e.g the employee under `empId` = 1 leaves the organization, the cascading delete will follow the relationship line to the EmployeeSkill label, if it finds any of the records it will delete them automatically.

![Delete](./images/cascade-delete.png)

`ON UPDATE CASCADE` very similar to cascading delete, the purpose of this command is to maintain the quality of the data and integrity in the database. It's needed to maintain the link between both tables.

![Update](./images/cascade-update.png)


### ALTER
* Adding primary key constraints to an existing table
    - The SQL ALTER statement

Let's imagine we create our `Employee`table but we forgot to establish our primary key. In this case we can use the `ALTER` statement in order to add a primary key to the table

```sql
ALTER TABLE Employee 
    ADD CONSTRAINT empPk PRIMARY KEY(empId);
``` 

If we want to add a composite key to an existing table.

```sql
ALTER TABLE EmployeeSkill
    ADD CONSTRAINT empSkillPk
        PRIMARY KEY(empId, skillId);
``` 

If we want to add a foreign key constraint. In this case we are telling the database that we want to link the `deptId`attribute in this table to the `deptId` attribute in the `Department` table.

```sql
ALTER TABLE Employee
    ADD CONSTRAINT empFk FOREIGN KEY(deptId)
        REFERENCES Department(deptId);
``` 

## Modifying Data Using SQL
* INSERT INTO
    + Will add a new row into a table
* UPDATE
    + Will update the rows in a table which meatch the specified criteria
* DELETE FROM
    + Will delete the rows in a table which match specified criteria

#### INSERT INTO
* To add a row to an existing table, use the INSERT INTO statement
* Non-numeric data must be enclosed in single quotes (')

```sql
INSERT INTO Employee (empId, salaryCode, lastName)
    VALUES(62, 11, 'Halpert');
``` 

#### UPDATE
* To change the data values in an existing row (or a set of rows) use the UPDATE statement

```sql
UPDATE  Employee
SET     phone = '657-278-1234'
WHERE   empId = 29; /* change phone number for the row 29 */

UPDATE  Employee
SET     deptId = 4
WHERE   empName LIKE 'Da%'; /*  for every employee where the name begins with Da (% is a wildcard statement) */

UPDATE  Employee
SET     deptId = 3; /* change the departmentId for every employee in the table to value 3 */

``` 
`SET` the name of the arribute that we want to change followed by the new value for that attribute.
`WHERE` which specifies which row or rows we want to change

**Note:** The shortest statement will cause the most change in the database. If we would have a 1M records in the Employee table, the `SET   deptId = 3` would make 1M changes to that database. It will set the depratment Id to 3 for every employee

#### DELETE FROM

```sql
DELETE FROM Employee
WHERE  empId = 29; /* delete from employee table row 29 */

DELETE FROM Employee
WHERE empName LIKE 'Da%'; /* delete all of the rows with the Employee table where the name of the employee begins with Da */

DELETE FROM Employee; /* delete all rows from Employee */

```

#### SQL for Data Retrieval: Queries
* SELECT is the best known SQL statement
* SELECT will retrieve information from the database that matches the specified criteriea using SELECT/FROM/WHERE framework

```sql
SELECT  empName
FROM    Employee
WHERE   empId = 33; /* from row 33 */

SELECT  empName
FROM    Employee; /* every row from the table */

``` 

The results of the query are a relation that is as long as they are some data to be retrieved the result will be a two-dimensional table of data, it may contains just a single row or single column or it may contain may rows or many columns. 

* A query pulls information from one or more relations and creates (temporary) a new relation
* This allows us to:
    + Create a new relation
    + Feed information to another query (as a subquery)
    + The result may not be in 3NF (especially when performing a join)

* To show values for two or more specific columns, use a comma-separated list of column names

```sql
SELECT empName, empId
FROM Employee;
``` 

* To show all of the column values for the rows that match the specified criteria, use an asterisk (*)

```sql
SELECT * 
FROM Employee;
``` 

* The DISTINCT keyword may be added to the SELECT statement to suppress the display of duplicate rows (e.g. if a row has columns with duplicate values)

```sql
SELECT DISTINCT deptId
FROM Employee;
``` 

* The WHERE clause specifies the matching or filtering criteria for the records (rows) that are to be displayed. 

```sql
SELECT empName
FROM Employee
WHERE deptId = 15;
``` 

* WHERE clause comparisons may include
    + Equals `=`
    + Not Equals `<>` or `!=`
    + Greater then `>`
    + Less than `<`
    + Greater than or Equal to `>=`
    + Less than or Equal to `<=`
* We can also create compound additons, we can create filters based on more than one criterion
    + AND representing an intersection of the data sets
    + OR representing a union of the data sets
    + Concepts such as intersection and union are derived from relational algebra (venn diagrams)

```sql
SELECT empName
FROM Employee
WHERE deptId < 7 OR deptId > 15;

SELECT empName
FROM Employee
WHERE deptId = 9 AND salaryCode <= 3;

``` 
* The WHERE clause may include the IN keyword to specify that a particular column value must match one of the values in a list (this is much more convinient instead of using OR operators)

```sql
SELECT empName
FROM Employee
WHERE deptId IN (4, 8, 9); /* is in the department 4, 8 or 9*/

SELECT empName
FROM Employee
WHERE deptId NOT IN (4, 8, 9); /* where the Employee is not in department id*/
``` 

Compared to:
```sql
WHERE deptId = 4 OR deptId = 8 OR deptId = 9;
``` 

* SQL provides a BETWEEN keyword that allows a user to specify a minimum and maximum value on one line (BETWEEN is inclusive!!!)

```sql
SELECT empName
FROM Employee
WHERE salaryCode BETWEEN 10 AND 45;
```

Compared to:
```sql
WHERE salaryCode >= 10 AND salaryCode <= 45;
```

* The SQL LIKE keyword allows for searches on partial values
* LIKE can be paired with wildcards to find rows that partially match a string value
    + The multiple character wildcard is a percent sign (%)
    + The single character wildcard is an underscore (_)

```sql
SELECT empId
FROM Employee
WHERE empName LIKE 'Da%'; /* the name that begins with Da*/

SELECT empId
FROM Employee
WHERE phone LIKE '657-278-_ _ _ _'; /* show all phone numbers that contain exactly 4 unkonwn characters */
```
* Query results may be sorted using the ORDER BY clause (ascending vs. descending sorts)

```sql
SELECT *
FROM Employee
ORDER BY empName ASC; /* or DESC which stands for descending */
``` 

* SQL provides several built-in functions
    + COUNT - Counts the number of rows that match the specified criteria
    + MIN - Finds the minimum value for a specific column for those rows matching the criteria
    + MAX - Finds the maximum value for a specific column for those rows matching the criteria
    + SUM - Calculates the sum (total) for a specific column for those rows matching the criteria
    + AVG - Calculates the numerical average (mean) of a specific column for those rows matching the criteria
    * STDEV - Calculates the standard devisation of the values in a numeric column whose rows match the criteria

```sql
SELECT COUNT(*)
FROM Employee; /* the number of records in the empoyee table */

SELECT  MIN(hours) AS minimumHours, /* it will look at the hours column and determine the min/max/avg*/
        MAX(hours) AS maximumHours,
        AVG(hours) AS averageHours
FROM Project
WHERE ProjID > 7;
``` 

* Categorized results can be retreived using the GROUP BY clause. It allows us to combine results into categorized output.

```sql
SELECT  deptId,
        COUNT(*) AS numberOfEmployees /* we want to get the deptId and the the number of employees that work in each department*/
FROM Employee
GROUP BY deptId;
``` 
![Output](./images/output-sql-query.png)

**Note:** In the example above we are using an alias `AS` to refer to the result of the count operation. We are telling the database that the result of the count function to be called `numberOfEmployees`

* The HAVING clause may optionally be used with a GROUP BY in order to restrict which categories are diplayed (HAVING serves the same function as WHERE for a GROUP BY statement)

```sql
SELECT salespersonId, salespersonLastName, SUM(saleAmount) AS totalSales
FROM Sales
GROUP BY salespersonId, salespersonLastName
HAVING SUM(saleAmount) >= 10000; /* shows only the sales people which have saleAmount >= 10000 */
```

### Retrieving Information form Multiple Tables
* Subqueries
    + As stated earlier, the result of a query is a relation. The results from one query may therefore be used as input for another query. This is called a subquery. There are two different types of subqueries:
        + Noncorrelated subqueries
        + Correlated subqueries

* In a noncorrelated subquery, the inner query (a query within parenthesis) only needs to run once in order for the database engine to solve the problem

```sql
SELECT empName
FROM Employee
WHERE deptId IN (SELECT deptId
                FROM Department
                WHERE deptName LIKE 'Account%');
```

* In a correlated subquery, the inner query needs to be run repeatedly in order for the database engine to solve the problem. (The inner query needs a value from the outer query in order to run)

```sql
SELECT empName
FROM Employee e /* e is an alias for the Employee table, it allows to refer in outer query just by using e */
WHERE empSalary > (SELECT AVG(empSalary)
                    FROM Employee
                    WHERE deptId = e.deptId);
``` 
* Joins: another way of combining data from multiple tables is by using a join (allows us to merge data from different tables into a single result set). All database joins can be divided into:
    + Outer join
        + Left Outer Join
        + Full Outer Join
        + Right Outer Join
    + Inner join

![Joins](./images/database-joins.png)

```sql
SELECT empName, deptName
FROM Employee AS E, Department AS D
WHERE E.deptId = D.deptID; /* this is an INNER JOIN example */
``` 

![Example](./images/join-example.png)

* The JOIN...ON syntax can be also be used to perform a join. It has the advantage of moving the JOIN syntax into the FROM clause. By doing so we can use the `WHERE` clause for other filtering purposes.

```sql
SELECT empName, deptName
FROM Employee e INNER JOIN Department d
     ON e.deptId = d.deptId
WHERE d.deptName NOT LIKE 'Account%';
``` 
* The OUTER JOIN syntax can be used to obtain data that exists in one table without matching data in the other table. 

```sql
SELECT empName, deptName
FROM Employee e LEFT OUTER JOIN Department d
     ON e.deptId = d.deptId,
``` 

**Note:** `LEFT OUTER JOIN` is being used to tell the database from which table all of the results should appear regardless of wether there is a matching value in the other table. See in the example below the last empName doesn't have the department, but it's still appears on the new table. In the `FROM` statement we have two tables listed Employee and Department. The Employee table is named on the **Left side of the join statement**, so to the database that's the `Left table` where the Department is the `Right Table`. So if we do `LEFT OUTER JOIN` we say give me a list of all the employees regardless they have a matching department, but if they have a matching department include the depratment as well. 

![Outer Join](./images/outer-join-example.png)

**Note:** A `RIGHT OUTER JOIN`does include all the results whether there is an employee assigned to those department. If an Employee is assigned to the department this information will be included into results if not, if there is a department that has currently no employees in it, it will appear in the table as well. It will just have an empty or null value in the results where the employee name will be

![Right Join](./images/right-join-example.png)

* The unmatched data from either table are included in results if a FULL OUTER JOIN is used. It will include all of the records from the left and the right table regardless if the match exists, but if the match exits it will extract the results.

```sql
SELECT empNanem, deptName
FROM Employee e
    FULL OUTER JOIN Department d
    ON e.deptId = d.deptId;
```

![Full](./images/join-example.png)

**Note:** It will include all results regardless of the matching

### Deleting Database Objects: DROP
* To remove unwanted database objects from the database, use the SQL DROP statement
* Warning... The DROP statement will permanently remove the object and all of its associated data!

```sql
DROP TABLE Employee; /* remove the entire table itself */
```
* To change the contraints on existing tables, you may need to remove the existing constraing before new constrains can be added

```sql
ALTER TABLE Employee DROP CONSTRAINT empFk; /* we want to remove Employee foreign key from the table */
``` 

* The `CHECK` constraint can be used to create restirciton on the values that are allowed to appear in a column

```sql
ALTER TABLE Project
ADD CONSTRAINT projectCheckDates
CHECK (startDate < endDate); /* if not true the db will not allow to add the data */
```
* SQL Views ia virtual table created by a DBMS-stored SELECT statement which can combine access to data in multiple tables and even in other views

```sql
CREATE VIEW SalesDepartment AS
SELECT *
FROM Employee
WHERE deptId = (SELECT deptId FROM Department WHERE deptName = 'Sales');
```
* You can run a query agains a view in the same way that you run a query agains a table

```sql
SELECT empName FROM SalesDepartment;
```



## Database Lesson #4 of 8 - Data Modeling and the ER Model

[Source](https://www.youtube.com/watch?v=IfaqkiHpIjo)

### The Stages of Database Development

1. Requirement Analysis Stage: understand the problem for the solution
    + Source of requirements:
        + User Interviews
        + Forms
        + Reports
        + Queries
        + Use Cases
        + Business Rules
        + Observation
        + JAD Sessions (managers, developers, customers, potential users)
2. Compoment Design Phase: we create a data models is  graphical representations of database system
    + After the requirements have been gathered, they are transformed into an Entity Relationship (E-R) Data Model. E-R Models consist of 
    1. Entities (tables)
    2. Attributes a) Indentifiers (Keys), b) Non-key attribues (columns)
    3. Relationships (between entities)

#### Entity
-  An entity class is a description of the structure and form of the occurences of the entity. Similar to a recipe or architectural blueprints (class = is the table itself )

- An entity instance is a specific occurence of an entity class (instance = is a row in the table)
    + If this a generic recipe we can have basic instructions, put that in the oven cook and back the cake and we add glasure. The basic recipe gives us a guideline how to produce a cake. **The cake is that created is a unique individual item**. While the specific individual real-world cake is equal to an instance of an entity.
    + The same applies to architectural blueprints. We have basic template how to design a house, and homeowner wants to make some specific decisions what types of colors they want to have in a kitchen. All of those individual characteristics make that the resulting real-world house a unique specific item. In our analogy the architectural **blueprints are similar to an entity class and the house it the entity instance.**

- If we have an employee entity that is an employee entity class. We may define attributes that we want to track for all employees such as an employee id, name, department, when we add a new row of data to that table and we specify values to those attributes `employee_id: 1, name: "Dan", department: "marketing"`. We are describing a real-world entity, the new row of data is an instance of an employee. 
![Class](./images/class-instance.png)

**Note:** By filling the values of the attributes we are defining a specific instance of the entity class. We are defining an employee or real-world project. Each attribute is as part of an entity as well as value properties such as Int, varchar(50) max length, additional propeties for each attribute such as attribute is allowed to store `null` values. 
 
#### Attributes
- Entities have attributes that together describe the entity
    + Examples for a project entity
        - projectName
        - startDate
        - projectType
        - projectDescription
- Each attribute has a data type and other properties
    
Attributes can be classified as:

- Identifiers (Keys)
    - Entity instances have identifiers (keys)
        + Keys are a type of attribute
    - A key will identify a specific instance in the entity class
        + socialSecurityNumber
        + studenId
        + employeeId
        + department Id
    - Uniqueness
        + Keys may be unique or non-unique
        + If the key is unique, the data value for the key must be unique among all instances of the entity
    - Composite
        + A composite key consists of two or more attribues
            + flight number & flight date
        
![Representation](./images/representation-in-er.png)

#### Relationships
- Entities can be connected to each other in relationships (a department can have many different employees, a customer can have many different orders)
- The **degree** of the relationship defines the number of entity classes that participate in the relationship
    + Degree 1 is unary relationship (entity is related to itself - recursive relationship - an entity that is related to itself)
    + Degree 2 is a binary relationship (one entity is related to another entity - the most common types of relationships in entity relationship modeling)
    + Degree 3 is a ternary relationship (3 entities envolved into relationship)

![Unary](./images/unary.png)

**Desc:** A person can be married to another person from the `Person` class.

![Binary](./images/binary.png)

**Desc:** An employee may park in the parking space OR a parking space can be assigned to an employee. 

![Ternary](./images/ternary.png)

**Desc:** We have 3 entities, the intersection of these 3 entities is `Prescription`. So, when a doctor writes a prescription which involves a patient and a specific drug, these 3 entities together are envovled into ternary relationship.

#### Examples of Relationships
- 1:1 (one-to-one)
    + A single entity instance in one entity class is related to a single entity instance in another entity class
        - An employee may have no more than one locker
        - A locker may only be used by one employee
- 1:N (one-to-many)
    + A single entity instance in one entity class is related to many entity instances in another entity class
        - An employee works in one department
        - A department can have many employees
- N:M (coceptual many-to-many)
    + Many entity instances in one entity class are related to many entity instances in another entity class
        - A supplier may supply several items
        - A particular item may be supplied by several suppliers
**Important:** In realworld we cannot implement many to many relationships directly with two entities. We must always have a third entity a third table, which acts as a lookup table and provides us with the ability to link many instances of one entity with many instances of another.

![Lookup Table](./images/lookup-table.png)

## Maximum Cardinality
- Relationships are named and classified by their cardinalities, which is a word that means count (as in the number of items in a set)
- Each of the three types of binary relationships shows previously has a different maximum cardinality
- Maximum cardinality is the maximum number of entity instances that can participate in a relationshp instance
    + one, many, or some other positive fixed number
- Minimum cardinality is the minimum number of entity instances that MUST participate in a relationship instance (the relationship might be optional or mandatory)
- These values typically assume a value of zero (optional) or one (mandatory)    

**Desc:** The maximum and minimum cardinalities respectivly allow us to specify the max. number of instances of one entity allowed to participate in a relationship and the minimum number of instances that must participate in relationship.

![Cardinalities](./images/cardinatlities.png)

**The first symbol is the minimum cardinality and the second symbol is the maximum cardinality!**

#### There are only 4 specific types that may exists in an Entity-Relationship Model. See in the example above!
1. One and Only One
2. One to Many
3. Zero to One
4. Zero to Many

**Note:** Everything that we have described above we can call `HAS-A` relationships. The term is used because each entity instance has a relationship to a second entity instance e.g. en employee has a locker or locker has an employee.

### Strong and Weak Entities
- A weak entity is an entity whose instances cannot exist in the database whitout the existence of an instance of another entity
- An entity that is not a weak entity is called a strong entity
    + Instances of a strong entity can exist in the databae independently

![Strong/Weak](./images/strong-weak.png)

We can add customers to the database without having any relationships to other entities. But orders cannot exist without existing customers. In this example a customer is a strong entity, where order is a weak entity. 

##### There are two weak entity types:
- An **ID-Dependent** (also known as identifying relationships) weak entity is a weak entity that cannot exist without its parent entity. In this way database will enforce the constrain that ids cannot exist without being associated with an instance of the parent entity. 
    + This requirement is enforced by using a composite key for the weak entity
        - The first part of the key is the key for the strong entity
        - The second part of the key is the key for the weak entity itself

**Note:** An identifying relationship can be seen graphically by the use of a solid relationship line connecting a strong entity with the weak entity

![Solid](./images/solid-relationship-line.png)

- The relationship between a strong and weak entity is termed a **non-identifying relationship** if the weak entity is non-ID-dependent
    + Represented by a dashed line
    + Also used between strong entities

- All ID-dependent entities are weak entities, but there are other entities that are weak but not ID-dependent
- A non-ID-dependent weak entity many have a single or composite key, but the key of the parent entity will be a foreign key within the weak entity. 

![Example](./images/id-weak.png)

### Different Type of Relationship between Entities

- Subtype Entities:
    + A subtype entity is a special case of another entity (which is called its supertype)
    + An attribute of the supertype may be used to indicate which of the subtypes is appropriate for a given instance - This attribute is called a discriminator
    + Subtypes can be exclusive or inclusive:
        + If exclusive, the supertype relates to at most one subtype: it means that each instance of a supertype can be related at most 1 of the subtypes. A `vehicle` can be a car or a track or motorcycle, but it cannot simultaniously be a car, truck a motorcycle.
        + If inclusive, the supertype can relate to one or more subtypes: The supertype can be related one or more subtypes as an example consider a university, where we have a supertype `person` and we might have a subtype which we call `student` and another subtype which we call `employee`. In inclusive relationship a given person could simultaniouly be a stundent and an employee of an university. 
    + The identifiers of a supertype and all of its subtypes is the same attribute
    + The relationships that connect supertypes and subtypes can be **IS-A** relationships if a subtype is the same entity as the supertype. (if the subtype is a specific case of the supertype then we call it a IS-A RELATIONSHIP - a car is a vehicle, a truck is a vehicle - each of these individual subtypes have individual characteristics which make them unique, but all three can be broadly classified as a types of vehicles)
        + **REMEMBER:** An instance of the subtype inherits all of the properties of its supertype


![Example](./images/supertype.png) 

**Desc:** We have a super type `vehicle` and a subtypes can be car, truck or motorcycle. There maybe unique attributes about subtypes that we want to track in additional to set of attributes we want to track to every `vehicle`regardless of specific type of `vehicle`. 

![Example](./images/super-sub.png)

**Desc:** `isGradStudent` the value can be true or false. The value tells us which of the relationships path follow in order to get information about that specific student. Also note that each of the stubtypes undergrad and grad contains attributes that apply to that specific type of student. Remember when the subtype is a specific type of supertype, then the subtype inherits all the attributs of the supertype. We use `StudentID` in order to link supertype to the subtypes.

We are using here the circular symbol

![Relationship](./images/sub-super-rel.png)

### Recursive Relationships

- It's possbile for an entity to have a (unary) relationship to itself - this is called a recursive relationship
- Recursion can be used to implement heirarchical relationships

In the example we need to remember that the managerId is the employeeId it just have a different key here in order to allows a specific type of relationship between employees. This types of relationships can be very useful for tracking e.g. customer referrals, another great use is to implement hierarchies

![One to One](./images/recursive.png)

Another example shows we have here an `employeeId: 1` we have the value of `managerId: null` it tells us that the employee 1 has no manager e.g. it's the CEO of the company. 

In the next layer of the hierarchy we see employees with a managerId 1, they all are direct reports of the CEO. In the next layer we see employees 5, 6 and they are all managed by the employee 3. 

![Example](./images/recursive-ex.png)


3. Implementation of database design: as a real world functioning database



# Database Lesson #5 of 8 - Database Design

## Transitioning from a Data model to a Database
* Create a table for each entity
    +  A table has a descriptive name and a set of attributes that together describe the entity
* Specify a primary key
* Specify column properties
    + Data type
    + Null status
    + Default values (if any)
    + Data constraints (if any)
* The relation is then analyzed using the normalization rules
* As normalization issues arise, the initial design may need to be modified

### Normalization Review: Modification Anomalies
* Tables that are not normalized are susceptible (anfällig) to experiencing modification anomalies
    + Insertion problems: Difficulties inserting data into a relation
    + Update problems: Difficulties modifying data in a relation
    + Deletion problems: Difficulties deleting data from a relation

**Note:** Most modification problems are solved by breaking an existing table into two or more tables through a process known as normalization.

### Normalization Review: Defintions
* Functional Dependency
    + The relationship (within a relation) that describes how the value of one attribute may be used to find the value of another attribute
* Determinant
    + An attribute that can be used to find the value of another attribute in the relation
* Candidate key
    + The value of the candidate key can be used to find the value of every other non-key attribute in the table
    + A simple candidate key consists of only one attribute
    + A composite candidate key consists of more than one attribute

### Normalization Review: Normalized Relations
* For our purpose, a relation is considered normalized when every derminant is a candiate key
    + Technically, this is Beyce-Codd Normal Form (BCNF)
        + Somiteimes called 3.5NF
        + Slightly more stringent than 3NF
* A database in 3NF (or above) is generally not susceptible to modification anomalies

![Normalization](./images/normalization-case-study.png)

### Denormalizaiton
* Normalizing relations (or breaking them apart into many component relations) may significantly increase complexity of the data structure
* The question is one of balance:
    + Trading complexity for modification problems and speed
        + Joining many tables together takes time, and therefore slows the query process (join operaton takes computational cycles and time to join the tables together and that extra effort slows down the query performance)
* There are many situations in which denormalized relations are preferrred
* The reasons for denormalization:
    + Simplicity of design
    + Speed of querying (increase in query performance by denormalizing the tables)
* The tradeoff we are introducing the possiblity of modification anomalies into our database
* Denormalization Benefits
    + Simplicity
    + Improved query performance
* Denormalization Costs
    + Modification anomalies
        - state example (Los Angeles, CA, los anageles, ca, Los Anageles, California)
    + Redundant data
    + More storage space is required

![Denormalized](./images/denormalized-set.png)

### Representing Relationships: 1:1 Relationships
* The maximum cardinality determines how a relationship is represented
* 1:1 relationship
    + The key from one relation is placed in the other as a foreign key
    + If both sides of the relationship are optional (if mimimum cardinality on both sides is ZERO), it does not matter which table receives the foreign key
    + If only one side of the relationship is optional (if one side of the relationship has a minimum cardinality of ZERO, while the other side of the relationship has a minimum cardinality of ONE), the optional side receives the foreign key

![1to1](./images/1to1-relationship.png)

**Note:** The minimum cardinality is ZERO on both sides. Therefore the foreign key can be placed either in the Employee or Locker tables. In the second example we have 1to1 binary relationship a patient has only one and one bed and bed can have zero or only one patient, you have to put the foreign key on in the table of the optional side. 


```sql
SELECT * 
FROM Locker L, Employee E
WHERE L.lockerId = E.lockerId; /* join by looking for matching values between those two table */

SELECT *
FROM Locker L, Employee E
WHERE L.epmloyeeId = E.employeeId;
```

### Representing Relationships: 1:N Relationships
* Like a 1:1 relationship, a 1:N relationship is implemented by placing the primary key from one table into another table as a foreign key
* However, in a 1:N the foreign key always goes into the **many side (N)** of the relationship
    + The 1 side is called the parent
    * The N side is called the child

![1:M](./images/1toM-relationship.png)


```sql
SELECT *
FROM Team T, Player P
WHERE T.teamId = P.teamId; /* A sequal query to join two tables together */
``` 

### Representing Relationships: N:M Relationships
* To implement a N:M relationship, a new table is created.
    + This table is called an intersection table or an associative entity
* An intersection table typically has a composite key comprised of the keys from each of the tables to which it is connected
    + A surrogate key may also be used, but this has important implications...

![N:M](./images/ntom-relationship1.png)

**Note:** The example above cannot be implemented in a real-world database. Instead we need to introduce a lookup table see in the example below

![Lookup](./images/lookup-table-example.png)

**Note:** The attributes involved in the primary key in the example above are serving two purposes: 1) they are part of the primary key for our intersection table (lookup table) and 2) when considered individually they are serving a foreign key links back to the parent table.

```sql
SELECT *
FROM Student S, Class C, Student_Class SC
WHERE S.SID = SC.SID AND SC.ClassNumber = C.ClassNumber;
``` 

![Associative](./images/association-relationship.png)

### Surrogate Keys and Associateive Entities
* When an associative entity uses a composite primary key composed of the primary keys of its parent tables, each possible matched pair of values can apper only one in the associative entity
* When an associative entity uses a surrogate key, however, each possible matched pair of values can appear many times in the associative entity. 

![Surrogate](./images/surrogate-associative.png)

### Representing Relatinships: Recursive Relationships
* A recursive relationship occurs when a table is related to itself
* Recursive relationships adhere to the same rules as binary relationships
    + 1:1 and 1:N recursive relationships are implemented using foreign keys
    + N:M recursive relationships are implemented by creating an intersection table


![Recursive](./images/recursive-relationship-examples.png)

**Note:** 
1. Example: Each person in the table is sponsored by zero to one other people
2. Example: One to many recursive relationship this is a referral relationship. Each customer might refer many other customers to us, but each customer is refered by a max. one other customer. This is 1:N recursive relationship
3. Example: N:M in which a doctor might treat many other doctors, while each doctor might be treated by many other doctors as well. This is conceptually a N:M recurisive relationship

# Database Lessons #6 of 8 - Database Administration

















