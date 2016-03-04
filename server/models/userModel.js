var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;
var Tour = require('./tourModel');

var bluebird = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

/* Schema for user accounts. User's have a one to many relationship with tours. Therefore, users store references to all
*  tours they have created (createdTours) or are attending (attendingTours) within arrays.  These references are the
*  document ID's for each Tour document connected with that user.
*/
var userSchema = new Schema({
  username: String,
  name: String,
  password: String,
  email: String,
  phone: String,
  twitter: String,
  about: String,
  createdTours: [{type: ObjectId, ref: Tour}],
  attendingTours: [{type: ObjectId, ref: Tour}],
  attendedTours: [{type: ObjectId, ref: Tour}],
  ratedTours: {},
  createdAt: Date
});

var User = mongoose.model('User', userSchema);

// Compares the entered password with the hashed/stored password in the DB
User.comparePassword = function(password, hash, cb) {
  bcrypt.compare(password, hash, function(err, match) {
    if (err) {
      console.error('Username and/or password are invalid!');
      cb(err, null);
    }
      cb(null, match);
  })
}

// Hashes the user's password before storing it
User.hashPassword =  function(password, cb) {
  var cipher = bluebird.promisify(bcrypt.hash);
  return cipher(password, null, null).bind(this)
  .then(function(hash) {
    cb(hash);
  });
};

module.exports = User;
