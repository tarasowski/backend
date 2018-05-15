# Contact and Data Flow Diagrams

[Context Diagrams Overview](https://www.youtube.com/watch?v=fWNrc6GNK14&index=3&list=PLyH7UFQzuDWcV5HmE8ucXVqb1YpfcPOwk)

## Context Diagrams

A diagram used to give an overview of an entire system. In a context diagram there is only once cirlce/ process that represents the entie system. The purpose of this diagram is to display the expecting inputs and outputs from the system to and from varioous external entities. Though this display a system analyst can model what expected data is going to go into the system, then after it has been processed by the system what information will be returning to the external entities.

* There is one external entity
* There is one single process / system in the context diagram
* The flow line represents what data goes into the system
* Another flow line usually returning to the external entity of the process information that they are receiving from the system

![Basic](./images/basic-context-diagram.png)

### Shapes used in Context Diagrams

* External Entity: An eelement that inputs data into an information system and or retrieves data from the information system (receiving/sending).

* Process: When an action takes place on data, turning it into information. In the case of a Context Diagram there is only 1 Process that represents the entire System.

* Flow Line: Illustrate the movevemtn of data from one entity / process to another. A data Flow line is supported by text stating what data is being sent / retrieved

![Shape](./images/shapes-context-diagram.png)

### Context Diagram Example

![Context](./images/context-diagram-example.png)


---

## Data Flow Diagram (DFD)
Data flow diagrams are also used to model information systems. They provide greater detail than a context diagram as they display each process involved within the information system as an individual circle, meaning the end result will contain multiple circles / processes. A DFD also has a shape for data sotres to represent where data is sent and retrieved from, such as a specific database. Data sotres are represented as a three sided rectangle shape.

![DFD Example](./images/dfd-example.png)


### Shapes used in Data Flow diagrams

* External Entity: An element that inputs data into an information system and or retrieves data from the information system (person, user, individual or something external to the system)

* Process: When an action takes place on data, potentially one of the information processes. A DFD contains multiple processes, each manipulating the data in their own way.

* Flow line: Illustrates the movement of data from one entity / process to another. A Data Flow line is supported by text stating what data is being sent / retrieved. (line itself is labeled with the data the information being sent / received)

* Data Store: A location where data is saved to or retrieved from, such as a database

![Shapes DFD](./images/dfd-shapes.png)

### Data Flow Diagram Example

1. Here is our user that is putting number 1 and number 2 into the system, the system first records these numbers as variables
2. Once the numbers have been recored they have been stored in the memory of the calculator
3. The next step we want to say which calculation the user wants to use, one again this needs to be recorded in the memory. Now we have the numbers and the calculation stored in the memory
4. Now we have this information, number 1, number 2 and calculation type can be used in another process called perform calculation
5. The system now needs to show result to the user, display result and they essentially view the result.

![Example](./images/dfd-example-calculator.png)

---

## Examples Context & Data Flow Diagrams

[Context & Data Flow Diagrams Sample 1: YouTube](https://www.youtube.com/watch?v=hiMeEswjWuk)