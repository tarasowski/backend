# Event Loop in Node.js

[Source](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

**Note:** A kernel is the core component of an operating system. Using interprocess communication and system calls, it acts as a bridge between applications and the data processing performed at the hardware level.


- The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.
- When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue
- A callback function is simply a function you pass into another function so that function can call it at a later time.

* The poll phase has two main functions:
1. Calculating how long it should block and poll for I/O, then
2. Processing events in the poll queue.
    * If the poll queue is not empty, the event loop will iterate through its queue of callbacks executing them synchronously
    * If the poll queue is empty, one of two more things will happen:
        * If scripts have been scheduled by setImmediate(), the event loop will end the poll phase and continue to the check phase to execute those scheduled scripts.
        * If scripts have not been scheduled by setImmediate(), the event loop will wait for callbacks to be added to the queue, then execute them immediately.


[Source](https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c)

**Node.js is an event-based platform. This means that everything that happens in Node is the reaction to an event.**

- A transaction passing through Node traverses a cascade of callbacks.

- There is only one thread that executes JavaScript code and this is the thread where the event loop is running.

- Asynchronous operations, like working with the filesystems, doing outbound HTTP requests or talking to databases are always loaded off to a thread pool provided by libuv. Libuv by default creates a thread pool with four threads to offload asynchronous work to. Today’s operating systems already provide asynchronous interfaces for many I/O tasks (e.g. AIO on Linux).
Whenever possible, libuv will use those asynchronous interfaces, avoiding usage of the thread pool. The same applies to third party subsystems like databases. Here the authors of the driver will rather use the asynchronous interface than utilizing a thread pool.
In short: Only if there is no other way, the thread pool will be used for asynchronous I/O.

- We see that in fact everything that goes on in a Node applications runs through the event loop.

**Note:** The first while loop simulates the event loop. A tick is the dequeuing of an event from the "event loop queue" and the execution of said event.


[Source](https://www.tutorialspoint.com/nodejs/nodejs_event_loop.htm)

- Node.js uses events heavily and it is also one of the reasons why Node.js is pretty fast compared to other similar technologies. As soon as Node starts its server, it simply initiates its variables, declares functions and then simply waits for the event to occur.

*Note:** In an event-driven application, there is generally a main loop that listens for events, and then triggers a callback function when one of those events is detected. 

![Image](https://www.tutorialspoint.com/nodejs/images/event_loop.jpg)

- That callback functions are called when an asynchronous function returns its result


[Source](https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/)

- IO operations can be orders of magnitude slower than data processing. Take this for example: SSD-s can have a read speed of 200-730 MB/s - at least a high-end one. Reading just one kilobyte of data would take 1.4 microseconds, but during this time a CPU clocked at 2GHz could have performed 28 000 of instruction-processing cycles.
- For network communications it can be even worse, just try and ping google.com. The average latency is about 44 milliseconds. Just while waiting for a packet to make a round-trip on the wire, the previously mentioned processor can perform 88 millions of cycles.

* **Note:** There are two main I/O operations: 
    + writing to a disk
    + sending/receiving packets via internet

- Most operational systems provide some kind of an Asynchronous IO interface, which allows you to start processing data that does not require the result of the communication, meanwhile the communication still goes on..
    + This can be achieved in several ways. Nowadays it is mostly done by leveraging the possibilities of multithreading at the cost of extra software complexity. For example reading a file in Java or Python is a blocking operation. Your program cannot do anything else while it is waiting for the network / disk communication to finish. All you can do - at least in Java - is to fire up a different thread then notify your main thread when the operation has finished.

* **Note:** In computer programming, a return statement causes execution to leave the current subroutine and resume at the point in the code immediately after where the subroutine was called, known as its return address.
* Javascript is a single-threaded, event-driven language. This means that we can attach listeners to events, and when a said event fires, the listener executes the callback we provided.
* Whenever you call setTimeout, http.get or fs.readFile, Node.js sends these operations to a different thread allowing V8 to keep executing our code. Node also calls the callback when the counter has run down or the IO / http operation has finished.
* However, we only have one main thread and one call-stack, so in case there is another request being served when the said file is read, its callback will need to wait for the stack to become empty. The limbo where callbacks are waiting for their turn to be executed is called the task queue (or event queue, or message queue). 
* 


![Micro/Macro](https://blog-assets.risingstack.com/2016/10/the-Node-js-event-loop.png)

**Note:** According to the WHATVG specification, exactly one (macro)task should get processed from the macrotask queue in one cycle of the event loop. After said macrotask has finished, all of the available microtasks will be processed within the same cycle. While these microtasks are being processed, they can queue more microtasks, which will all be run one by one, until the microtask queue is exhausted.

