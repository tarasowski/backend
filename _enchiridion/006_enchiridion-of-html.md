# Enchiridion of HTML/CSS


> HTML is about dividing content into blocks and giving these blocks meaning. CSS is about styling these blocks!

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
    * **inline** – <span>, <em>, <strong> block-level – <div>, <p>, <article> 
    * **inline block-level** – <input>, <textarea>
    * **block** - `<div>, <p>, <h1>, <pre>, <blockquote>, <ol>, <ul>`

* By default, inline elements have CSS display property set to inline. For block-level elements, its value is “block”, and for inline block elements it’s “inline-block”. So you can explain that <span> tag doesn’t cause breaking the text to the new line, because it’s an inline element which means in CSS it has property “display” set to “inline”.

* `<span>one</span> <span>two</span> <span>three</span>` The browser will display above code in one line: one two three However, it’s possible to change this behavior by adding one line of CSS: `span {   display: block; }` Now, our <span> tags display differently, each one in a new line, since we have set their display property to block: one two three

* For this example, we use <div>. You may wonder what this tag describes within the document. The short answer is nothing. We use the <div> tag in cases where all other tags do not find a use for what we’ve put in the document.

* Another very useful attribute is required, which is added to the form elements without any value. For example, an e-mail will look like this: `<input type="email" id="user-email" name="user-email" required>`

* In the previous example, we learned, among other things, the <div> tag. You know that they have no semantic meaning and serve primarily as a container for other blocks. Usually you add them to apply various visual changes through CSS for larger parts of the website that resemble boxes or rectangles.

* `<div class="main-container"></div>` We have just given <div> the class main-container which says that this is the main container for other item on our website. Now to add the place for menu. It will be included in `<div class=“site-menu”>`

* When we start with CSS, the first task ist to start with the main containter that will hold all other containers. 

* This is done by setting automatic margins: `.main-container {   max-width: 960px;   margin: auto; }` With this code, the browser will take up all free space around .main-container and distribute the space equally between the two margins. We’ve given it the property max-width, so whatever happens, the width of the entire container named with a class main-container will never be wider than 960 pixels.

* Let’s proceed to code our three columns. Let the container of the menu have 20% of the available width. This is done simply by specifying a percentage value: `.site-menu {   width: 20%; }` And a similar width for the right-hand column: `.sidebar {   width: 20%; }`. Now let’s get to the middle column. It will take the remaining width (60%), as the two side columns occupy a total of 40%.

* 














