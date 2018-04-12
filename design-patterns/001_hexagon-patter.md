# Hexagon Architecture Pattern

[Source](http://java-design-patterns.com/blog/build-maintainable-systems-with-hexagonal-architecture/)

It all starts with a layered architecture. There are mainly 3 layers of abstractions:

* presentation layer: the presentation layer deals with user input
* business logic layer: the business layer is responsible for business logic
* data layer: the database layer takes care of data transactions

The layered architecture implements so called separation of concerns principle which leads to more maintainable code. The main point of this pattern is to avoid leaking the business logic into other layers of abstraction. If it happens there is no way for "headless" testing. 

## Core, ports and adapters

The main objective is to create a full testable system that can be driven equally by users, programs, and batch scripts in isolation of database.

There is a core. Something has to drive this application, call the business logic methods. It may be the HTTP request, automatic test or integration API. These interfaces that drive the application we call the primary ports and the modules that use them are primary adapters. 

The core has it's dependencies. For example they may be a data storage module that the core calls upon to retrieve and update data. The interfaces of these modules that are driven by the core are called the secondary ports of the application. There could be one or more implementations of the secondary port. For example there may be a mock database for testing and a real database for running the application. The secondary port implementations are called secondary adapters.

![Hexagon Pattern](http://java-design-patterns.com/assets/ports_and_adapters.png)


* core: is the main business logic
* primary ports: something that drives the logic or calls the methods e.g. http request, automatic test
* adapters: modules that use the primary adapters
* secondary ports: dependencies that are driven from the application such as retrieve/store data are secondary ports 
* secondary adapters: is the implementation of the secondary ports

## Example: Lottery System

The lottery system will provide two main primary ports: One for the user to submit lottery tickets and another for system admisitrator to perform the draw

The secondary ports consist of lottery ticket database, banking for wire and event log for handling and storing lottery events. 

![Example Hexagon](http://java-design-patterns.com/assets/lottery.png)

### 1. Start from the core concepts

We start the implementation from the system core. First we need to identify the core concepts of the lottery system. Probably the most important one is the lottery ticket. In a lottery ticket you are supposed to pick the numbers and provide your contact details. 

The `LotteryTicket` class contains `LotteryNumbers` and `PlayerDetails`. `LotteryNumbers` contains means to hold given numbers or generate random numbers and test the numbers for equality  with other `LotteryNumbers` instance. `PlayerDetails` is a simple value object containing player's email adress, bank account number and phone number. 

### 2. The core business logic

We have the core concepts and now we need to implement the core business logic that defines how the syste works. In `LotteryAdministration` and `LotteryService` classes we write the methods that are needed by the lottery players and system administrators. 

For Adimistrators the `LotteryAdministration` has `resetLottery()` method for starting a new lottery round. At this stage the player submit their lottery tickets into the database and when the time is due the adimistrator calls `performLottery()` to draw the winning numbers and check each of the tickets for winnings. 

The lottery players use `submitTicket()` to submit tickets for lottery round. After the draw has been performed `checkTicketForPrize()` tells the players whether they have won. 

`LotteryAdministartion` and `LotteryService` have dependencies to lottery ticket database, banking and event log ports. 

### 3. Primary adapter for the players

The core implementation is ready, now we need to define primary adapters for the players. We introduce `ConsoleLottery` class to provide command line interface that allows players to interact with the lottery system.

It has the commands to view and transfer bank account funds, submit and check lottery tickets.

### 4. Primary adapter for adimistrators

We need also to define the lottery administrator facing adapter. This is another command line interface named `ConsoleAdministration`.

The interface's commands allow us to view submitted tickets, perform the lottery draw and reset the lottery ticket database. 

### 5. Secondary port for banking

Next we implement secondary ports and adapters. The first one is the banking support that enables us to manipulate bank account funds. To explain the concept, the player can write his bank account number on the lottery ticket and in case the ticket wins the lottery system automatically wire transfers the funds.

The banking port has two adapters for different purposes. The first one `InMemoryBank` is a simple `HashMap` based implementation for testing. The lottery service's bank account is statically initialized to contain enough funds to pay the prizes in case some of the lottery tickets win.

The other adapter `MongoBank` is based on Mongo and is intended for production use. Running either one of the command line interfaces use this adapter.

### 6. Secondary port for event log

Another secondary port is the lottery event log. Events are sent as the players submit their lottery tickets and when the draw is performed.

We have two adapters for this port: The first one `StdOutEventLog` is for testing and simply sends the events to standard output. The second `MongoEventLog` is more sophisticated, has persistent storage and is based on Mongo.

### 7. Secondary port for database

The last secondary port is the database. It contains methods for storing and retrieving lottery tickets. The port has two adapters. The `LotteryTicketInMemoryRepository` is a mock database holding its contents in memory only and is meant for testing. The `MongoTicketRepository` is used for production runs and provides persistent storage over application restarts.

### 8. Lottery application

With all the pieces in place we create a command line application to drive the lottery system. The test application begins the lottery round using the administration methods and starts collecting lottery tickets from the players. Once all the lottery tickets have been submitted the lottery number draw is performed and all the submitted tickets are checked for wins.

```java
public class App {

  /**
   * Program entry point
   */
  public static void main(String[] args) {

    Injector injector = Guice.createInjector(new LotteryTestingModule());

    // start new lottery round
    LotteryAdministration administartion = injector.getInstance(LotteryAdministration.class);
    administartion.resetLottery();
    
    // submit some lottery tickets
    LotteryService service = injector.getInstance(LotteryService.class);
    SampleData.submitTickets(service, 20);
    
    // perform lottery
    administartion.performLottery();
  }
}
``` 

---

# Hexagon Architecture - Alternative name: Ports & Adapters

[Ali Stair Cockburn - Source](http://alistair.cockburn.us/Hexagonal+architecture)

This architecture approach gives you the possibility to work without either a UI or database, so you can run automated regression-tests against the application. Work whent he database becomes unavailable, and link applications together without any user involvement.

Each face of the hexagon (port) represents some "reason" the application is trying to talk with the outside world. Events arrive from the outside world at a port. The adapter converts it into a usable procedure call or message and passes it to the application. The application is blissfully ignorant of the nature of the input device (see also Ward's CHECKS pattern language, http://c2.com/ppr/checks.html). When the application has something to send out, it sends it out the port to the adapter, which creates the appropriate signals needed by the receiving technology (human or automated). The application has a semantically sound interaction with the adapters on all sides of it, without actually knowing the nature of the thing on the other side of the adapter.

![Hexagon](http://alistair.cockburn.us/get/2301)

Imagine now that ‘’every’’ piece of functionality the application offers were available through an API (application programmed interface) or function call. In this situation, the test or QA department can run automated test scripts against the application to detect when any new coding breaks a previously working function.

The business experts can create automated test cases, before the GUI details are finalized, that tells the programmers when they have done their work correctly (and these tests become the ones run by the test department).

**The application can be deployed in ‘’headless’’ mode, so only the API is available, and other programs can make use of its functionality — this simplifies the overall design of complex application suites and also permits business-to-business service applications to use each other without human intervention over the web.**

 The rule to obey is that code pertaining to the ‘’inside’’ part should not leak into the ‘’outside’’ part.

## What is a port?
 The word “port” is supposed to evoke thoughts of ‘’ports’’ in an operating system, where any device that adheres to the protocols of a port can be plugged into it; and ‘’ports’’ on electronics gadgets, where again, any device that fits the mechanical and electrical protocols can be plugged in. The protocol for a port is given by the purpose of the conversation between the two devices. The protocol takes the form of an application program interface (API).

## What is an adapter?

For each external device there is an ‘’adapter’’ that converts the API definition to the signals needed by that device and vice versa. A graphical user interface or GUI is an example of an adapter that maps the movements of a person to the API of the port. Other adapters that fit the same port are automated test harnesses such as FIT or Fitnesse, batch drivers, and any code needed for communication between applications across the enterprise or net.

On another side of the application, the application communicates with an external entity to get data. The protocol is typically a database protocol. From the application’s perspective, if the database is moved from a SQL database to a flat file or any other kind of database, the conversation across the API should not change. Additional adapters for the same port thus include an SQL adapter, a flat file adapter, and most importantly, an adapter to a “mock” database, one that sits in memory and doesn’t depend on the presence of the real database at all. 


Many applications have only two ports: the user-side dialog and the database-side dialog. This gives them an asymmetric appearance, which makes it seem natural to build the application in a one-dimensional, three-, four-, or five-layer stacked architecture.

The term “port and adapters” picks up the ‘’purposes’’ of the parts of the drawing. A port identifies a purposeful conversation. There will typically be multiple adapters for any one port, for various technologies that may plug into that port. Typically, these might include a phone answering machine, a human voice, a touch-tone phone, a graphical human interface, a test harness, a batch driver, an http interface, a direct program-to-program interface, a mock (in-memory) database, a real database (perhaps different databases for development, test, and real use).

![Hexagon](http://alistair.cockburn.us/get/2302)
Figure 2.0

Figure 2 shows an application having two active ports and several adapters for each port. The two ports are the application-controlling side and the data-retrieval side. This drawing shows that the application can be equally driven by an automated, system-level regression test suite, by a human user, by a remote http application, or by another local application. On the data side, the application can be configured to run decoupled from external databases using an in-memory oracle, or ‘’mock’’, database replacement; or it can run against the test- or run-time database.

![Adapters](http://alistair.cockburn.us/get/2303)
Figure 3.0

Figure 3 shows the same application mapped to a three-layer architectural drawing. To simplify the drawing only two adapters are shown for each port. This drawing is intended to show how multiple adapters fit in the top and bottom layers, and the sequence in which the various adapters are used during system development. 


### Application Notes

**The Left-Right Asymmetry**
The ports and adapters pattern is deliberately written pretending that all ports are fundamentally similar. That pretense is useful at the architectural level. In implementation, ports and adapters show up in two flavors, which I’ll call ‘’primary’’ and ‘’secondary’’, for soon-to-be-obvious reasons. They could be also called ‘’driving’’ adapters and ‘’driven’’ adapters. This is related to the idea from use cases of “primary actors” and “secondary actors”. A ‘’primary actor’’ is an actor that drives the application (takes it out of quiescent state to perform one of its advertised functions). A ‘’secondary actor’’ is one that the application drives, either to get answers from or to merely notify. The distinction between ‘’primary ‘’and’’ secondary ‘’lies in who triggers or is in charge of the conversation.

#### How Many Ports?

What exactly a port is and isn’t is largely a matter of taste. At the one extreme, every use case could be given its own port, producing hundreds of ports for many applications. Alternatively, one could imagine merging all primary ports and all secondary ports so there are only two ports, a left side and a right side.

The weather system described in the Known Uses has four natural ports: the weather feed, the administrator, the notified subscribers, the subscriber database. A coffee machine controller has four natural ports: the user, the database containing the recipes and prices, the dispensers, and the coin box. A hospital medication system might have three: one for the nurse, one for the prescription database, and one for the computer-controller medication dispensers.

![Porst](http://alistair.cockburn.us/get/2304)
Figure 4.0

Figure 4 shows an application with four ports and several adapters at each port. This was derived from an application that listened for alerts from the national weather service about earthquakes, tornadoes, fires and floods, and notified people on their telephones or telephone answering machines. At the time we discussed this system, the system’s interfaces were identified and discussed by ‘’technology, linked to purpose’’. There was an interface for trigger-data arriving over a wire feed, one for notification data to be sent to answering machines, an administrative interface implemented in a GUI, and a database interface to get their subscriber data.

The people were struggling because they needed to add an http interface from the weather service, an email interface to their subscribers, and they had to find a way to bundle and unbundle their growing application suite for different customer purchasing preferences. They feared they were staring at a maintenance and testing nightmare as they had to implement, test and maintain separate versions for all combinations and permutations.

Their shift in design was to architect the system’s interfaces ‘’by purpose’’ rather than by technology, and to have the technologies be substitutable (on all sides) by adapters. They immediately picked up the ability to include the http feed and the email notification (the new adapters are shown in the drawing with dashed lines). By making each application executable in headless mode through APIs, they could add an app-to-add adapter and unbundle the application suite, connecting the sub-applications on demand. Finally, by making each application executable completely in isolation, with test and mock adapters in place, they gained the ability to regression test their applications with stand-alone automated test scripts.

#### Mac, Windows, Google, Flickr, Web 2.0
In the early 1990s, MacIntosh applications such as word processor applications were required to have API-drivable interfaces, so that applications and user-written scripts could access all the functions of the applications. Windows desktop applications have evolved the same ability (I don’t have the historical knowledge to say which came first, nor is that relevant to the point).

The current (2005) trend in web applications is to publish an API and let other web applications access those APIs directly. Thus, it is possible to publish local crime data over a Google map, or create web applications that include Flickr’s photo archiving and annotating abilities.

All of these examples are about making the ‘’primary ‘’ports’ APIs visible. We see no information here about the secondary ports.

### Related Patterns

* The ‘’Design Patterns’’ book contains a description of the generic ‘’Adapter’’ pattern: “Convert the interface of a class into another interace clients expect.” The ports-and-adapters pattern is a particular use of the ‘’Adapter’’ pattern.
* The MVC pattern was implemented as early as 1974 in the Smalltalk project. It has been given, over the years, many variations, such as Model-Interactor and Model-View-Presenter. Each of these implements the idea of ports-and-adapters on the primary ports, not the secondary ports.
* “A mock object is a “double agent” used to test the behaviour of other objects. First, a mock object acts as a faux implementation of an interface or class that mimics the external behaviour of a true implementation. Second, a mock object observes how other objects interact with its methods and compares actual behaviour with preset expectations. When a discrepancy occurs, a mock object can interrupt the test and report the anomaly. 
* Bob Martin’s Dependency Inversion Principle (also called Dependency Injection by Martin Fowler) states that “High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.” 

---


[DESIGNING TESTABLE LAMBDA FUNCTIONS](https://claudiajs.com/tutorials/designing-testable-lambdas.html)


## Examples with NodeJS / JavaScript

* [nodejs npm package for repository pattern with mongodb database](https://github.com/iainjmitchell/mongorepositiory)
* [Implementing the Repository pattern with MongoDB and coffeescript/nodejs](http://www.iainjmitchell.com/blog/mongo-repository)

