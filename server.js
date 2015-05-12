(function() {

  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var root = __dirname + '/public/';
  var views = root + '/views/';

  var port = process.env.PORT || 3000;

  var session = require('express-session');
  var genuuid = require('./src/uuid');
  app.use(session({
    genid: function(req) {return genuuid();},
    secret: 'window'
  }));

  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({'extended':'true'}));

  // -- Database --
  // - Perhaps consider mocking to file system.. -

  var mongojs = require('mongojs');
  var db = mongojs((process.env.MONGOLAB_URI || 'deloitte-digital-development'), ['products']);

  server.listen(port, function(){
    console.log("Listening on server port " + port);
  });

  app.get('/', function(req,res) {
    res.sendFile(views+'index.html');
  });


}());