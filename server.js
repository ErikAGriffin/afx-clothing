(function() {

  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var root = __dirname + '/public/';
  var views = root + '/views/';
  app.use(express.static(root));

  var port = process.env.PORT || 3000;

  // using FileSystem instead of Database
  var fs = require('fs');

  var session = require('express-session');
  var genuuid = require('./src/uuid');
  app.use(session({
    genid: function(req) {return genuuid();},
    secret: 'window'
  }));

  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({'extended':'true'}));

  server.listen(port, function(){
    console.log("Listening on server port " + port);
  });

  app.get('/', function(req,res) {
    res.sendFile(views+'home.html');
  });

  app.post('/products', function(req, res) {
    fs.readFile('./products.json','utf-8', function(err,data) {
      if (err) {console.log('err fetching products\n'+err);}
      res.json(JSON.parse(data));
    });
  });













}());
