# Echiridion of Architecture


> When you see the right thing, do it — this may look like more work in the short term, but it's the path of least effort in the long run. If you don't know what the right thing is, do the minimum necessary to get the job done, at least until you figure out what the right thing is.

* Unlike buildings, which may be made of bricks, concrete, wood, steel, and glass, software is made of software. Large software constructs are made from smaller software components, which are in turn made of smaller software components still, and so on.

* Large software constructs are made from smaller software components, which are in turn made of smaller software components still, and so on.


* The kinds of changes a system’s development typically experiences should not be the changes that are costly, that are hard to make. A good architecture comes from understanding it more as a journey than as a destination, more as an ongoing process of enquiry than as a frozen artifact.

* The rules of software architecture are the rules of ordering and assembling the building blocks of programs.

* When software is done right, it requires a fraction of the human resources to create and maintain. Changes are simple and rapid. Defects are few and far between. Effort is minimized, and functionality and flexibility are maximized.

* The goal of software architecture is to minimize the human resources required to build and maintain the required system. 

* Developers buy into a familiar lie: “We can clean it up later; we just have to get to market first!” Of course, things never do get cleaned up later, because market pressures never abate.

* The fact is that making messes is always slower than staying clean, no matter which time scale you are using.

* Simple truth of software development: The only way to go fast, is to go well. “Slow and steady wins the race.”

* The first value of software is its behavior. Programmers are hired to make machines behave in a way that makes or saves money for the stakeholders.

* The second value of software has to do with the word “software”—a compound word composed of “soft” and “ware.” The word “ware” means “product”; the word “soft”… Well, that’s where the second value lies. Software was invented to be “soft.” Software was invented to be “soft.” It was intended to be a way to easily change the behavior of machines. If we’d wanted the behavior of machines to be hard to change, we would have called it hardware. To fulfill its purpose, software must be soft—that is, it must be easy to change.

* Just remember: If architecture comes last, then the system will become ever more costly to develop, and eventually change will become practically impossible for part or all of the system.

> In 1938, Alan Turing laid the foundations of what was to become computer programming. He was not the first to conceive of a programmable machine, but he was the first to understand that programs were simply data.

* Paradigms are ways of programming, relatively unrelated to languages. A paradigm tells you which programming structures to use, and when to use them. **The three paradigms included in this overview chapter are structured programming, object-orient programming, and functional programming.** Thus these three paradigms are likely to be the only three we will see. Further evidence that there are no more such paradigms is that they were all discovered within the ten years between 1958 and 1968.

> It was in this primitive environment that Dijkstra made his great discoveries. All programs can be constructed from just three structures: sequence, selection, and iteration.

* Dijkstra once said, “Testing shows the presence, not the absence, of bugs.” In other words, a program can be proven incorrect by a test, but it cannot be proven correct. All that tests can do, after sufficient testing effort, is allow us to deem a program to be correct enough for our purposes.

* Software architects strive to define modules, components, and services that are easily falsifiable (testable).

> Software is not a rapidly advancing technology. The rules of software are the same today as they were in 1946, when Alan Turing wrote the very first code that would execute in an electronic computer. The tools have changed, and the hardware has changed, but the essence of software remains the same.

* The only way to write complex software that won't fall on its face is to hold its global complexity down — to build it out of simple parts connected by well-defined interfaces, so that most problems are local and you can have some hope of upgrading a part without breaking the whole.

> One of my most productive days was throwing away 1000 lines of code.   -- Ken Thompson

* Rule of Modularity: Write simple parts connected by clean interfaces.

* Because maintenance is so important and so expensive, write programs as if the most important communication they do is not to the computer that executes them but to the human beings who will read and maintain the source code in the future (including yourself).

* Rule of Clarity: Clarity is better than cleverness.

* Rule of Composition: Design programs to be connected with other programs.

* To make programs composable, make them independent. A program on one end of a text stream should care as little as possible about the program on the other end. It should be made easy to replace one end with a completely different implementation without disturbing the other.

* Even more often (at least in the commercial software world) excessive complexity comes from project requirements that are based on the marketing fad of the month rather than the reality of what customers want or software can actually deliver.

* Because debugging often occupies three-quarters or more of development time, work done early to ease debugging can be a very good investment.

* Allowing programs to get large hurts maintainability.

* Most software is fragile and buggy because most programs are too complicated for a human brain to understand all at once. When you can't reason correctly about the guts of a program, you can't be sure it's correct, and you can't fix it if it's broken.

* One very important tactic for being robust under odd inputs is to avoid having special cases in your code. Bugs often lurk in the code for handling special cases, and in the interactions among parts of the code intended to handle different special cases.

* Data is more tractable than program logic. It follows that where you see a choice between complexity in data structures and complexity in code, choose the former. More: in evolving a design, you should actively seek ways to shift complexity from code to data.

* The easiest programs to use are those that demand the least new learning from the user — or, to put it another way, the easiest programs to use are those that most effectively connect to the user's pre-existing knowledge.

* Therefore, avoid gratuitous novelty and excessive cleverness in interface design. If you're writing a calculator program, ‘+’ should always mean addition!

* Therefore, write your software to cope with incorrect inputs and its own execution errors as gracefully as possible. But when it cannot, make it fail in a way that makes diagnosis of the problem as easy as possible.

* Well-designed programs cooperate with other programs by making as much sense as they can from ill-formed inputs; they either fail noisily or pass strictly clean and correct data to the next program in the chain.

> The most basic argument for prototyping first is Kernighan & Plauger's; “90% of the functionality delivered now is better than 100% of it delivered never”. Prototyping first may help keep you from investing far too much time for marginal gains. Prototype, then polish. Get it working before you optimize it. Or: Make it work first, then make it work fast. ‘Extreme programming' guru Kent Beck, operating in a different culture, has usefully amplified this to: “Make it run, then make it right, then make it fast”.

> I remember one development manager at Bellcore who fought against the “requirements” culture years before anybody talked about “rapid prototyping” or “agile development”. He wouldn't issue long specifications; he'd lash together some combination of shell scripts and awk code that did roughly what was needed, tell the customers to send him some clerks for a few days, and then have the customers come in and look at their clerks using the prototype and tell him whether or not they liked it. If they did, he would say “you can have it industrial strength so-many-months from now at such-and-such cost”.

* The Unix Philosophy in One Lesson All the philosophy really boils down to one iron law, the hallowed ‘KISS principle’ of master engineers everywhere.

* Small is beautiful. Write programs that do as little as is consistent with getting the job done.

* To do the Unix philosophy right, you have to value your own time enough never to waste it. If someone has already solved a problem once, don't let pride or politics suck you into solving it a second time rather than re-using. And never work harder than you have to; work smarter instead, and save the extra effort for when you need it. Lean on your tools and automate everything you can.

* The Rule of Modularity bears amplification here: The only way to write complex software that won't fall on its face is to build it out of simple modules connected by well-defined interfaces, so that most problems are local and you can have some hope of fixing or optimizing a part without breaking the whole.

* The Magical Number Seven, Plus or Minus Two: Some Limits on Our Capacity for Processing Information. This gives us a good rule of thumb for evaluating the compactness of APIs: Does a programmer have to remember more than seven entry points? Anything larger than this is unlikely to be strictly compact.

* Orthogonality is one of the most important properties that can help make even complex designs compact. In a purely orthogonal design, operations do not have side effects; each action (whether it's an API call, a macro invocation, or a language operation) changes just one thing without affecting others. There is one and only one way to change each property of whatever system you are controlling. Your monitor has orthogonal controls. You can change the brightness independently of the contrast level, and (if the monitor has one) the color balance control will be independent of both.

* Doug McIlroy's advice to “Do one thing well” is usually interpreted as being about simplicity. But it's also, implicitly and at least as importantly, about orthogonality.

* As they point out, orthogonality reduces test and development time, because it's easier to verify code that neither causes side effects nor depends on side effects from other code — there are fewer combinations to test.

* Constants, tables, and metadata should be declared and initialized once and imported elsewhere. Any time you see duplicate code, that's a danger sign. Complexity is a cost; don't pay it twice.

* The 1974 CACM paper that introduced Unix to the world; one of the famous quotes from that paper observes “...constraint has encouraged not only economy, but also a certain elegance of design”. That simplicity came from trying to think not about how much a language or operating system could do, but of how little it could do — not by carrying assumptions but by starting from zero. (what in Zen is called “beginner's mind” or “empty mind”). To design for compactness and orthogonality, start from zero.

* How many global variables does it have? Global variables are modularity poison, an easy way for components to leak information to each other in careless and promiscuous ways.

* Are the individual functions in your modules too large? This is not so much a matter of line count as it is of internal complexity. If you can't informally describe a function's contract with its callers in one line, the function is probably too large. Personally I tend to break up a subprogram when there are too many local variables. Another clue is [too many] levels of indentation. I rarely look at length.   -- Ken Thompson

* Do any of your APIs have more than seven entry points? Do any of your classes have more than seven methods each? Do your data structures have more than seven members? If so break it down.

* Module complexity tends to rise as the square of the number of entry points, too — yet another reason simple APIs are better than complicated ones.

* Components are the units of deployment. They are the smallest entities that can be deployed as part of a system. These dynamically linked files, which can be plugged together at runtime, are the software components of our architectures.

* The solution to this problem of complext software is to partition the development environment into releasable components. The components become units of work that can be the responsibility of a single developer, or a team of developers. When developers get a component working, they release it for use by the other developers. They give it a release number and move it into a directory for other teams to use. They then continue to modify their component in their own private areas. Everyone else uses the released version. Changes made to one component do not need to have an immediate affect on other teams. Each team can decide for itself when to adapt its own components to new releases of the components. Moreover, integration happens in small increments. There is no single point in time when all developers must come together and integrate everything they are doing.

* The architecture of a system has very little bearing on whether that system works. There are many systems out there, with terrible architectures, that work just fine. Their troubles do not lie in their operation; rather, they occur in their deployment, maintenance, and ongoing development.

* The primary purpose of architecture is to support the life cycle of the system. Good architecture makes the system easy to understand, easy to develop, easy to maintain, and easy to deploy. The ultimate goal is to minimize the lifetime cost of the system and to maximize programmer productivity.

* First of all, a software architect is a programmer; and continues to be a programmer. Never fall for the lie that suggests that software architects pull back from code to focus on higher-level issues. They do not! Software architects are the best programmers, and they continue to take programming tasks, while they also guide the rest of the team toward a design that maximizes productivity.

## References & Tutorials
---

[The Art of UNIX Programming (The Addison-Wesley Professional Computng Series)](https://www.amazon.com/UNIX-Programming-Addison-Wesley-Professional-Computng/dp/0131429019)
[Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series) ](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
