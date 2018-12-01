# Enchiridion of HTML/CSS


> HTML is about dividing content into blocks (`<div>, <main>, <aside>`), giving these blocks meaning (`<p>,<h1>, <article>`) and using browser API to perform some actions (`<form>, <input>, <textarea>`). CSS is about styling these blocks! HTML markups the text and CSS styles the text.
  
> Use progressive enhancement while designing for web: 1) Identify core functionality. 2) Make that functionality available using the simplest possible technology. 3) Enhance! [Pogressive Enhancement](#progressive-enhancement)

---

## Progressive Enhancement for Building Web Apps

### 1. Identify core functionality 

* Define the core functionality e.g. slack - display/send/receive a message [More examples](#progressive-enhancement)

* Define the lowest common denominator a baseline device (e.g. mobile, tablet, desktop, kindle, alexa)

* Define the initial data model and make it visible `<pre>JSON.stringify()</pre>`

* Design basic structure with `<div>`'s and HTML5 sematic blocks for a baseline device

### 2. Make the core functionality available using the SIMPLEST POSSIBLE TECHNOLOGY. 

* Add behavior (scripts, css hover, onclick(), oninput() etc.)

* Add backend (lambda, database, gateway, queues etc.)

### 3. Enhance

* Add layout markup and stylesheeets for structural layout `.container` with breakpoints

* Add presentational stylesheets for a baseline device

* Add presentational stylesheets for other devices

---

## Progressive Enhancement for Building Products
1) Identify core functionality. 
2) Make that functionality available using the simplest possible technology. 
3) Enhance!

---
[Source](http://howtocodeinhtml.com/)

* It’s our job to tell the browser, in a way that it can understand, what each of these elements mean and how they fit together semantically. If this is not done, then our site will appear as a clump of single text.


* Here is a simple text that can be also shown in the browser, but as a chunk of text
```txt
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
```

* Here we mark the words with HTML, so a Browser can understand the structure
```html
<h1>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h1>
<p>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</p>
```

* Before creating any kind of web page, it’s a good idea to divide the content into smaller components by their importance.


```txt
We're looking for an HTML and CSS developer
[image]
For our client, The Cat Factory, we need a skilled web developer in HTML and CSS. We offer a competitive salary, a bag of cat food and toys.
Don't wait, apply now! Our crazy team is waiting for your right meow!
``` 

* The key problem is that we’ve created a website with only plain text. A web browser cannot understand how to display a page properly with only plain text — it doesn’t know which part of the text should be the title or which part should be a picture. In order to display the page properly, we need to define each element by the function of the text and pass this information to the browser.

```html
<h1>We're looking for an HTML and CSS developer</h1>
<img src"images/white-cat.jpg">
<p>For our client, The Cat Factory, we need a skilled web developer in HTML and CSS. We offer a competitive salary, a bag of cat food and toys.</p>
<p>Don't wait, apply now! Our crazy team is waiting for your right meow!</p>
``` 

* As you can see, there are special markings within the text. Hypertext Markup Language, and is the primary markup language for displaying information for a web browser. In simpler terms, it’s a language that uses “tags” (like <p>) to mark text, so that you can describe the text to your browser.

* Attributes are modifiers in HTML, and are always written next to the tag, between the <> enclosure. Attributes have the following template when writing code. tag attribute="value"

* We use attributes because in many HTML tags (for example <html>) do not contain all the information that we want to add. With attributes, we can modify the tags we use and add even more useful information to them. In this case, we have given the browser information that our HTML document is written in English, so we’ve modified the <html> tag with the attribute “lang” and given it a value for “en” (English).

```html
<html lang="en">
</html>
```

* In fact, we’ve already used an attribute when we were first building our web page! Remember the image code? You placed it in an HTML document with the following line: `<img src="images/white-cat.jpg">` In this case, the `<img>` tag was modified with the attribute src with the value of `images/white-cat.jpg`.

* There is no specific HTML tag for author, so in this case we’re using <p> as a general container for a text.

* In the previous sections, we used HTML to describe the content of the site, and divide it into fragments according to their importance. CSS will be responsible for the appearance of our web sites.

* You might have noticed a recurring pattern in the code. On the first line, we write the name of the element (termed “selector”), and then define the appearance of that element between bracket.

```css
h1 {
  color: green;
  font-size: 1.5rem;
}
```

```css
selector { 
  property_name: property:value; 
}
```
* This type of construction is a typical CSS rule. The rule consists in turn of a selector (everything before the first bracket) followed by a list of properties that you write between the brackets.

* If you remember the analogy in which we talked about nested HTML tags as the children and parents, this is the same concept, elements nested within other elements.

* Instead of building doors, windows, etc., we are dealing with elements like <article>, <p>, <header>, <body>, <figcaption> and so on. These tags build the page and now CSS will help to give them style.

* It seems we were able to target the correct paragraph. But how did this happen? Well, we used the above code to tell the browser to know which tags the CSS selector should target. We do this by examining the HTML code and finding all the tags which should match the selector. In our case, we had nested tags of <article>, <header>, and <p>, so the CSS selector “article header p” let’s us specify exactly where the changes will be applied.

* It looks like we have a problem. While the border is displayed with the correct style and color, the image displays beyond our 600 pixels. This is because we established the width of the element <figure>, but the <img> tag does not have any fixed width and thus keeps its original size. It would be nice if the image took 100% of the width of its parent <figure>. This is coded very simply: `article figure img { width: 100%; }`

* <nav> is used for specifying all kinds of navigation functions on websites that contain links to internal or external information. So putting <nav> into the code says “everything inside <nav> will be used to navigate around the website.”

* We need to use the appropriate tag that tells the browser, “Hey, the form starts here!” This is very similar to the tag <article> for indicating where an article element starts).

* In the “for” attribute, you should use the id of the field described by the `<label>` element.

* The only difference here is that the “type” attribute has an “email” value. The meaning is, of course, so that the user can enter their email. Note that anything typed within the “email” field will have to be validated as a correct e-mail address. If it’s not a valid email, the browser will display an error message and will not send the form.

* The element <input> has the attribute type equal to submit. Whatever is typed into the value attribute will display as text on our website button.

```html
<form action="/action_page.php">
  First name:<br>
  <input type="text" name="firstname" value="Mickey"><br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse"><br><br>
  <input type="submit" value="Submit">
</form>
```

**Note:** We use `<form>, <label>, <input>` these are all HTML tags with semantic meaning. By adding semantic tags to your document, you provide additional information about that document, which aids in communication. Specifically, semantic tags make it clear to the browser what the meaning of a page and its content is.

* `<label>`, `<input>`, and `<textarea>` are all elements of one group called inline-block. Inline-block elements can have different sizes, however browser will always display them horizontally just as a text.

    * e.g. `<span></span>`is a generic inline style container

* First, let’s figure out how one makes elements display one after the other vertically. We basically need to tell the browser, “Hey, we want a container which can be vertically stacked”. Fortunately, this container tag is known as <div>, and will sort of “break” content to new lines
    * e.g. `<div></div>`logical division
    
* When it comes to the display of tags, the browser recognizes three groups of elements: inline block-level inline block-level Inline elements do not cause transitions to a new line, but will be displayed one next to the other horizontally. Block elements are set like blocks that stack on top of each other and will never display next to one another horizontally, unless we use magic tricks in CSS (which we’ll learn in the next chapter). Inline blocks will act as inline elements (elements are displayed next to each other), but differ in that they can be for instance resized.
    * **inline** – `<span>, <em>, <strong> block-level – <div>, <p>, <article>`
    * **inline block-level** – `<input>, <textarea>`
    * **block** - `<div>, <p>, <h1>, <pre>, <blockquote>, <ol>, <ul>`

* By default, inline elements have CSS display property set to inline. For block-level elements, its value is “block”, and for inline block elements it’s “inline-block”. So you can explain that `<span>` tag doesn’t cause breaking the text to the new line, because it’s an inline element which means in CSS it has property “display” set to “inline”.

* `<span>one</span> <span>two</span> <span>three</span>` The browser will display above code in one line: one two three However, it’s possible to change this behavior by adding one line of CSS: `span {   display: block; }` Now, our <span> tags display differently, each one in a new line, since we have set their display property to block: one two three

* For this example, we use <div>. You may wonder what this tag describes within the document. The short answer is nothing. We use the <div> tag in cases where all other tags do not find a use for what we’ve put in the document.

* Another very useful attribute is required, which is added to the form elements without any value. For example, an e-mail will look like this: `<input type="email" id="user-email" name="user-email" required>`

* In the previous example, we learned, among other things, the <div> tag. You know that they have no semantic meaning and serve primarily as a container for other blocks. Usually you add them to apply various visual changes through CSS for larger parts of the website that resemble boxes or rectangles.

* `<div class="main-container"></div>` We have just given <div> the class main-container which says that this is the main container for other item on our website. Now to add the place for menu. It will be included in `<div class=“site-menu”>`

* When we start with CSS, the first task ist to start with the main containter that will hold all other containers. 

* This is done by setting automatic margins: `.main-container {   max-width: 960px;   margin: auto; }` With this code, the browser will take up all free space around .main-container and distribute the space equally between the two margins. We’ve given it the property max-width, so whatever happens, the width of the entire container named with a class main-container will never be wider than 960 pixels.

* Let’s proceed to code our three columns. Let the container of the menu have 20% of the available width. This is done simply by specifying a percentage value: `.site-menu {   width: 20%; }` And a similar width for the right-hand column: `.sidebar {   width: 20%; }`. Now let’s get to the middle column. It will take the remaining width (60%), as the two side columns occupy a total of 40%.

* Unfortunately, our containers still appear in a block (one above the other). To set them next to each other, we need to give them a special CSS float property. We use it to tell the browser that we want X item closer to the left or right edge of the container in which it is placed. So we can use here: flexbox or css grids.

---
[Source](https://resilientwebdesign.com/)

* <marklar>some more text</marklar> Once again, the browser displays the text between the opening and closing tags. What’s interesting here is what the browser doesn’t do. The browser does not throw an error. The browser does not stop parsing the HTML at this point, refusing to go any further. Instead, it simply ignores the tags and displays the content within.

* That’s a remarkably powerful feature. It allows browsers to implement new HTML features at different rates. We don’t have to wait for every browser to recognise a new element. Instead we can start using the new element at any time, secure in the knowledge than non-supporting browsers won’t choke on it.

* Some HTML elements are literally meaningless. The SPAN element says nothing about the contents within it.

* There are obviously special elements, like the A element, that come bundled with superpowers. In the case of the A element, its superpower lies in the HREF attribute that allows us to link out to any other resource on the web. Other elements like INPUT, SELECT, TEXTAREA, and BUTTON have their own superpowers, allowing people to enter data and submit it to a web server.

* Then there are elements that describe the kind of content they contain. The contents of a P element should be considered a paragraph of text. The contents of an LI element should be considered as an item in a list. Browsers display the contents of these elements with some visual hints as to their meaning.

* CSS shares HTML’s forgiving attitude to errors. If a web browser encounters a selector it doesn’t understand, it simply skips over whatever is between that selector’s curly braces. If a browser sees a property or a value it doesn’t understand, it just ignores that particular declaration.

> But with the right values applied to the widths and heights of table cells, it could be used to recreate just about any desired layout. These were hacks; clever solutions to tricky problems. But they had unfortunate consequences. Designers were treating HTML as a tool for the appearance of content instead of a language for describing the meaning of content. CSS was a solution to this problem, if only designers could be convinced to use it.

* Some forward-thinking web designers caught the CSS bug early. They redesigned their websites using CSS for layout instead of using TABLEs and spacer GIFs. True to the founding spirit of the web, they shared what they were learning and encouraged others to make the switch to CSS.

**Note:** Seeing the same HTML document styled in a multitude of different ways drove home one of the beneficial effects of CSS: separation of concerns.

* The style sheet still needs to have some knowledge of the HTML document’s structure. Quite often, “hooks” are added into the markup to make it easier to style: specific values of CLASS or ID attributes, for example. So HTML and CSS aren’t completely decoupled. They form a partnership but they also have an arrangement.

* The world of architecture has accrued its own set of design values over the years. One of those values is the principle of material honesty. One material should not be used as a substitute for another. Otherwise the end result is deceptive. Using CSS for presentation is materially honest—that’s the intended use of CSS. It also allows HTML to be materially honest. Instead of trying to fulfil two roles—structure and presentation—HTML can return to fulfilling its true purpose, marking up the meaning of content.

* Using TABLEs for layout is materially dishonest. The TABLE element is intended for marking up the structure of tabular data. The end result of using TABLEs, FONT elements, and spacer GIFs is a façade. At first glance everything looks fine, but it won’t stand up to scrutiny. As soon as such a website is stress-tested by actual usage across a range of browsers, the façade crumbles.

* Flexible units for layout: percentages rather than pixels. Instead, designers chose to pretend that the browser dimensions were a known known. They created fixed-width layouts for one specific window size. In the early days of the web, most monitors were 640 pixels wide. Web designers created layouts that were 640 pixels wide. As more and more people began using monitors that were 800 pixels wide, more and more designers began creating 800 pixel wide layouts. A few years later, that became 1024 pixels. At some point web designers settled on the magic number of 960 pixels as the ideal width.

> As futurist Jamais Cascio put it, “software, like all technologies, is inherently political”: Code inevitably reflects the choices, biases and desires of its creators. 

* If you’ve ever used Photoshop then you’ll know what happens when you select “New” from the “File” menu: you will be asked to enter fixed dimensions for the canvas you are about to work within. Before adding a single pixel, a fundamental design decision has been made that reinforces the consensual hallucination of an inflexible web.

* The rise of mobile devices was confronting web designers with the true nature of the web as a flexible medium filled with unknowns. The initial reaction to this newly-exposed reality involved segmentation. Rather than rethink the existing desktop-optimised website, what if mobile devices could be shunted off to a separate silo? This **mobile ghetto** was often at a separate subdomain to the “real” site: m.example.com or mobile.example.com. 

* This segmented approach was bolstered by the use of the term “the mobile web” instead of the more accurate term “the web as experienced on mobile.” In the tradition of their earlier consensual hallucinations, web designers were thinking of mobile and desktop not just as separate classes of device, but as entirely separate websites.

* One Web means making, as far as is reasonable, the same information and services available to users irrespective of the device they are using. But this doesn’t mean that small-screen devices should be served page layouts that were designed for larger dimensions: However, **it does not mean that exactly the same information is available in exactly the same representation across all devices.**

* Ethan Marcotte stood on stage at An Event Apart in Seattle, a gathering for people who make websites. He spoke about an interesting school of thought in the world of architecture: responsive design, the idea that buildings could change and adapt according to the needs of the people using the building.

> Luke Wroblewski coined the term Mobile First in response to the ascendency of mobile devices: Losing 80% of your screen space forces you to focus. You need to make sure that what stays on the screen is the most important set of features for your customers and your business. There simply isn’t room for any interface debris or content of questionable value. You need to know what matters most.

* In this context, Mobile First is less about mobile devices per se, and instead focuses on prioritising content and tasks regardless of the device. It discourages assumptions.

* Embrace the fluidity of the web. Design layouts and systems that can cope to whatever environment they may find themselves in. But the only way we can do any of this is to shed ways of thinking that have been shackles around our necks. They’re holding us back. **Start designing from the content out, rather than the canvas in.**

* If a node on the network receives a datagram that has errors, but is still understandable, then the packet should be processed anyway. Conversely every node on the network should attempt to send well-formed packets. This line of thinking was enshrined in the Robustness Principle, also known as **Postel’s Law: Be conservative in what you send; be liberal in what you accept.** If that sounds familiar, it’s because that’s the way that web browsers deal with HTML and CSS. Even if there are errors in the HTML or CSS, the browser will still attempt to process the information, skipping over any pieces that it can’t parse.

* HTML and CSS are both examples of declarative languages. An author writing in a declarative language describes a desired outcome without providing step-by-step instructions to the computer processing the file.

* HTML and CSS are both examples of declarative languages. An author writing in a declarative language describes a desired outcome without providing step-by-step instructions to the computer processing the file. With HTML, you can describe the nature of the content—paragraphs, headings, form fields, etc.—without having to explain exactly what the browser should do with that information. With CSS, you can describe the desired appearance of the content—colours, borders, etc.—without having to write a program to apply those styles.

* Another difference between HTML and JavaScript. Whereas HTML can be rendered piece by piece as it is downloaded, a JavaScript file must be downloaded in its entirety before its contents can be parsed. JS is imperative in it's nature!

* Many of those problems would also affect HTML and CSS files, but because of Postel’s Law, they can recover gracefully. This doesn’t mean that web designers shouldn’t use JavaScript. But it does mean that web designers shouldn’t rely on JavaScript when a simpler solution exists.

**Important:** Describing the web as a platform puts it on par with other software environments. Flash was a platform. Android is a platform. iOS is a platform. But the web is not a platform. The whole point of the web is that it is cross-platform.

* A platform provides a controlled runtime environment for software. As long as the user has that runtime environment, you can be confident that they will get exactly what you’ve designed. If you build an iOS app and someone has an iOS device, you know that they will get 100% of your software. But if you build an iOS app and someone has an Android device, they will get 0% of your software. You can’t install an iOS app on an Android device. It’s all or nothing.

* The web isn’t as binary as that. If you build something using web technologies, and someone visits with a web browser, you can’t be sure how many of the web technologies will be supported. It probably won’t be 100%. But it’s also unlikely to be 0%. Some people will visit with iOS devices. Others will visit with Android devices. Some people will get 80% or 90% of what you’ve designed. Others will get just 20%, 30%, or 50%. The web isn’t a platform. It’s a continuum.

* The coupling between structure and presentation is handled through selectors in CSS: element selectors, class selectors, and so on. With JavaScript, the coupling is handled through the vocabulary of the Document Object Model, or DOM.

> Progressive enhancement is a strategy for web design that emphasizes core webpage content first. This strategy then progressively adds more nuanced and technically rigorous layers of presentation and features on top of the content as the end-user's browser/internet connection allow.

* Do websites need to look exactly the same in every browser? Some web designers were concerned that progressive enhancement would be a creative straitjacket. Designing for the lowest common denominator did not sound like a recipe for progress. But this was a misunderstanding. Progressive enhancement asks that designers start from the lowest common denominator (a well marked-up document), but there is no limit to where they can go from there.

* In fact, it’s the very presence of a solid baseline of HTML that allows web designers to experiment with the latest and greatest CSS. Thanks to Postel’s Law and the loose error-handling model of CSS, designers are free to apply styles that only work in the newest browsers. This means that not everyone will experience the same visual design. This is not a bug. This is a feature of the web.

* New browsers and old browsers; monochrome displays and multi-coloured displays; fast connections and slow connections; big screens, small screens, and no screens; everyone can access your content. That content should look different in such varied situations. If a website looks the same on a ten-year old browser as it does in the newest devices, then it probably isn’t taking advantage of the great flexibility that the web offers.

* Designers bemoaning the fact that they have to support an older outdated browser because a portion of their audience are still using it. They’re absolutely right. Anyone using that older browser should have access to the same content as someone using the latest and greatest web browser. But that doesn’t mean they should get the same experience.

* Some designers have misunderstood progressive enhancement to mean that all functionality must be provided to everyone. It’s the opposite. Progressive enhancement means providing core functionality to everyone. After that, it’s every browser for itself.

* If a website is built using progressive enhancement then it’s okay if a particular feature isn’t supported or fails to load: Ajax, geolocation, whatever. As long as the core functionality is still available, web designers don’t need to bend over backwards trying to crowbar support for newer features into older browsers.

> Lots of cool features on the Boston Globe don’t work when JS breaks; “reading the news” is not one of them.

* The trick is identifying what it is considered core functionality and what is considered an enhancement.

* Taking an x-ray perspective means looking “through” the complex widgets and visual styles of a design, identifying the core content and functional pieces that make up the page, and finding a simple HTML equivalent for each that will work universally.

### Progressive Enhancement

* Here’s a three-step approach I take to web design: 

1) Identify core functionality. 
2) Make that functionality available using the simplest possible technology. 
3) Enhance!


* **Information Example** Let’s say you’re a news provider. That right there is the core functionality—to provide news. There are many, many other services you could also provide; interactive puzzles, realtime notifications, and more. Valuable as those services are, they’re probably not as important as making sure that people have access to news.

* How can you make the core functionality available using the simplest possible web technology? That would be an HTML file served up at a URL. Even at this early stage it’s possible to overcomplicate things. The HTML could be unnecessarily bloated. The URL could be unnecessarily verbose; hard to share or recall. Now that the news has been marked up with the appropriate HTML elements—articles, headings, paragraphs, lists, and images—it’s time for step three: enhance!

* By default, the news will be presented using the browser’s own stylesheet. It’s legible, but not exactly pleasurable. By applying your own CSS, you can sculpt the content into a more pleasing shape. Whitespace, leading, colour and contrast are all at your disposal. You can even use custom fonts—an enhancement that was impossible on the web for many years.

* For browsers on large-screen devices, you can introduce layout. It might seem odd at first to think of layout as an enhancement, but that’s the lesson of mobile-first responsive design. Consider the content first, then mark it up with a sensible source order, then apply layout declarations within media queries.

* **Communication Example** Applying the three-step process to a news site is relatively straightforward. Catching up with the news is a fairly passive act. To really test this process, we need to apply it to something more interactive. Suppose we were building a social network. The people using our tool need to be able to communicate with one another regardless of where in the world they are. The core functionality is sending and receiving messages.

* Displaying messages in a web browser isn’t difficult. There might be a lot of complexity on the server involving databases, syncing, queueing, and load balancing, but the HTML needed to structure a reverse-chronological list isn’t very different from the HTML needed for a news site.

* Sending a message from the browser to the web server requires HTML that is interactive. That’s where forms come in. In this case, a form with a text input and a submit button should be enough, at least for the basic functionality.

* People can now receive and respond to messages on our social network, no matter what kind of device or browser they are using. Now the trick is to improve the experience without breaking that fundamental activity.

* If we were to leave the site in this HTML-only state, I don’t think we’d be celebrating our company’s IPO anytime soon. To really distinguish our service from the competition, we need that third step in the process: enhance!

* At the very least, we can apply the same logic we used for the news site and style our service. Using CSS we can provide colour, texture, contrast, web fonts, and for larger screens, layout. But let’s not stop with the presentation. Let’s improve the interaction too. 

* Right now this social network has the same kind of page-based interaction as a news site. Every time someone sends a message to the server, the server sends back a whole new page to the browser. We can do better than that. Time for some Ajax. We can intercept the form submission and send the data to the server using Ajax—I like using the word Hijax to describe this kind of Ajax interception. If there’s a response from the server, we can also update part of the current page instead of refreshing the whole page. This would also be a good time to introduce some suitable animation. We can go further. Browsers that support WebSockets can receive messages from the server. People using those browsers could get updates as soon as they’ve been sent. **Not every browser supports this advanced functionality. That’s okay. The core functionality—sending and receiving messages—is still available to everyone.**

* **Web-based Word Processor Example** Identify core functionality. The tautological answer would be “processing words.” Not very helpful. What do people actual do with this software? They write. They share. They edit. Make that functionality available using the simplest possible technology. Looking at our three verbs—writing, sharing, and editing—we get one of them for free just by using URLs: sharing. The other two—writing and editing—require the use of a form. A basic TEXTAREA element can act as the receptacle for the words, sentences, and paragraphs that will make up everything from technical reports to the great American novel. Submitting that content to a web server means it can be saved for later.

* Technically, that’s a web-based word processor, accessible to anyone with a web browser and an internet connection. But the experience is clunky and dull. It would be a shame not to take advantage of some of slicker options available in modern browsers. Enhance! Using JavaScript, the humble TEXTAREA can be replaced with a richer editing interface, detecting each keystroke and applying styling on the fly. Web fonts can make the writing experience more beautiful. Ajax will allow work to be saved to the server almost constantly, without the need for a form submission. WebSockets provide the means for multiple people to work on the same document at the same time.

* If a browser supports some form of local storage, then data can be stored in a client-side database. Flaky network connections or unexpected power outages won’t get in the way of saving that important document. Using Service Workers, web developers can provide instructions on what to do when the browser (or the server) is offline. These are modern browser features that we should be taking full advantage of …once we’ve made sure that we’re providing a basic experience for everyone.

* We’ve looked at some examples of applying the three-step approach to a few products and services—news, social networking, photo sharing, and word processing. You can apply this approach to many more services: making and updating items in a to-do list, managing calendar appointments, looking up directions, making reservations at nearby restaurants. Each one can be built with the same process: Identify core functionality. Make that functionality available using the simplest possible technology. Enhance!

* This can really clarify which content is most important, something that’s important in a mobile-first responsive workflow. Once you’ve established that, make sure that content is sent from the server as HTML (the simplest possible technology). Then, using conditional loading, you could decide to make Ajax requests for supporting content if the screen real-estate is available.

* We can go deeper. We can apply the three-step process at the scale of individual components within a page. “What is the core functionality of this component? How can I make that functionality available using the simplest possible technology? Now how can I enhance it?”

* Site navigation is another discrete component that lends itself well to a sliding scale of enhancements. The core functionality of navigation is to provide links to resources. The simplest—and still the best—technology to enable that is the humble hyperlink. A list of links should do the trick. With that in place, you are now free to enhance it into something really compelling. Off-canvas navigation, progressive disclosure, sliding, swiping, fading, expanding …the sky’s the limit.

**Note:** Websites do not need to look exactly the same in every browser.

> To the organisers of Hypertext ’91, this seemed hopelessly naïve. They didn’t understand that the simplicity of the web was actually its strength.

* It’s worth remembering that building with progressive enhancement doesn’t mean that everything needs to be made available to everyone. Instead it’s the core functionality that counts. If every single feature needed to be available to every browser on every device, that would indeed be an impossibly arduous process. This is why prioritisation is so important. As long as the core functionality is available using the simplest possible technology, you can—with a clear conscience—layer on more advanced features.

* First, just make it work. Second, make it work better. The design manual also explains why: If you build pages with the idea that parts other than HTML are optional, you’ll create a better and stronger web page.

---

[Source](http://hesketh.com/publications/inclusive_web_design_for_the_future/)

* Progressive Enhancement Strategies:
  * start with lowest common denominator (baseline e.g. mobile device)
  * design for semantics and structure
  * add features appropriate for baseline devices
    * warnings about dsiplay, to be hidden with CSS
    * skip nav link
  * add features appropriate for accesssiblity
    * alt, longdesc, title
  * add layout markup and stylesheets for structural layout
  * add baseline presentational stylesheets using link
    * use semantic markup, add more if necessary/desired
    * determine targets for stylesheets
    * determine necessary workarounds/hacks
  * add behavior (scripts, css hover, etc.)
    * ensure all behavior has fallback cases
    * href fallsback for onclick
    * server-side fallback for client-side form validation
  * define styles for modern graphical browsers

### Resources:
* [How to Code in HTML5 and CSS3](http://howtocodeinhtml.com/)
* [Resilient Web Design](https://resilientwebdesign.com/)
* [Responseive Web Design](https://abookapart.com/products/responsive-web-design)
* [Inclusive web design for the future](http://hesketh.com/publications/inclusive_web_design_for_the_future/)


---
[Source](https://abookapart.com/products/responsive-web-design)

* The core ingredients of responsive design:

1. A flexible, grid-based layout
2. Flexible images and media, and
3. Media queries, a module from the CSS3 specification

* The old way of creating design was with creating an element in the markup, give it a fixed width in CSS and center it in the page

```css
.page {
  width: 960px;
  margin: 0 auto;
}
```

* Instead we should reset e.g. the font to 100% base = 16px. We can do that by adding some css properties to the `<body>`. By doing so we can start using em for relative sizes instead of pixels. 

```css
body {
  font: 100%
  /*...*/
}
```

> If you want to create responsive designs, don't thinnk in pixel, think in relative sizes! 

* How to calculate `em`? Assume our base `font-size: 100%`on the body element equals to `16px`. And we need to express our `h1` target font size `24px`relative to its context (16px): `24 / 16 = 1.5`. The formula is the following one: target / context = result


* For better readability use class name and comment so you can see where the `div` container ends.

```html
<body>
  <div class="page">
    <div class="blog section">
      <h1 class="lede">Recently in <a href="#">The bot >> Blog</a></h1>
      <div class="main">

      </div> <!-- /end .main-->
      <div class="other">

      </div><!-- /end .other-->
    </div><!-- /end .blog.section-->
  </div> <!-- /end .page-->
</body>
```

* In the example above we have created a generic container for the entire page `.page`, which in turn contains our `.blog` module.  And within `.blog`module, we have created two more containers: a `div`classed as `.main`for our main article content, and another `div`classed as `.other`for other stuff.

> The essence of responsive design is that you need to use relative sizes instead of fixed pixels. By doing so you can create fully responsive and fluent designs. Paddings, margins, widths, heights, images and grids they all must have relative sizes.

* When you start creating HTML from scratch, you need to do:

1) Define the lowest common denominator a baseline device (e.g. mobile, tablet, desktop, kindle, alexa)
2) Define a data model and make it visible `<pre>JSON.stringify()</pre>`
3) Design basic structure with `<div>`'s and HTML5 sematic blocks for a baseline device
4) Add layout markup and stylesheeets for structural layout `.container` with breakpoints
5) Add presentational stylesheets for a baseline device
6) Add behavior (scripts, css hover, onclick(), oninput() etc.)
7) Add presentational stylesheets for other devices

* If you want to stretch your content to the whole width you don't need to specify a container, since the container is just another utility to e.g. center the content or limit the width of the content.
