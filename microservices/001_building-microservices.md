# Building Microservices
## Designing Fine-Grained Systemsf

[Source](http://shop.oreilly.com/product/0636920033158.do)

* When services are loosely coupled, a change to one service should not require a change to another. The whole point of a microservice is being able to make a change to one service and deploy it, without needing to change any other part of the system. This is really quite important.

* A loosely coupled service knows as little as it needs to about the services with which it collaborates. This also means we probably want to limit the number of different types of calls from one service to another, because beyond the potential performance prob‐ lem, chatty communication can lead to tight coupling.

* **High Cohesion:** We want related behavior to sit together, and unrelated behavior to sit elsewhere. Why? Well, if we want to change behavior, we want to be able to change it in one place, and release that change as soon as possible. If we have to change that behavior in lots of different places, we’ll have to release lots of different services (perhaps at the same time) to deliver that change. Making changes in lots of different places is slower, and deploying lots of services at once is risky—both of which we want to avoid.

* **Loose Coupling** When services are loosely coupled, a change to one service should not require a change to another. The whole point of a microservice is being able to make a change to one service and deploy it, without needing to change any other part of the system. This is really quite important.

* A loosely coupled service knows as little as it needs to about the services with which it collaborates. This also means we probably want to limit the number of different types of calls from one service to another, because beyond the potential performance prob‐ lem, chatty communication can lead to tight coupling.

* By thinking clearly about what models should be shared, and not sharing our internal representations, we avoid one of the potential pitfalls that can result in tight coupling (the opposite of what we want).

**Important:** Premature Decomposition At ThoughtWorks, we ourselves experienced the challenges of splitting out microser‐ vices too quickly. Prematurely decomposing a system into microservices can be costly, especially if you are new to the domain. In many ways, having an exist‐ ing codebase you want to decompose into microservices is much easier than trying to go to microservices from the beginning.

* After a few months, though, it became clear that the use cases of SnapCI were subtly different enough that the initial take on the service boundaries wasn’t quite right. This led to lots of changes being made across services, and an associated high cost of change. Eventually the team merged the services back into one monolithic system, giving them time to better understand where the boundaries should exist.

* At the start, you will probably identify a number of coarse-grained bounded contexts. But these bounded contexts can in turn contain further bounded contexts. For exam‐ ple, you could decompose the warehouse into capabilities associated with order ful‐ fillment, inventory management, or goods receiving. When considering the boundaries of your microservices, first think in terms of the larger, coarser-grained contexts, and then subdivide along these nested contexts when you’re looking for the benefits of splitting out these seams.

* The changes we implement to our system are often about changes the business wants to make to how the system behaves. We are changing functionality—capabilities— that are exposed to our customers. If our systems are decomposed along the bounded contexts that represent our domain, the changes we want to make are more likely to be isolated to one, single microservice boundary. This reduces the number of places we need to make a change, and allows us to deploy that change quickly.

**Important:** Getting integration right is the single most important aspect of the technology associ‐ ated with microservices in my opinion.

* I think it is very important to ensure that you keep the APIs used for communication between microservices technology-agnostic. This means avoiding integration technology that dictates what technology stacks we can use to implement our microservices.

* We don’t want our consumers to be bound to our internal implementation. This leads to increased coupling. This means that if we want to change something inside our microservice, we can break our consumers by requiring them to also change.

* So any technology that pushes us to expose internal is BAD!

* The Shared Database By far the most common form of integration that I or any of my colleagues see in the industry is database (DB) integration. In this world, if other services want informa‐ tion from a service, they reach into the database. And if they want to change it, they reach into the database!

![DB](./images/everyone-db.png)

* The DB is effectively a very large, shared API that is also quite brittle. If I want to change the logic associated with, say, how the helpdesk manages customers and this requires a change to the database, I have to be extremely careful that I don’t break parts of the schema used by other services.

* Second, my consumers are tied to a specific technology choice. Perhaps right now it makes sense to store customers in a relational database, so my consumers use an appropriate (potentially DB-specific) driver to talk to it. What if over time we realize we would be better off storing data in a nonrelational database? Can it make that decision? So consumers are intimately tied to the implementation of the customer service.

* Finally, let’s think about behavior for a moment. There is going to be logic associated with how a customer is changed. Where is that logic? If consumers are directly manipulating the DB, then they have to own the associated logic. The logic to per‐ form the same sorts of manipulation to a customer may now be spread among multi‐ ple consumers. If the warehouse, registration UI, and call center UI all need to edit customer information, I need to fix a bug or change the behavior in three different places, and deploy those changes too.

**Note:** One of the most important decisions we can make in terms of how services collaborate. Should communication be synchronous or asynchronous? This funda‐ mental choice inevitably guides us toward certain implementation detail.

* There are two different modes of communication that enable two different idiomatic styles of collaboration: request/response or event-based. With request/response, a cli‐ ent initiates a request and waits for the response.

* With an event-based collaboration, we invert things. Instead of a client initiating requests asking for things to be done, it instead says this thing happened and expects other parties to know what to do. We never tell anyone else what to do. Event-based systems by their nature are asynchronous. The smarts are more evenly distributed— that is, the business logic is not centralized into core brains, but instead pushed out more evenly to the various collaborators.

* Event-based collaboration is also highly decoupled. The client that emits an event doesn’t have any way of knowing who or what will react to it, which also means that you can add new subscribers to these events without the client ever needing to know.

* With orchestration, we rely on a central brain to guide and drive the process, much like the conductor in an orchestra. With choreography, we inform each part of the system of its job, and let it work out the details, like dancers all find‐ ing their way and reacting to others around them in a ballet.

* An orchestration solution would look like for this flow. Here, probably the simplest thing to do would be to have our customer service act as the central brain. On creation, it talks to the loyalty points bank, email service, and postal service.

![Orch](./images/orchestration.png)

* With a choreographed approach, we could instead just have the customer service emit an event in an asynchronous manner, saying Customer created. The email ser‐ vice, postal service, and loyalty points bank then just subscribe to these events and react accordingly.

![Chor](./images/choreography.png)


