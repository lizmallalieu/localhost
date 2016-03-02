var mongoose = require('mongoose');
 mongoURI = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/localhost';
 mongoose.connect(mongoURI);

 var db = mongoose.connection;
 db.on('error', console.error.bind(console, "connection error"));
 db.once("open", function () {
  console.log('Mongodb connection open')
 });

 module.exports = db;
