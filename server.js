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
  var isProductUnique = require('./src/checkUniqueProduct');


  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({'extended':'true'}));

  server.listen(port, function(){
    console.log("Listening on server port " + port);
  });

  app.get('/', function(req,res) {
    if (!req.session.userCart){req.session.userCart = [];}
    res.sendFile(views+'home.html');
  });

  app.post('/products', function(req, res) {
    fs.readFile('./products.json','utf-8', function(err,data) {
      if (err) {console.log('err fetching products\n'+err);}
      res.json(JSON.parse(data));
    });
  });

  app.post('/addtocart', function(req, res) {
    var cart = req.session.userCart;
    var newItem = req.body;
    if (isProductUnique(cart,newItem)) {
      cart.push(newItem);
      console.log(req.session.userCart);
      res.end();
    }
    else {
      console.log(req.session.userCart);
      res.status(500).end();}
  });













}());
