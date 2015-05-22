(function() {

  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var root = __dirname + '/public/';
  var views = root + '/views/';
  app.use(express.static(root));

  var port = process.env.PORT || 3000;

  var session = require('express-session');
  var genuuid = require('./src/uuid');
  app.use(session({
    genid: function(req) {return genuuid();},
    secret: 'window'
  }));

  // using FileSystem instead of Database
  var fs = require('fs');

  // --- Helper Modules ---
  var cartHelper = require('./src/cartHelper');


  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({'extended':'true'}));

  server.listen(port, function(){
    console.log("Listening on server port " + port);
  });

  app.get('/', function(req,res) {
    if (!req.session.userCart){req.session.userCart = [];}
    res.sendFile(views+'home.html');
  });

  app.post('/data', function(req, res) {
    var cart = req.session.userCart;
    fs.readFile('./products.json','utf-8', function(err,data) {
      if (err) {console.log('err fetching products\n'+err);}
      var dataObject = {
        products: JSON.parse(data),
        cart: cart,
        coupons: {}
      };
      res.json(dataObject);
    });
  });

  app.post('/addtocart', function(req, res) {
    var cart = req.session.userCart;
    var newItem = req.body;
    cartHelper.addIfUnique(cart,newItem);
    res.json({});
  });

  app.post('/removefromcart', function(req,res) {
    var cart = req.session.userCart;
    var newItem = req.body;
    cartHelper.removeFromCart(cart,newItem);
    res.json({});
  });

  app.post('/updateQuantity', function(req,res) {
    var cart = req.session.userCart;
    var newItem = req.body;
    cartHelper.updateQuantity(cart, newItem);
    res.json({});
  });












}());
