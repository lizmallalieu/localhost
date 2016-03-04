var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var db = require('../config/db.js');

//* ------------------------- */
/*     MIDDLEWARE & ROUTES    */
/* -------------------------- */

require('./config/middleware')(app, express);
require('./config/router')(app, express);

/* --------------- */
/*     SERVERS     */
/* --------------- */

var port = process.env.PORT || 3000;
app.listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Node Server + Webpack Hot Middleware is listening on', port);
});

exports = module.exports = app;
