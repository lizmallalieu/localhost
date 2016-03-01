var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bluebird = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

/* Schema for user accounts. User's have a one to many relationship with tours. Therefore, users store references to all
*  tours they have created (createdTours) or are attending (attendingTours) within arrays.  These references are the 
*  document ID's for each Tour document connected with that user.
*/
var userSchema = new Schema({
 username: String,
 email: String,
 password: String,
 createdTours: Array,
 attendingTours: Array,
 aboutMe: String
});


var User = mongoose.model('User', userSchema);

// Compares the entered password with the hashed/stored password in the DB
User.comparePassword = function(candidatePW, savedPW, cb) {
  bcrypt.compare(candidatePW, savedPW, function(err, doesMatch) {
    if (err) {
      console.log('Username and/or password are invalid.');
      cb(err);
    } 
      cb(null, doesMatch);
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