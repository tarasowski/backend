# Introduction to JSON

* Programs usually work with data in (at least) two different representations:

1. In memory, data is kept in objects, structs, lists, arrays, hash tables, trees, and so on. These data structures are optimized for efficient access and manitpualtion by the CPU (typically using pointers)

2. When you want to write data to a file or send it over the network, you have to encode it as some kind of self-contained sequence of bytes (a group of binary digits or bits (usually eight) operated on as a unit.) For example, a JSON document. Since a pointer wouldn't make sense to any other process, this sequence-of-bytes representation looks quite diffferent from the data structures that are normally used in memory. 

**Thus, we need some kind of translation between the two representations. The translation from the in-memory representation to a byte sequence is called encoding (aslo kows as serilaization or marshalling), and the reverse is called decoding (parsing, deserialization, unmarshalling)**

* That’s the idea of JSON. Instead of understanding how any of the programming languages work, there is a common “language” solely used for communication.

* You are now able to learn only one programming language, in addition to the communications language, JSON, in order to communicate with ANY other programming language.

* JSON is basically a way of communicating data to someone, with very, very specific rules.

* Many programming languages come with built-in support for encoding in-memory objects into bytes sequences. A byte sequence is a mutable data structure that contains a fixed-length sequence of bytes. Each byte can be indexed in constant time for reading or writing. These encoding libraries are very convenient, because they allow in-memory objects to be saved and restored with minimal additional code. However they also have a number of deep problems:

1. The encoding is often tied to a particular programming language
2. In order to resore data in the same object types, the decoding process needs to be alble to instantiate arbitrary classes. This is frequently a source of security problems
3. Versioning data is often an afterthrought in these libraries (compatibility problems)
4. Efficiency (CPU time taken to encode or decode, and the size of the encoded structure) is also often an afterhtought

**For these reasons it's generally a bdad idea to use your language's built-in encoding for anything other than very transient purposes.**

## Workflow how it works

1. We have a data structure in-memory
2. Encode this data structure into sequence of bytes
3. The sequence of bytes is machine and human readable
4. The sequence of bytes can be written to disk or transfered over the network
5. Decode the sequence of bytes into the same in-memory data structure

* Moving to standardized encodings that can be written and read by many programming languages, JSON and XML are the obvious contenders. They are widely known, widely supported. JSON's popularity is mainly due to its built-in support in web browsers (by virue of being a subset of JavaScript). CSV is another popular language-independent format, albeit less powerful. 

* JSON, XML, and CSV are textual formats, and thus somewhat human-readable.

* An ordered list of values. In various programming languages, it is called as array, vector, list, or sequence. Since data structure supported by JSON is also supported by most of the modern programming languages, it makes JSON a very useful data-interchange format. [Source](https://www.w3resource.com/JSON/structures.php)

* In computer science, a data structure is a data organization and storage format that enables efficient access and modification. [Source](https://en.wikipedia.org/wiki/Data_structure)

* In computer science and computer programming, a data type or simply type is a classification of data which tells the compiler or interpreter how the programmer intends to use the data. Most programming languages support various types of data, for example: real, integer or Boolean. [Source](https://en.wikipedia.org/wiki/Data_type)

* A data structure is a way of describing a certain way to organize peices of data so that operations and alogrithms can be more easily applied.  For example tree type datastructures often allow for efficient searching algorithms. A data type describes peices of data that all share a common property. For example an integer data type describes every integer that the computer can handle. 

* In JS, there are six primitive data types:
- Boolean
- Number
- String
- Null: Null has one value: null. It is explicitly nothing. (not known)
- Undefined: A variable that has no value is undefined.
- Symbol

* In JS, there are two complex data types:
- Objects
- Functions

* Here is a full list of [data structures](https://en.wikipedia.org/wiki/List_of_data_structures)