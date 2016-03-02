var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var db = require('./config/db.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/public'));

require('./server/config/router')(app);

var port = process.env.PORT || 8080;

app.listen(port);

console.log("You are connected to the port ", port);

exports = module.exports = app;
