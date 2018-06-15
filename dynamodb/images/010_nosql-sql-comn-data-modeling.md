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

P.46









* 


















