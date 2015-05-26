# Mock Clothing Retailer Website

I have created a clothing website for a fictitious company called AFX.

This website runs on a node server.  To run it you must have <a href="https://nodejs.org/">Node</a> installed.

To begin run `npm install`.

Once that is finished run `bower install`.

Now the server can be started by typing `npm start`.

Navigate your browser to <b>http://localhost:3000</b> to view the page.

I created the website using Node, Express, and Angular.  The prodcucts were mocked out into a file.  The Angular application
expects products to be JSON objects of the format:
```
    {
        "productID": "d820bac",
        "name": "Flip Flops",
        "colors": [
            "Red",
            "Blue"
        ],
        "price": 19,
        "gender": "Mens",
        "category": "Footwear",
        "stock": {
            "Red": 6,
            "Blue": 0
        },
        "discount": {
            "Red": 0,
            "Blue": 0
        },
        "colorThumbs": {
            "Red": "#FF0000",
            "Blue": "#0000FF"
        },
        "productThumbs": {
            "Red": "images/men-flip-flop-red.jpg",
            "Blue": "images/men-flip-flop-blue.jpg"
        }
    }
```
Server logic can be found in server.js in the root directory. Some helper node modules are found in the <b>/src</b> directory.
In the <b>/public</b> directory is the HTML, CSS, and Angular.js code of the website.

The HTML can be found in the <b>/public/views</b> directory, with the partials of Angular directives in that subfolder.
The CSS is found in <b>/public/styles/style.css</b>, the Angular in <b>/public/js/</b>.

<h2>Addional Notes.</h2>

For me this was an exploration into some css animations, and eventually
ngAnimate.  Looking back it is much easier to use angular-animate to
create specialized animations than to use CSS trickery, and would have
influenced the core structure of my html.

In the end, I think the product boxes are too busy but it was fun toying
with the idea.

There are also a few initial design choices I regret.

The first is deciding that color is independent of productID;
that is that instead of a different UUID for every possible product,
each product is unique only by name and may have multiple colors.
The second is mocking my data in an array instead of
a hash with product id's as keys.

These two flaws led to a few nested loops
(O n^2) as well as the pain of having to constantly consider
which color to use when dealing with objects.

Another cause of some small headache was creating smaller child objects
for the carts, instead of adding the actual original product object.
I thought since the cart was to be stored in the session I should make the
objects as small as possible, but now I believe this was just premature
optimization.

Otherwise I am very happy with the functionality I achieved.  I think its
funny that I was initially so pleased with the square grid responsive design,
but after implementing filtering I realized how strange it looked to have
a large screen with only two items displayed.  This would have required
a complete redesign so I just left it as is.
