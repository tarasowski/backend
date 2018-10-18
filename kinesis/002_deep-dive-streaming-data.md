# Deep Dive into Concepts and Tools for Analyzing Streaming Data

Source: Steffen Hausmann Amazon Pop Up Loft Event

* How streams and batch are different?

* We are moving towards realtime streaming data and moving away from batching data.

* Data is emitted in continious fashion.

* The data is analysed today, people dump the data into a data lake and then analyse the data in batch fashion. 

* Insights are perishable, the value of insights deminishes overtime.

![Pic](https://d1.awsstatic.com/diagrams/product-page-diagrams/diagram-how-it-works-kinesis-data-streams.249630c459ffe210d013ad06a0f6899ebea1304b.png)

* Decople the storage from the computation, so you can build computation in parallel

* There is no huge adoption of analyses of streaming data. He wrote Phd 10 years ago about streaming data, we are still sitting here and companies haven't adopted it.

* People struggle to implement this streaming process

* Challenges of stream processing: (relations = batch processing)
- Stream are conceptually infinite, the data is only arriving over time and there is no relation possible. It's a major difference that affects the way we can query the data. A relation of the data in database is complete, in stream the data is incomplete.
- In relations you query a traditional database, because the data is fixed. In stream a database is turned upside down, you determine the queris upfront and queries are fixed you then run your streaming data through your queries.
- In streams we have an incomplete view of the streams, because they are infinite. When you run a query on a stream there are many challenges. In streams we need continiously to evaluate the query `SELECT * FROM S WHERE color = 'black`, since the data is arriving over time, there is no fixed data in the database. The same applies to joining the data `SELECT * FROM S JOIN T`, by doing so we can run e.g. out of storage if we want to JOIN data. This query is more challenging `SELCT color, COUNT(1) FROM S GROUP BY color` at any point in time there is no final answer, because the events arrive in realtime.

> There is only two hard problems in distributed systems: 1. Guaranteed order of messages 2. Exactly-once delivery

* You can analyse the streaming data with Kinesis Analytics by running SQL queries on top of streaming data. Another framework is [Apache Flink](https://flink.apache.org/).
