# Enchiridion of Functions

> The art of programming is, and has always been, the art of language design. But never forget that your real goal is to tell the story of the system, and that the functions you write need to fit cleanly together into a clear and precise language to help you with that telling.

* Armstrong: Writing is. There’s some computer scientist that said, “Oh, if you’re no good at English you’ll never be a very good programmer.”

* Bloch: My attempts to make my programs readable. As Knuth would say, a program is essentially a work of literature. 

* You should name a variable using the same care with which you name a first-born child.

* Pick one word for one abstract concept and stick with it. For instance, it’s confusing to have fetch, retrieve, and get as equivalent methods of different classes.

> Our goal, as authors, is to make our code as easy as possible to understand. We want our code to be a quick skim, not an intense study.

* The names accountAddress and customerAddress are fine names for instances of the class Address but could be poor names for classes. Address is a fine name for a class.

* The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that. Functions should not be 100 lines long. Functions should hardly ever be 20 lines long.

* Every function should be just two, or three, or four lines long. Each is transparently obvious. Each tells a story. And each led you to the next in a compelling order.

* This implies that the blocks within if statements, else statements, while statements, and so on should be one line long. Probably that line should be a function call. 

```js
if(isValidEvent(event)) {
    
}
```

* Encapsulate Conditionals Boolean logic is hard enough to understand without having to see it in the context of an if or while statement. Extract functions that explain the intent of the conditional. For example:  if (shouldBeDeleted(timer)) is preferable to if (timer.hasExpired() && !timer.isRecurrent())

* Avoid Negative Conditionals Negatives are just a bit harder to understand than positives. So, when possible, conditionals should be expressed as positives. if (buffer.shouldCompact()) is preferable to if (!something...)

* This also implies that functions should not be large enough to hold nested structures. Therefore, the indent level of a function should not be greater than one or two. This, of course, makes the functions easier to read and understand.

> FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL. THEY SHOULD DO IT ONLY.

* Functions that do one thing cannot be reasonably divided into sections (e.g. declarations, initializations, and sieve)

* In order to make sure our functions are doing “one thing,” we need to make sure that the statements within our function are all at the same level of abstraction. There are concepts in there that are at a very high level of abstraction, such as getHtml(); others that are at an intermediate level of abstraction, such as: String pagePathName = PathParser.render(pagePath); and still others that are remarkably low level, such as: .append(”\n”).

* We want the code to read like a top-down narrative. We want every function to be followed by those at the next level of abstraction so that we can read the program.

* It turns out to be very difficult for programmers to learn to follow this rule and write functions that stay at a single level of abstraction (levels of abstraction: getHtml(), parse data, append/manipulate data, eache of these level of abstractions should be in own small functions). But learning this trick is also very important. It is the key to keeping functions short and making sure they do “one thing.”

* “You know you are working on clean code when each routine turns out to be pretty much what you expected.” Half the battle to achieving that principle is choosing good names for small functions that do one thing. The smaller and more focused a function is, the easier it is to choose a descriptive name.

* E.g change name from testableHtml to SetupTeardownIncluder.render. This is a far better name because it better describes what the function does. I also gave each of the private methods an equally descriptive name such as isTestable or includeSetupAndTeardownPages

* Don’t be afraid to make a name long. A long descriptive name is better than a short enigmatic name. A long descriptive name is better than a long descriptive comment.

* The ideal number of arguments for a function is zero (niladic). Next comes one (monadic), followed closely by two (dyadic). Three arguments (triadic) should be avoided where possible. More than three (polyadic) requires very special justification—and then shouldn’t be used anyway.

* One input argument is the next best thing to no arguments. SetupTeardown-Includer.render(pageData) is pretty easy to understand. Clearly we are going to render the data in the pageData object.

* If a function is going to transform its input argument, the transformation should appear as the return value.

* Flag arguments are ugly. Passing a boolean into a function is a truly terrible practice. It immediately complicates the signature of the method, loudly proclaiming that this function does more than one thing. It does one thing if the flag is true and another if the flag is false!

* A function with two arguments is harder to understand than a monadic function. For example, writeField(name) is easier to understand than writeField(output-Stream, name).

* There are times, of course, where two arguments are appropriate. For example, Point p = new Point(0,0); is perfectly reasonable. Cartesian points naturally take two arguments.

* Even obvious dyadic functions like assertEquals(expected, actual) are problematic. How many times have you put the actual where the expected should be? The two arguments have no natural ordering.

* Dyads aren’t evil, and you will certainly have to write them. However, you should be aware that they come at a cost and should take advantage of what mechanisms may be available to you to convert them into monads.

* Functions that take three arguments are significantly harder to understand than dyads. The issues of ordering, pausing, and ignoring are more than doubled.

* Anything that forces you to check the function signature is equivalent to a double-take. It’s a cognitive break and should be avoided.

* Functions should either do something or answer something, but not both. Either your function should change the state of an object, or it should return some information about that object. Doing both often leads to confusion.

* Returning error codes from command functions is a subtle violation of command query separation.

* This does not suffer from verb/adjective confusion but does lead to deeply nested structures. When you return an error code, you create the problem that the caller must deal with the error immediately.

* Try/catch blocks are ugly in their own right. They confuse the structure of the code and mix error processing with normal processing. So it is better to extract the bodies of the try and catch blocks out into functions of their own.

* Functions should do one thing. Error handling is one thing. Thus, a function that handles errors should do nothing else. This implies (as in the example above) that if the keyword try exists in a function, it should be the very first word in the function and that there should be nothing after the catch/finally blocks.

* When you use exceptions rather than error codes, then new exceptions are derivatives of the exception class. They can be added without forcing any recompilation or redeployment.

> Writing software is like any other kind of writing. When you write a paper or an article, you get your thoughts down first, then you massage it until it reads well. The first draft might be clumsy and disorganized, so you wordsmith it and restructure it and refine it until it reads the way you want it to read. When I write functions, they come out long and complicated. So then I massage and refine that code, splitting out functions, changing names, eliminating duplication. I shrink the methods and reorder them. Sometimes I break out whole classes, all the while keeping the tests passing. In the end, I wind up with functions that follow the rules I’ve laid down above. I don’t write them that way to start. I don’t think anyone could.

* But never forget that your real goal is to tell the story of the system, and that the functions you write need to fit cleanly together into a clear and precise language to help you with that telling.

* Methods that are never called should be discarded. Keeping dead code around is wasteful. Don’t be afraid to delete the function. Remember, your source code control system still remembers

* The most obvious form of duplication is when you have clumps of identical code that look like some programmers went wild with the mouse, pasting the same code over and over again. These should be replaced with simple methods.

* One of the more powerful ways to make a program readable is to break the calculations up into intermediate values that are held in variables with meaningful names. Matcher match = headerPattern.matcher(line);  if(match.find())  { String key = match.group(1); String value = match.group(2); headers.put(key.toLowerCase(), value);  } The simple use of explanatory variables makes it clear that the first matched group is the key, and the second matched group is the value.

* Replace Magic Numbers with Named Constants This is probably one of the oldest rules in software development.

* In general it is a bad idea to have raw numbers in your code. You should hide them behind well-named constants. For example, the number 86,400 should be hidden behind the constant SECONDS_PER_DAY. If you are printing 55 lines per page, then the constant 55 should be hidden behind the constant LINES_PER_PAGE.


```
int realDaysPerIdealDay = 4;
const int WORK_DAYS_PER_WEEK = 5;
int sum = 0;
for (int = 0; j < NUMBER_OF_TASKS; j++) {
    int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
    int realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);
    sum += realTaskWeeks;
}
``` 

* The term “Magic Number” does not apply only to numbers. It applies to any token that has a value that is not self-describing. assertEquals(7777, Employee.find(“John Doe”).employeeNumber()); There are two magic numbers in this assertion. The first is obviously 7777, though what it might mean is not obvious. The second magic number is “John Doe,” and again the intent is not clear. It turns out that “John Doe” is the name of employee #7777 in a well-known test database created by our team.

```
assertEquals( HOURLY_EMPLOYEE_ID, Employee.find(HOURLY_EMPLOYEE_NAME).employeeNumber());

``` 

* Function Names Should Say What They Do

* If you have to look at the implementation (or documentation) of the function to know what it does, then you should work to find a better name or rearrange the functionality so that it can be placed in functions with better names.

* Before you consider yourself to be done with a function, make sure you understand how it works. It is not good enough that it passes all the tests. You must know that the solution is correct.

* Every team should follow a coding standard based on common industry norms. This coding standard should specify things like where to declare instance variables; how to name classes, methods, and variables; where to put braces; and so on. The team should not need a document to describe these conventions because their code provides the examples.

* It is often tempting to create functions that have multiple sections that perform a series of operations. Functions of this kind do more than one thing, and should be converted into many smaller functions, each of which does one thing. 

```
public void pay() { for (Employee e : employees) { if (e.isPayday()) { Money pay = e.calculatePay(); e.deliverPay(pay); } } }

```

* This bit of code does three things. It loops over all the employees, checks to see whether each employee ought to be paid, and then pays the employee. This code would be better written as see below. Each of these functions does one thing.


```
public void pay() { for (Employee e : employees) payIfNecessary(e)} private void payIfNecessary(Employee e) { if (e.isPayday()) calculateAndDeliverPay(e);}private void calculateAndDeliverPay(Employee e) { Money pay = e.calculatePay(); e.deliverPay(pay); }

``` 

* If you have to spend effort into looking at a fragment of code to figure out what it's doing, then you should extract it into a function and name the function after that “what”. That way when you read it again, the purpose of the function leaps right out at you, and most of the time you won't need to care about how the function fulfills its purpose - which is the body of the function.

* Develop a habit of writing very small functions - typically only a few lines long. Any function more than half-a-dozen lines is code smell, and it's not unusual to have functions that are a single line of code.

* The name of the method can be longer than its implementation - but that didn't matter because there is a big distance between the intention of the code and its implementation.

* A good example is the `isEmpty` method for a list when the common idiom is to use `aList.length == 0`. Small functions like this only work if the names are good, so you need to pay good attention to naming.  

![Martin Fowler's Functions](https://martinfowler.com/bliki/images/functionLength/my-method-counts.png)

* As you see there's lots of small methods there - half of the methods of Martin Fowler's codebase are two lines or less. (lines here are non-comment, non-blank, and excluding the def and end lines.)

* Then there’s—I don’t know if I read it somewhere or if I invented it myself—Joe’s Law of Debugging, which is that all errors will be plus/minus three statements of the place you last changed the program. “Yeah, but it must be like software—the bug will be pretty near to the last change you made to the hardware.” And he went, “I changed a capacitor. You’re a genius!” He’d replaced one capacitor with a bigger capacitor and he unsoldered it and put the original one back and it worked. It’s the same everywhere. You fix your car and it goes wrong—it’s the last thing you did. You changed something—you just have to remember what it was. It’s true with everything.

## References & Tutorials

* [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
* [FunctionLength by Martin Fowler](https://martinfowler.com/bliki/FunctionLength.html)
* [Clean Code - Javascript](https://github.com/tarasowski/clean-code-javascript)














 




 





