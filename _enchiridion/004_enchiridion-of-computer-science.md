# Enchiridion of Computer Science

* Programs usually work with data in (at least) two different representations: In memory, data is kept in objects, structs, lists, arrays, hash tables, trees, and so on. These data structures are optimized for efficient access and manipulation by the CPU (typically using pointers). When you want to write data to a file or send it over the network, you have to encode it as some kind of self-contained sequence of bytes (for example, a JSON document). Since a pointer wouldn’t make sense to any other process, this sequence-of-bytes representation looks quite different from the data structures that are normally used in memory. Thus, we need some kind of translation between the two representations. The translation from the in-memory representation to a byte sequence is called encoding (also known as serialization or marshalling), and the reverse is called decoding (parsing, deserialization, unmarshalling).

* When you have processes that need to communicate over a network, there are a few different ways of arranging that communication:

    * Databases, where the process writing to the database encodes the data and the process reading from the database decodes.

    * RPC and REST APIs, where the client encodes a request, the server decodes the request and encodes a response, and the client finally decodes the response

    * Asynchronous message passing (using message brokers or actors), where nodes communicate by sending each other messages that are encoded by the sender and decoded by the recipient

## References & Tutorials
——-
[Designing Data-Intensive Applications](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321)

