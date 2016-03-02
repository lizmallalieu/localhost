var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');

module.exports = function(app, express) {
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(path.resolve(__dirname, '../../public')));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
};
