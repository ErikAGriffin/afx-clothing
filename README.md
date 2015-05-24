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

I included some additional thoughts and comments at the top of the `home.html` file.


