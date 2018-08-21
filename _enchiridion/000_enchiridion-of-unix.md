# Enchiridion of Unix

* UNIX became The Enemy, not so much because it was intrinsically evil, but because it threatened the status quo.

* By borrowing ideas from Multics, Thompson embarked upon a course of action that has become a well-worn path (no pun intended) for UNIX developers: good programmers write great software; great programmers "steal" great software.

* The following list will give you an idea of what the UNIX philosophy tenets are:
  1. Small is beatiful: small things have tremendeous advantage over their larger counterparts. Among these is the ability to combine with other small things in unique and useful ways.
  2. Make each program do one thing well: By focusing on a single task, a program can eliminate much extraneous code that often results in excess overhead, unecessary complexity, and lack of flexibility.
  3. Build a prototype as soon as possible: Most people would agree that prototyping is valuable element of any project. But whereas prototyping is only a small part of the design phase under other methodologies, under UNIX it's the principal vehicle for generating an effective design.
  4. Choose protability over efficiency: When UNIX broke new ground as the first protable operating system of any singfinifance, it was big news. Today portability is taken fro granted as a cencessity in any modern software design, an example of tenet that has gained wide acceptance on other system besides UNIX. 
  5. Store numerical data in flat ASCII files: The choice between portability and efficeiency addresses the value of portable code. Portable data is at least as important as - if not more important than - portalbe code. Portable data is the often-neglected part of the portability formula.
  6. Use software leverate to your advantage: Many programmers have only a superficial understanding of the importantce of reusable code modules. Code re-use helps one take advantage of software leverage, a powerful concept that some UNIX developers use to create numerous applications in comparatively short time.
  7. Use shell scripts to increase leverage and portability: Shell scripts are a double-edged sword for enhancing both software leverage and portability in a design. Whenever possible, writing a script instead of a complete C program is the way to go
  8. Avoid captive user interfaces: Some commands have user interfaces known to UNIX developers as "captive" user interfaces. These prevent the user from running other commands while the command is in use, effectively making the user a captive to the system for the duration of the command. Hence the name captive user interface.
  9. Make very program a filter: The fundamental nature of all software programs is that they only modify data, not create it. Therefore, they should be written to perform as filters since they are filters.

* The following list contains ten lesser tenets, ideas which tend to be part of the UNIX world's belief system:
  1. Allow the user to tailor the environment: UNIX users like the ability to control their environemnt-all of it. Many UNIX applications decidely refrain from making decisions about styles of interaction and instead leave the choices to the user.
  2. Use lower case and keep it short: Using lower case characters is a tradition in the UNIX environment that has persisted long after the reason for doing so disappeared. 
  3. Save trees. UNIX users generally frown on using paper listings. There are good reasons for keeping all text on-line and using powerful tools to manipulate it. 
  4. Silcence is goldes: UNIX commands are notoriously silent when it comes to producing detailed error messages.
  5. This parallel: Most tasks can be broken down into a series of smaller subtasks. These subtasks can then be run in parallel to accomplish more in the same amount of time as one large task. 
  6. The sum of the parts is greated than the whole: This tenet stems from the idea that a large application built from collection of smaller programs is more flexible and hence more useful that a single large program. 
  7. Look for the 90 percent solution: Doing 100 percent of anything is difficult. Doing only 90 percent is far more efficient and cost effective. UNIX developers often look for solutions that satisfy 90 percent of the target user base, leaving the 10 percent to fend for itself.
  8. Worse is better: UNIX aficianados believe that a "least common denominator" system is the one most likey to survive. That which is cheap but effective is far more likely to proliferate thatn that which is high quality and expensive.
  9. This hierarchcally: UNIX uses and developers prefer to organize things hierarchically. For example, the UNIX directory structure was among the first tree-structured architectures applices to file systems.
  
## Small is beatiful

* If you're going to write a program, start small and keep it small. Whether you're crafting a simple filter tool, a graphics package, or a gargantuan database, work to reduce it to the tiniest piece of software practicable. Resist the temptation to turn it into a monolith. Strive for simplicity.

* A large portion of the code in any program is devoted to something other than ectually performing its stated task. Here is an example:

* There are some steps that a typical file copy program might perform:

1. Query the user for the name of the source file
2. Check wheterhe the source file exists
3. If the source file doesn’t exit, notify the user
4. Query the user for the name of the destination file
5. Check whether the destination file exists
6. If the destination file exists, ask the user if he wants to replace it
7. Open the source file
8. Inform the user if the source file is empty. If so, exit
9. Open the destination file
10. Copy the data from the source file to destination file
11. Clone the source file
12. Close the destination file

**Note:** Step then does the file copy. Other steps perform functions that, although necessary, have little to do with copying the file. A good UNIX program should provide capabilities similar to step ten and little else. A program strictly following the UNIX philosophy would expect to be given valid source and destination file names at invocation. Where the valid source and destination fle names come from? From another small programs. These other programs perform the functions of obtaining a file name, checking wheter the file exists, and determining whether it conains more than zero bytes of data. 

* UNIX distribution comes with hundreds of small commands and utility programs that by themselves do little. They often perform one or two functions and little else. Combine them, however and you begin to experience real power. The whole becomes greater than the sum of parts.

* Small programs are easy to understand. Their “all business” approach keeps fluff to a minimum, focusing instead of performing one function well. They contain only a few algorithms, most of which directly relate to the job involved. 

* Large programs on the other hand lean toward complecity and present barriers to understanding.

* The wiser companies take stepts to pervent write large programs that are impossilbe to comprehend. They hire individuals who understand that easily maintained software is more valuable. From other books, software engineers are spending almost 80% of their time in maintaining the software.

* Good designers must go out of their way to make their software easy to maintain. They comment their code thoroughly-but not to thoroughly. They keep subroutines short. They pare the code down to what is absolutely necessary. The result usually is small programs that are easier to maintain.

* Since a small program is usually easy to understand, it is likely to be easy to maintain as well. 

* Companies that fail to maintain their software do not remain in business for long.

* Another area in which small programs have an edge in resource consumption has to do with the amount of disk space occupied by the programs themselves. Small programs, since they are performing a limited task, tend to require smaller executable images. The average small program takes up far less disk space than the typical large monolithic program. (good for Lambda)

> No matter how fast they can make the hardware run, software engineers will always find a way to slow it down for the user.

* The writeer of a large complex program operates under the egotistical assumption that the future is not only predictable, it’s not going to differ much from today. Authoers of small programs, on the other hand, implicitly avoid foretelling the future. They only assumtpion they make about tomorrow is that it will be different from today.

## Make Each Program Do One Thing Well

* The best program, like Cousteau’s lake fly, does but one task in its life and does it well. The program is loaded into memory, accomplishes its function, and then gets out of the way to allow the next single-minded program to begin.

* In all fairness, `ls` retains the ability to list the contents of a directory one file per line. Thas is about all it should do, and leave the column work to other commands better suited to formatting tasks. `ls` would then be a much smaller command, i.e., easier to understand, easier to maintain. 

* Since writing an application that does one thing well results in a smaller program. Small programs tend to be unifunctional (Having, or employing a single function). Unifunctional programs tend to be small.

* If you cannot make the program do one thing well, then you probabyl don#t comprehend the problem you’re trying to solve.

## Rapid Prototyping

* Software engineers are parcicularly burdened with a steep learning curve. Software is elusively difficult to write correctly the first time. The software engineering profession consists of constant revision, a job where trial and error are the normal and applications are born out of counless hours of frustraing rework.

* Reality dictates that we will not get it right the first time. It’s better to face this axiom first. Changing a product early in the product cycle costs far less than undertaking major revisions later.

> Software is never finished. It is only released. 

* Most of us are still learning. Even if we’re egotistical enough to think that we know it all, someone will change the requirements on us. How then are we to build software? Build a prototype as soon as possible. When we say “as soons as possible”, we mean AS SOON AS POSSIBLE. Post haste. Spend small amount of time planning the application, and then GET TO IT. 

* You need a consensus of perception before the project can proceed. The prototype moves toward that consensus by providing a concrete representation of the goal.

* Prototyping is a learning process. The sooner it begins, the closer you will be to the released product. The prototype shows you what works and most importantly what doesn’t. 

* Early prototyping reduces riks. You have something concrete that you can point to and say “It’s going to look like this”. 

> for every correct design, there are hundreds of incorrect ones. By knocking out a few of the bad ones early, you begin a process of elimination that invariably brings you closer to a quality finished product. You discover algorithms that do not compute, thimings that keep missing a beat, and user interfaces that cannot interface.

* The goal of all prototyping should be to build something we call the “Third System”. Man has the capability to build only three systems. Each system possesses characteristics that correlate to corresponding periods in life. All systems follow a path beginning at youth, transiting into maturity, and ending in old age.
	1. Man builds the First System with his back agains the wall: Usually he is under pressure to meet a deadline or satisfy other time-critical demands. He has no time to do it “right”. The lack of time to do it right forces hi to focus on the important aspects of the task and to ignore the nonessentials. Man builds the First System alone or, at most, with a small group of people. The First System is a “lean, mean, computing machine”. It achieves high performance at minimal costs. The software gets the job done - and little else.
	2. The Second System is strange beast. Depending on the size of its market, it may capture the hearts and minds of thousands or even millions of users. Yet irocinally, in many ways the Second System is the worst of the three. To reap rewards everyone wants to be associated with a winner. This group of self-proclaimed experts often contains many critics of the First System. The Second System is designed by a committee. The design-by-committee approach involves drawbacks. It is nearly impossible for a group to agree on all salient points. The Second System is fat and slow.
	3. The Third System is built by people who have been “burned” by the Second System. The Third System is born out of rebellion agains the Second System. Often involves a major name change. The Third System combines the best characteristics of the First and Second Systems. In the Third System the perfect balance is struck. Only the features truly needed remain.

* There are some shortcuts, though. The secret is to progress from the First to the Third System as quickyl as possible. The more time spent on building the first two systems, the longer it will take to achieve the Third System’s optimum balance. If you keep the cycles involved in building the First and Second System short and iterative, you will arrive at the Third System faster.

* UNIX developers take an alternate view towards detailed functional and design specifications:
	1. Write a short functional specification
	2. Write the software
	3. Use an iterative test/rewrite process until you get it right
	4. Write detailed documentation, if necessary

* A “short” functional specification here usually means three to four pages or less. The rationale behind this is that: a) no one really knows that is wanted at first, and b) it’s hard to write about something that doesn’t exist. 

> How does the UNIX programmer know if he’s proceeding in the right direction? He doesn’t. Neither does the traditionalst. Eventually the design must be shown to the prospective end user. The difference is, the traditionalist presnts to the user a massive tome containing a boring description of what the system is going to be like. The UNIX programmer shows the user a functional application. 

* The UNIX appraoch provides the user with a functional First System that he can see and touch. He begins to get a feel for how the final produt will operate. If he likes what he sees, fine. If not, it’s far easier to make major changes now instead of later.

* Remember, though, that a characteristic of the First System is that it displays a concept that ignites other’s imaginations. Viewing a “live” impleentation of the First System sets off a creative spark in the user’s mind. He starts to imagine what he might do with the product.

* While the traditionalist’s user wonders how the product will look, the UNIX developer’s user is already thinking of what to do with the working prototype. For the UNIX user, the iterative design process has begun. He and the developers are proceeding towards the Third System.

> Unlike most systems planned in the traditional way, UNIX evolved from prototype. It grew out of a series of design iterations that have transformed it from a limited-use laboratory system into one called upon a tackle the most ardent tasks.

## Portability - Choose Portability over Efficiency

> The notebook PC will soon tank as the most powerful computer ever built. It has only one real advantage: portability

* **Sofware development involves choices, each of which represents a compromise.** Sometimes the devleoper must write a short, simple subroutine because he doesn’t ahve time to include a more sophisticated one. At other times a limited amount of RAM might be a constraint. The programmer always chooses from a set of compromises in attempting to satisfy ofthen conflicting goals.

* Although efficient software is attractive from a purist’s standpoint, the value of running the software on many different machine architectures tips the balance in the other direction. The reason is more financial than technical: in today’s computing environemtn, software that runs on only one architecture sharply limits it potential marketability.

> Next year hardware will run faster. Next year hardware will be cheaper.

* Your software must be portable to take advantage of the new higher-performance machine. in the UNIX environment, this usually translates into writing much software as shell scripts. A shell script consists of multiple executable commands placed in a single file executed indirectly by the UNIX command interpreter. Because of the wide array of small single-purpose commands found in a typical UNIX distribution, all but the lowest level tasks can be constructed easily from shell scripts. A side benefit of shell scripts is that they are far more portalbe than programs written in the C language.

* Don’t spend too much time making a program run faster. If it barely runs fast enough, then accept the fact that it already meets your needs. All the time spent tunign surouitnes and elimintating critical bottlenecks should be done with an eye toward leveraging performance gains on future hardware platforms as well. **Resist the tendency to make the software faster for its own sake.**

* A common mistake that many UNIX programmers make is to rewrite a shell script in C to gain a marginal edge in performance. This is a waste of time better spent obtaining constructive responses from users.

* The most efficient way is rarely portable. Any time a program takes advantage of special hardware capabilities, it becomes at once more efficient and less protable.



> Whenever any radical idea comes along that seriously alters our view of the world, our natural tendency is to bash the bearer of new tidings.

# Sources
---

* [Unix Philosophy and Node.js](http://blog.izs.me/post/48281998870/unix-philosophy-and-nodejs)
