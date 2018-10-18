# Build Your First Big Data Application on AWS

Source: Amazon Pop Up Loft Event 2018 by Stefan Hausmann AWS

* Kinesis stream is used to decouple the consumers from producers. It's similar the idea from data lake where you separate the compute from storage.

* Kinesis Analytics can pick up the data and analyse it. Even if Kinesis Analytics will fail, the data will be still injected into the Kinesis stream

* Kinesis stream is scaled by shards, each single shard can intake 1.000 events/sec and 1mb/sec. By adding more shards we can scale the throughput.

* With Kinesis Analytics you can run SQL queries on top of the data from Kinesis stream.

* On the Kinesis Analytics you need to turn on the schema, since you want to query the data with SQL (there is a schema builder). You can simply use the tool to create a schema for querying

* In-application stream is internal to the application, no other external application can read from this stream. In-application stream is just a schema that is used by the application. A common SQL.

* Pumps, take the SQL statement takes as input SQL and continiously evaluates this query agains the SQL statement.

1) You start with creating the shards / Kinesis stream first
2) Once the shard is established you can inject into this shard (he is replying the data from a open source of AWS)
3) Then you start to create Data Analytics application. You connect the datasource (Kinesis Stream)
4) Now you start a Kinesis Analytics application (formulating your queries to analyse the data). SQL queries on top of the straming data from Kinesis Streams.
5) You can clean the data, so the noise gets filtered out from the stream. You can use different methods to filter the data, re-run queries
6) Now you can connect to a destination (where to send the output of the Kinesis Analytics).  Lambda or another Kinesis Stream. Use another Kinesis Stream
7) After this step the data in the new stream gets populated with the data from the Kinesis Analytics.
8) 

This is an example architecture for Kinesis Stream & Analytics
![Example](https://image.slidesharecdn.com/bdm304-161217191656/95/aws-reinvent-2016-analyzing-streaming-data-in-realtime-with-amazon-kinesis-analytics-bdm304-25-638.jpg?cb=1482002262)
