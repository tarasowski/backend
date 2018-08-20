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

Loc 209


* Whenever any radical idea comes along that seriously alters our view of the world, our natural tendency is to bash the bearer of new tidings.

