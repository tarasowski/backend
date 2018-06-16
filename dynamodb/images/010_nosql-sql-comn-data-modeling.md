# NoSQL and SQL Data Modeling: Bringing Together Data, Semantics, and Software

[NoSQL and SQL Data Modeling: Bringing Together Data](https://www.amazon.com/NoSQL-SQL-Data-Modeling-Semantics/dp/1634621093)

* Developing a data model is just like developing a blueprint for a building.

* You might be surprised to find that the most difficult problems to solve in database design are logical and not physical.

* **Thing:** a separate and distinct individual quality, fact, idea, or usually entity

* **Components:** This inductive definition reflects the reality that all objects, except the elementary particles, are built from other, simpler objects. We say that they are composite objects, composed of other objects called components.

* The interesting thing about widely shared concepts is that, unlike objects, they have no place or time:

* We therefore treat the number one, and similar shared concepts, as if they have no time or place, and if we are wise we recognize that the names of concepts are just symbols that are quite separate from the concepts they represent.

* In summary, then, **an entity** is a thing that exists either objectively or conceptually. An object is an objective entity that is either an elementary particle of matter or is composed of other objects in relatively fixed spatial relationships. A conceptual entity is a concept; essentially, an idea.

* **An object** (whose existence can be objectively verified) or a concept (whose existence is merely as an idea). 

* The word object will also be used in exactly the sense of the definition quoted above, to mean a material entity, in contrast to concept, which is a conceptual entity.

* The word “entity” is the technical term for “thing”. Entities come in two flavors, conceptual and objective. Objective entities include material things called objects. All objects, except the elementary particles, are composed of other objects. Conceptual entities are concepts or ideas. Unlike objects, widely shared concepts have no time or place.

> All material objects, except the elementary particles, are composed of other material objects.

* **Container & Contents:** Each egg is an object—a material thing—and the carton is an object, but they are different kinds of objects. The carton was specially designed to hold up to twelve eggs. The carton is a container and the eggs are its contents. When I brought the carton home it was full. As soon as I took the first egg out of the carton it was no longer full. Once I took the last egg out of the carton it was empty. So the state of the container—full, partially full, empty—varied over the course of the week. 

* In general, a container is designed so that contents can easily be added and removed. These operations change the state of the container, but do not change its composition—that is, what it is made of.

* Unlike the egg carton, the cake is **composed** of eggs, and flour and milk and sugar and other ingredients, blended together.

* Remember that an object is composed of other objects in some kind of relatively static spatial relationship. Certainly a cake is an object, because it is composed of eggs, milk, flour, sugar, and other objects in a relatively static spatial relationship: they are all blended together and will remain that way until the cake is consumed.

* Now let’s think about a frosted cake. Frosting is applied to the top of the cake and between the layers. This isn’t quite blending, because the integrity of the cake and the frosting is still preserved. You can still see the difference between them, though it would be difficult to separate them once again. This kind of object composition is called **aggregation**. An object is formed from other objects in a way that the components keep their integrity, but it would be difficult to extract the components after they’ve been joined together.

* For those who are familiar with dimensional modeling, please note that what is called aggregation in that discipline is blending in ordinary English and in COMN.

* In contrast to aggregation, we can have assembly. This is a mode of composition where components retain their integrity and can even be removed from the object which they compose, if so desired. A real-world example of an assembly is an engine.

* Components of a (blended) cake are its ingredients, the components of a layer cake are alternating layers of cake and frosting, the components of an engine include pistons, spark plugs, valves, the block, etc., and the components of a place setting include dishes, silverware, and glasses.

* Four modes of composition important to us are: 
    + juxtaposition 
    + blending 
    + aggregation 
    + assembly

* Art museums usually contain paintings. Based on the previous chapter, we can recognize that a museum is a container, and the paintings are its contents. Also we know that  collection can exist inside or outside any particular container.

* We can see from this example that the objects belonging to a collection may or may not be in the same container at any one time. Although a container, being an object, always has but one location at any one time, a collection of objects is not necessarily localized. This gives us a clue that, while a container is an object a collection is not an object; a collection is merely a concept.

* We have seen that a collection is conceptual, even when the members of the collection are objects. It is also possible to have a collection of concepts. In such a case, both the collection and its members are conceptual. However, we don’t usually use the word “collection” in connection with concepts. We will usually say that we have a set of concepts. We know that numbers are concepts. Mathematicians have a special notation that they’ve developed just so that they can talk about sets of numbers (and other things). It is called set notation. Very simply, a list of numbers is enclosed in curly braces, as in {1, 2, 3}

* Long before computers were invented, we humans recognized similarities between things, categorized those things by their similar characteristics, and named those categories. For example, humans observing a herd of elephants roaming the African plains would recognize that all the individual animals in the herd shared common characteristics, including that they were gray in color, had long snouts, and grew to enormous size. These humans developed a shared concept of the common characteristics, and in order to be able to communicate about that shared concept would give that shared concept a name; in English, the name of the shared concept is “elephant”. Once the category of animals was named, every time such an animal was seen, instead of describing the animal’s characteristics, a reference to the category (“an elephant”) was sufficient to communicate about it. Other animals were similarly categorized based on common characteristics, and the categories were given names; for example, lion, tiger, zebra, etc. There is a rich set of words in English related to this innate human activity of classification, and these words are synonyms of each other. Some of these words are: 
    + category 
    + class 
    + classification 
    + division 
    + family 
    + genus 
    + kind 
    + order 
    + species 
    + type

* We will use the word **type** to mean something that designates a set, usually a set of concepts but also possibly a set of objects. We will use the word **class** to mean a description of the structural and/or behavioral characteristics of potential or actual objects.

* There is some means by which we can identify the members of the set, and distinguish those from things that are not in the set.

* Above we said that a class is a description of the structural and/or behavioral characteristics of potential or actual objects. In our refined terminology, we would say that the word “elephant” is a class, because it references a structural description of the animals in question. Another example of a class is a set of drawings and blueprints describing a house or houses that are built or to be built.

* A class, therefore, is a kind of type. It differs from other types in that a class can only designate sets of objects. One cannot have a class of concepts, in this restricted sense of the term.

> Our thinking is dominated by words. When those words have become overloaded with multiple ill-defined and contradictory meanings, we cannot think clearly.

* E-R modeling defines three stages of data modeling: conceptual, logical, and physical.

![Logical](./images/er-modeling-logical-record.png)

* Is customary to use E-R data models at three levels of abstraction: conceptual (the highest level) logical physical (the lowest level)

* Logical and physical E-R notation assumes that database implementation will be in a DBMS, such as a SQL DBMS, that stores data in tables. It does not, therefore, have any way of expressing two modes of data storage that NoSQL databases make possible: **arrays nested data structures (often called “nested documents” by NoSQL DBMSs)**

* Both arrays and nested data structures are modeled in E-R notation in a way that corresponds to their necessary implementation in a SQL database. This is what is shown earlier in Figure 5-1. The array or nested data structure is split out into its own table. That table has a foreign key back to the table from which it was split. Additionally, that table must have its own primary key.

> **Note:** Probably it's possbile to use ER for data modeling. Just instead of using tables and separating them. There could be another entity such as nest or array that holds the relationships. a) One-to-many: nested, b) Many to many: referenceId (foreign key)

* NoSQL DBMSs support the direct aggregation of arrays and nested data structures in enclosing data structures, without the use of keys. E-R notation has no way to show data structures that are related to each other without keys. As a result, E-R notation cannot be used for NoSQL database design.

* One of the main goals of relational database design is to eliminate redundancy in data, which is where the same data is stored in several places in the database. Redundancy leads to the possibility of inconsistent data, where an update of certain data in the database changes the logically identical data items in one physical place but leaves them out of date in another. Inconsistent data is devilishly hard to deal with, reduces the quality of data, and can lead to costly operational mistakes as fundamental as shipping a package to the wrong address.

* Data exists both as concepts (at the logical level of abstraction) and as objects (at the physical level of abstraction).

* Data type defines/elaborate the type of data i.e integer, float (real number - with decimal representation), string etc.

* Data Structure defines how the data will be (efficiently) contained. Data can be stored serially - Stack/Queue/Array.  Data can be arranged in tree like structure where the left branch contains The data with value less than that of the parent's & right one is opposite of the left - BST.

* Different types of data (such as int, float, string etc.) can be arranged/stored in various logical ways called data structures.

* In an object-oriented software system, the methods of a class are ordinarily the only routines that have direct access to the attributes of objects of that class. This kind of restriction is called encapsulation.

* The UML does not have a notation for identifying key attributes, and therefore cannot represent foreign keys. This means that the UML cannot fully specify a database design. There are workarounds for this deficiency.

* Entity types (concepts and real-world objects).

* It defines a class as “the descriptor for a set of objects.” [ibid., p. 185] This is all well and good, but the UML lacks any ability to describe entities that do not have state or behavior; that is, concepts.

* The UML lacks the concept of a key, which is essential to data modeling. It can only express the identification of objects by their physically distinct existence.

* Chapter 4 in part I explained the type/class split, where types designate sets and classes describe objects.

* COMN separates the designation of a set of values from the description of computer object structure and behavior. Types designate sets without specifying memory structure. Classes describe computer objects in terms of their structure in memory and the routines (methods) exclusively authorized to operate on them.

* Entity 2 : something that has separate and distinct existence and objective or conceptual reality object 1a : something material that may be perceived by the senses concept 1 : something conceived in the mind : thought, notion

* Figure 10-1 below shows a fundamental example of an object in the ordinary English sense of the word “object. The object pictured is a rock. It is certainly material, and it can certainly be perceived by the senses.

![Object](https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/Limestone-060-RD010-C-SH_by22j3.jpg)

* From this point onwards, unless it is already clear from the context, I will qualify the word “object” with the adjective “material” to mean an object in the natural language sense.

* Let us consider the flashlight’s characteristics. It is an object in the same sense that a rock is an object, because it can be perceived by the senses: you can see it—even when it’s off—and touch it. However, a flashlight is interesting for more than its capability to be seen and touched. A flashlight can be turned on and off. We describe this capability by saying that the flashlight can hold a state. A flashlight has a built-in mechanism for changing its state from off to on and back to off: it’s a switch.

![Object with state](https://i.ytimg.com/vi/fg6J6_k3AB4/maxresdefault.jpg)

* In the commonly accepted terminology of computer science, mechanisms built into an object to change its state are called methods.

* In contrast to the flashlight, the rock has no states—at least not in the sense that the flashlight has states. More precisely, the rock is in a single state (solid), and offers no mechanisms of its own for changing that state. We call objects like the flashlight stateful, while we call objects like the rock stateless.

* A material object is an object in the natural-language sense of the word; in other words, something you can see and touch. Some objects have states and methods to change those states (for example, a flashlight), and some do not (for example, a rock). Objects capable of having more than one state are called stateful. Objects having only one state are called stateless.

* The states of some objects have intrinsic meaning, while the states of other objects have no intrinsic meaning. It is not always necessary to assign meanings to the states of an object in order for the object to be useful.

* Thus, on the evening of April 18, 1776, the tower of the Old North Church was used as a stateful object, with the following states and meanings: no lanterns: information unavailable one lantern: the soldiers were coming by land two lanterns: the soldiers were coming by sea The advantage of this system of signaling was that, although anyone could observe the state of the church tower (no lanterns, one lantern, two lanterns), only those who knew the values assigned to each state could interpret and act upon the signal.

* Object-oriented technologists talk much about methods, which, in terms of material objects, are mechanisms that are part of those objects that enable one to change their states. Let us consider the methods that are part of the material objects we have considered so far. rock: no methods (which makes sense, since it has but one state) flashlight: one method, the on-off switch lighted sign: a method to turn the sign on or off Old North Church: a method to light either lantern.

* But it is important to remember that those abstract values zero and one are represented by the meaningless physical states of material objects; specifically, the high- and low-voltage states of R-S flip-flops.

* In fact, computers usually make memory available only in groups of eight flip-flops called bytes. Each of the eight flip-flops has two states, so a byte has 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2, or 28, or 256, states.

* The bit (a portmanteau of binary digit) is a basic unit of information used in computing and digital communications. A binary digit can have only one of two values, and may be physically represented with a two-state device.

* we look at each of the eight flip-flops in a byte as representing a binary digit or bit, then we can think of a byte as representing an 8-digit binary number. Eight binary digits can represent numbers in the range from zero to 255. Now we can refer to each of the 256 states of a byte with a number.

* Objects are often combined into a composite object. In general, the composite object has a number of states which is the product of the number of states of its component objects.

* Computer object: a stateful material object whose state can be read and/or modified by the execution of computer instructions.

* A computer object is a material object that has two distinct qualities beyond those possessed by most material objects: A computer object is a stateful mechanism. This means that it has two or more possible states and means for changing those states. A computer object’s state may be read by a computer, or modified by a computer, or both.

* We have two kinds of computer objects: hardware objects and software objects. hardware object: a computer object which is part of the physical composition of a computer software object: an object composed of hardware objects and/or other software objects by exclusively authorizing only certain routines to access the component objects.

![Composition](./images/object-composition.png)

* The graphs in this figure show the following: 
    + a hardware object a software object composed of a single hardware object, where access to the hardware object is restricted to only certain routines.
    + a software object composed of three hardware objects, where access to those hardware objects is restricted a software object composed of two hardware objects and one other software object, which in turn is composed of a hardware object.

* It’s really important to understand that at the bottom of every software object are hardware objects—material things having meaningless physical states to which we assign meaning.

* Class : a description of the structural and/or behavioral characteristics of potential and/or actual objects

* Hardware object has a fixed built-in set of mechanisms, accessible by computer instructions, for accessing and/or changing its state. Similarly, a software object has a fixed set of routines for accessing and/or changing its state.

* A hardware object may be composed of other hardware objects not directly accessible by computer instructions. Similarly, a software object may be composed of other (hardware or software) objects not directly accessible by its routines, if those objects are encapsulated within higher-level software objects that are part of the software object.

* In general, the meanings of an object’s states must be supplied from some source outside the object itself.

* A material object—that is, an object in the natural-language sense of the word—is something you can see and touch. A stateful material object is an object that has more than one state. A stateful material object may have mechanisms to change its state. The states of material objects may or may not have any meaning. Their states may be assigned meaning. Their states might be useful apart from any meaning. Computers are composed of stateful material objects which we call hardware objects. Software objects are composed of hardware objects and/or other software objects, in a tree. In general, the states of software objects have no more meaning than the states of the hardware objects of which they are composed. In general, meaning must be assigned to states by something other than the objects having those states.

+ Hardware object : a computer object which is part of the physical composition of a computer 
+ Software object : an object composed of hardware objects and/or other software objects by exclusively authorizing only certain routines to access the component objects
+ Method : a routine authorized to operate on the components of software objects of the class of which it is a part

* “Type” was used as a way for a programmer to inform a compiler that a variable could take on any value in the set designated by the type, and simultaneously that a variable needed a certain amount of memory so that it could represent all the values of that set.
    + logical purpose: A traditional type specifies the possible values a variable or field can take on. This is extremely valuable in helping to ensure the correctness of programs and data through a process called type checking.
    + a physical purpose: A traditional type specifies the memory or storage required for a variable or data item. A compiler or DBMS ensures that the proper amount of computer memory is allocated so that it can represent all of the values in the type’s range.

* Thus, while the English word “type” can mean a classification, in DBMS and high-level programming language terminology the word “type” means a constraint on values and a specification of the storage required for any variable declared to be using that type.

* “Type” for the most part retained its early meaning of set of values plus storage specification. Additionally, because the term “type” was adopted early in the history of programming language development, types were generally quite simple or “primitive”, specifying little more than sets of letters and/or numbers.

* In contrast, the “class” of object-oriented programming is associated with the enablement of programmers to define structures of arbitrary complexity, leading to a terminology that considers “classes” to be more powerful in their descriptive capabilities than mere “[primitive/data] types”.





































* 


















