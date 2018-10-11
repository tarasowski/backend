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

* This means additional work is needed to ensure that you can monitor and track that the right things have happened. For example, would you know if the loyalty points bank had a bug and for some reason didn’t set up the correct account?

* One approach I like for dealing with this is to build a monitoring system that explicitly matches the view of the business process.

* In general, I have found that systems that tend more toward the choreographed approach are more loosely coupled, and are more flexible and amenable to change.

* Remote procedure call refers to the technique of making a local call and having it exe‐ cute on a remote service somewhere.

* Synchronous calls are simpler, and we get to know if things worked straightaway. If we like the semantics of request/ response but are dealing with longer-lived processes, we could just initiate asynchro‐ nous requests and wait for callbacks. On the other hand, asynchronous event collabo‐ ration helps us adopt a choreographed approach, which can yield significantly more decoupled services—something.

* To start with, let’s look at two technologies that fit well when we are considering request/response: remote procedure call (RPC) and REpresentational State Transfer (REST). Remote Procedure Calls Remote procedure call refers to the technique of making a local call and having it exe‐ cute on a remote service somewhere.

**Note:** The first of the fallacies of dis‐ tributed computing is “The network is reliable”. Networks aren’t reliable. They can and will fail, even if your client and the server you are speaking to are fine. They can fail fast, they can fail slow, and they can even malform your packets.

* If the server implementation removes age from its definition of this type, and we don’t do the same to all the consumers, then even though they never used the field, the code associated with deserializing the Customer object on the consumer side will break. To roll out this change, I would have to deploy both a new server and clients at the same time. This is a key challenge with any RPC mechanism.

* Just be aware of some of the potential pitfalls associated with RPC if you’re going to pick this model. Don’t abstract your remote calls to the point where the network is completely hidden, and ensure that you can evolve the server interface without hav‐ ing to insist on lock-step upgrades for clients.

* Make sure your clients aren’t oblivious to the fact that a network call is going to be made. Client libraries are often used in the context of RPC, and if not structured right they can be problematic.

* Compared to database integration, RPC is certainly an improvement when we think about options for request/response collaboration.

* There are many principles and constraints behind the REST style, but we are going to focus on those that really help us when we face integration challenges in a microservi‐ ces world, and when we’re looking for an alternative style to RPC for our service interfaces.

**Note:** Most important is the concept of resources. You can think of a resource as a thing that the service itself knows about, like a Customer. The server creates different repre‐ sentations of this Customer on request. How a resource is shown externally is completely decoupled from how it is stored internally. [Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)

* HTTP can be used to implement RPC too. SOAP, for example, gets routed over HTTP, but unfortunately uses very little of the specification. Verbs are ignored, as are simple things like HTTP error codes. All too often, it seems, the existing, wellunderstood standards and technology are ignored in favor of new standards that can only be implemented using brand-new technology—conveniently provided by the same companies that help design the new standards in the first place!

* Personally, I am a fan of using links to allow consumers to navigate API endpoints. The benefits of progressive discovery of the API and reduced coupling can be signifi‐ cant.

* We can send pretty much anything over HTTP if we want, even binary. I am seeing more and more people just using HTML as a format instead of XML

* How we decide to store our data, and how we expose it to our consumers, can easily dominate our thinking. One pattern I saw used effectively by one of our teams was to delay the implementation of proper persistence for the microservice, until the interface had stabilized enough. For an interim period, entities were just persisted in a file on local disk, which is obviously not a suitable long-term solution. This ensured that how the consumers wanted to use the service drove the design and implementation decisions.

* Downsides to REST Over HTTP In terms of ease of consumption, you cannot easily generate a client stub for your REST over HTTP application protocol like you can with RPC.

* HTTP, while it can be suited well to large volumes of traffic, isn’t great for low-latency communications when compared to alternative protocols that are built on top of Transmission Control Protocol (TCP) or other networking technology.

**Note:** Despite the name, WebSockets, for example, has very little to do with the Web. After the initial HTTP handshake, it’s just a TCP connection between client and server, but it can be a much more efficient way for you to stream data for a browser. If this is something you’re interested in, note that you aren’t really using much of HTTP, let alone any‐ thing to do with REST.

* For server-to-server communications, if extremely low latency or small message size is important, HTTP communications in general may not be a good idea. You may need to pick different underlying protocols, like User Datagram Protocol (UDP), to achieve the performance you want, and many RPC frameworks will quite happily run on top of networking protocols other than TCP.

* What about event-based, asynchronous communication? Technology Choices There are two main parts we need to consider here: a way for our microservices to emit events, and a way for our consumers to find out those events have happened.

* Traditionally, message brokers like RabbitMQ try to handle both problems. Produc‐ ers use an API to publish an event to the broker. The broker handles subscriptions. 

**Important:** Keep your middleware dumb, and keep the smarts in the endpoints.

* Do be wary, though, about the world of middleware, of which the message broker is just a small part.

* HTTP is not good at low latency (where some message brokers excel), and we still need to deal with the fact that the consumers need to keep track of what messages they have seen and manage their own polling schedule.

* If you already have a good, resilient message broker available to you, consider using it to handle publishing and subscribing to events. But if you don’t already have one, give ATOM a look, but be aware of the sunk-cost fallacy.

* In terms of what we actually send over these asynchronous protocols, the same con‐ siderations apply as with synchronous communication. If you are currently happy with encoding requests and responses using JSON, stick with it.

> Eventually, we tracked down the problem. A bug had crept in whereby a certain type of pricing request would cause a worker to crash. We were using a transacted queue: as the worker died, its lock on the request timed out, and the pricing request was put back on the queue—only for another worker to pick it up and die. This was a classic example of what Martin Fowler calls a catastrophic failover. Aside from the bug itself, we’d failed to specify a maximum retry limit for the job on the queue. We fixed the bug itself, and also configured a maximum retry. But we also realized we needed a way to view, and potentially replay, these bad messages. We ended up having to implement a message hospital (or dead letter queue), where mes‐ sages got sent if they failed.

* The associated complexity with event-driven architectures and asynchronous pro‐ gramming in general leads me to believe that you should be cautious in how eagerly you start adopting these ideas. Ensure you have good monitoring in place, and strongly consider the use of correlation IDs, which allow you to trace requests across process boundaries.

* The service as a state machine is powerful. We’ve spoken before (probably ad nauseum by this point) about our services being fash‐ ioned around bounded contexts. Our customer microservice owns all logic associated with behavior in this context.

**Note:** We want to avoid dumb, anemic services that are little more than CRUD wrappers.

* If the decision about what changes are allowed to be made to a cus‐ tomer leak out of the customer service itself, we are losing cohesion.

* Rx inverts traditional flows. Rather than asking for some data, then performing operations on it, you observe the outcome of an operation (or set of operations) and react when something changes. As you find yourself making more service calls, especailly when making multiple calls to perform a single operation, take a look at the reactive extensions for your chosen technology stack. You may be surprised how much simpler your life can become.

* Having lots of lines of code that do the same thing makes your codebase larger than needed, and therefore harder to reason about.

* When you want to change behavior, and that behavior is duplicated in many parts of your system, it is easy to forget everywhere you need to make a change, which can lead to bugs.

* DRY is what leads us to create code that can be reused. We pull duplicated code into abstractions that we can then call from multiple places. Perhaps we go as far as mak‐ ing a shared library that we can use everywhere!

* One of the things we want to avoid at all costs is overly coupling a microservice and consumers such that any small change to the microservice itself can cause unneces‐ sary changes to the consumer. Sometimes, however, the use of shared code can create this very coupling.

* If your use of shared code ever leaks outside your service boundary, you have intro‐ duced a potential form of coupling. Using common code like logging libraries is fine, as they are internal concepts that are invisible to the outside world.

* My general rule of thumb: don’t violate DRY within a microservice, but be relaxed about violating DRY across all services.

* The evils of too much coupling between serv‐ ices are far worse than the problems caused by code duplication.

* A model for client libraries I like is the one for Amazon Web Services (AWS). The underlying SOAP or REST web service calls can be made directly, but everyone ends up using just one of the various software development kits (SDKs) that exist, which provide abstractions over the underlying API.

* One consideration I want to touch on is how we pass around information about our domain entities. We need to embrace the idea that a microservice will encompass the lifecycle of our core domain entities, like the Customer.

* When we retrieve a given Customer resource from the customer service, we get to see what that resource looked like when we made the request.

* So whether you decide to pass around a memory of what an entity once looked like, make sure you also include a reference to the original resource so that the new state can be retrieved.

* Let’s consider the example where we ask the email service to send an email when an order has been shipped. Now we could send in the request to the email service with the customer’s email address, name, and order details. However, if the email service is actually queuing up these requests, or pulling them from a queue, things could change in the meantime. It might make more sense to just send a URI for the Customer and Order resources, and let the email server go look them up when it is time to send the email.

* Great counterpoint to this emerges when we consider event-based collaboration. With events, we’re saying this happened, but we need to know what happened. If we’re receiving updates due to a Customer resource changing, for example, it could be val‐ uable to us to know what the Customer looked like when the event occurred. As long as we also get a reference to the entity itself so we can look up its current state, then we can get the best of both worlds.

* There are other trade-offs to be made here, of course, when we’re accessing by refer‐ ence. If we always go to the customer service to look at the information associated with a given Customer, the load on the customer service can be too great. If we pro‐ vide additional information when the resource is retrieved, letting us know at what time the resource was in the given state and perhaps how long we can consider this information to be fresh, then we can do a lot with caching to reduce load.

**Note:** Defer It for as Long as Possible The best way to reduce the impact of making breaking changes is to avoid making them in the first place.

* Database integration is a great example of technology that can make it very hard to avoid breaking changes. REST, on the other hand, helps because changes to internal implementation detail are less likely to result in a change to the service interface.

*“Be conservative in what you do, be liberal in what you accept from others.”*

* “Be conservative in what you do, be liberal in what you accept from others.” The orig‐ inal context for this piece of wisdom was the interaction of devices over networks, where you should expect all sorts of odd things to happen. In the context of our request/response interaction, it can lead us to try our best to allow the service being consumed to change without requiring us to change.

* **Semantic Versioning:** Wouldn’t it be great if as a client you could look just at the version number of a ser‐ vice and know if you can integrate with it? Semantic versioning is a specification that allows just that. With semantic versioning, each version number is in the form MAJOR.MINOR.PATCH. When the MAJOR number increments, it means that backward incompatible changes have been made. When MINOR increments, new functionality has been added that should be backward compatible. Finally, a change to PATCH states that bug fixes have been made to existing functionality.

* **Coexist Different Endpoints:** If we’ve done all we can to avoid introducing a breaking interface change, our next job is to limit the impact. The thing we want to avoid is forcing consumers to upgrade in lock-step with us, as we always want to maintain the ability to release microservi‐ ces independently of each other. One approach I have used successfully to handle this is to coexist both the old and new interfaces in the same running service. So if we want to release a breaking change, we deploy a new version of the service that exposes both the old and new versions of the endpoint.

![End](./images/endpoints.png)

![Endv](./images/versions-endpoints.png)

* Keeping all the code around and the associated testing required to ensure they all worked was absolutely an additional burden. To make this more manageable, we internally transformed all requests to the V1 end‐ point to a V2 request, and then V2 requests to the V3 endpoint. This meant we could clearly delineate what code was going to be retired when the old endpoint(s) died. This is in effect an example of the expand and **contract pattern.** For systems making use of HTTP, I have seen this done with both version numbers in request headers and also in the URI itself—for example, /v1/ customer/ or /v2/customer/.

* Coexisting concurrent service versions for a short period of time can make perfect sense, especially when you’re doing things like blue/green deployments or canary releases.

* We started thinking of our UIs as being thin instead, with more logic on the server side. In the beginning, our server-side programs rendered the entire page and sent it to the client browser, which did very little. Any interactions were handled on the server side, via GETs and POSTs triggered by the user clicking on links or filling in forms. Over time, JavaScript became a more popular option to add dynamic behavior to the browser-based UI, and some applications could now be argued to be as fat as the old desktop clients.

* Assuming that our services already speak XML or JSON to each other via HTTP, an obvious option available to us is to have our user interface interact directly with these APIs, as in Figure 4-7.

![ApiUI](./images/api-user-interface.png)

* Rather than having our UI make API calls and map everything back to UI controls, we could have our services provide parts of the UI directly, and then just pull these fragments in to create a UI.

![Assembly](./images/assembly.png)

* These coarser-grained fragments are served up from server-side apps that are in turn making the appropriate API calls. This model works best when the fragments align well to team ownership. For example, perhaps the team that looks after order man‐ agement in the music shop serves up all the pages associated with order management.

* Backends for Frontends A common solution to the problem of chatty interfaces with backend services, or the need to vary content for different types of devices, is to have a server-side aggregation endpoint, or API gateway. This can marshal multiple backend calls, vary and aggre‐ gate content if needed for different devices, and serve it up, as we see in Figure 4-9. I’ve seen this approach lead to disaster when these server-side endpoints become thick layers with too much behavior.

![Gateway](./images/single-gateway.png)

* Figure 4-9. Using a single monolithic gateway to handle calls to/from UIs The problem that can occur is that normally we’ll have one giant layer for all our services. This leads to everything being thrown in together, and suddenly we start to lose isolation of our various user interfaces, limiting our ability to release them inde‐ pendently. A model I prefer and that I’ve seen work well is to restrict the use of these backends to one specific user interface or application, as we see in Figure 4-10.

![Bff](./images/bff.png)

* This pattern is sometimes referred to as backends for frontends (BFFs). It allows the team focusing on any given UI to also handle its own server-side components.
