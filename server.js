var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var db = require('./config/db.js');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

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
//* ------------------------- */
/*     MIDDLEWARE & ROUTES    */
/* -------------------------- */

var app = express();
require('./app/config/middleware')(app, express);
require('./app/config/router')(app, express);

/* --------------- */
/*     SERVERS     */
/* --------------- */

var port = process.env.PORT || 3000;
app.listen(port);

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  proxy: {
    '*': 'http://localhost:8080'
  }
}).listen(3001, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Localhost - Webpack 🐦  is listening on 3000 and 3001 and 8080 too');
});

exports = module.exports = app;
