# The C4 model for software architecture

[Source](https://c4model.com/)

## Level 1: System Context diagram

A System Context diagram is a good starting point for diagramming and documenting a software system, allowing you to step back and see the big picture. Draw a diagram showing your system as a box in the centre, surrounded by its users and the other systems that it interacts with.

![Pic](https://c4model.com/img/bigbankplc-SystemContext.png)

## Level 2: Container diagram

Once you understand how your system fits in to the overall IT environment, a really useful next step is to zoom-in to the system boundary with a Container diagram. A "container" is something like a server-side web application, single-page application, desktop application, mobile app, database schema, file system, etc. Essentially, a container is a separately runnable/deployable unit (e.g. a separate process space) that executes code or stores data.

![Pic](https://c4model.com/img/bigbankplc-Containers.png)

## Level 3: Component diagram

Next you can zoom in and decompose each container further to identify the major structural building blocks and their interactions. The Component diagram shows how a container is made up of a number of "components", what each of those components are, their responsibilities and the technology/implementation details.

![Pic](https://c4model.com/img/bigbankplc-Components.png)

## Level 4: Code

Finally, you can zoom in to each component to show how it is implemented as code; using UML class diagrams, entity relationship diagrams or similar. This is an optional level of detail and is often available on-demand from tooling such as IDEs. Ideally this diagram would be automatically generated using tooling (e.g. an IDE or UML modelling tool), and you should consider showing only those attributes and methods that allow you to tell the story that you want to tell. This level of detail is not recommended for anything but the most important or complex components.

![Pic](https://c4model.com/img/bigbankplc-Classes.png)


---

Note: Although the C4 model is an abstraction-first approach and notation independent, you still need to ensure that your diagram notation makes sense, and that the diagrams are comprehensible. A good way to think about this is to ask yourself whether each diagram can stand alone, and be (mostly) understood without a narrative. You can use this short [software architecture diagram review checklist](https://c4model.com/assets/software-architecture-diagram-review-checklist.pdf) to help.

