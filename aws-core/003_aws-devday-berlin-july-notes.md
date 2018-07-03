# AWS Dev Day Notes (dirty version)

- The main drawback of SOA (service oriented architecture) is the enterprise service bus, because you put the logic that glues the data togheter in enterprise service bus.

- so there are different layers like presentation, logic an data, oyu need to glue the data togther (kind a aggregates)

- Microservices in comparison they deliver some value by themselves without involving other 3rd party systems.

- Microservices logic lives inside of single service domain (deliver value without any dependencies)

- Microservices are oriented around capabilities, they help to satisfy specific business capability. You are offering a reasonbale stabile capaobility

Microservice Challenges
- Distributed computing is hard
- Transactions
	+ Multiple Database across multiple services
- Eventuell consistency
	+ There is no one service that have the whole overview of a state
	+ We constantly changing states
- Lots of moving parts
- Service discovery
- Increate coordination
- Increase message routing

(See white paper from AWS - Microservices on AWS)

- Application state is the understanding of the whole application like amazon.com. Where to maintain the state and user journey, we need to push it to the ages. 

- The microservices are sponsbile for the resource state, for their own state

- Services communicate via APIs. There is no other way to use the microservices.

- Licencing costs are the biggest costs for an organisation, that’s why they force people to use specific stack e.g. oracle

- Polyglot persistence for microservices
	+ Decompose Databases
	+ Database per microservice pattern

- Allows easy use of Canary and Blue-Green deployment

- DynamoDB stream @Amazon are queues, the yuse streams for queues in order to communicate between different microservices and state changes

- If the team grows that you cannot feed with too pizzas, it’s probably too big. But it’s not precise rule it’s more rule of thumb, but not a strict rule

- Two pizza#s teams at Amazon are called “service teams” and they have plans only for couple of quarters, so thereare no strategic 3 years plans

- Keep it simple, do lot’s of logging and try to diagnose. You build it, you run it @Amazon.

- Antipattern: if you have different microsevices that are connected to the same database (monolitic data store)

- Polyglog persistence, Each service chooses it’s data store technology. Low impact schema changes, Independent scalability, Data is gated thorughe service API. We do that because each of the services can grow and scale in it’s own way.

- The biggest challenge is TRANSACTIONAL INTEGRITY!! Because no one service has universal view about the application state

- Polyglo persistence generally translate sinto eventueal consistency

- Asynchronous calls allow non-blocking, but returns need to be handled properly

- How about transactional inegrity?
	+ EVENT SOURCING - CAPTURING CHANGES AS SEQUENCE OF EVENTS
	+ STAGED COMMIT
	+ ROLLBACK ON FAILURE

- In order we can recover and diagnose the issues. USE CORRELATION IDs (see Yan Cui’s Serverless on Manning) We can recover from issues by tracing/traversing a path by correclation Id’s.

- You can use DynaoDb streams in order to communicate between services that need the data.

- Use Cloudwatch Events to trigger Lambda to invalide the cache and bring up the latest version of the state

- Don’t use composite data service (a service that goes directly to each service and tries to get the data from each individual service) - It’s an anti-pattern. Use instead Pub/Sub, Pull model or Push model.

===========/******* Scaling your apps with AWS relational databases

- Aurora looks from the outside like MySQL or Postgress but under the hood it’s completely differnt, they try to make Aurora equal to commercial databases

- You can use the migration service the schema-migration tool, it helps to automate schema conversions and everything alse needed to migrate from one database to another

- If you want to connect to Aurora via IAM, it has a limitation to 20 connections per second.

- If you write to aurora it’s written to 6 nodes. It’s scalable horizontally. Read replicase have the same state and can be scaled out and if some instance fails, they have all the same data. Because data is stored on the same underline storage

- Amazon Aurora is fast:
	+ 5x more throughput than MySQL
	+ 3x more throughput then Postgress

=================DynamoDb

- If the data is not in LSI it do fetching, means it fetches the data from the original table


Todo:
[ ] - upload pictures

