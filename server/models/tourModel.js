var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Venue = require('./venueModel');
var User = require('./userModel');

// Schema for all user-created tours. Tours have no knowledge of their creator (other than name) or their attendees (other than how many)
var tourSchema = new Schema({
  userId: {type: ObjectId, ref: User},
  title: String,
  permalink: String,
  description: String,
  photo: String,
  date: Date,
  time: Date,
  price: Number,
  addPhone: Boolean,
  addTwitter: Boolean,
  ratings: Object,
  history: Array,
  venues: [{type: ObjectId, ref: Venue}],
  attendees: [{type: ObjectId, ref: User}],
  createdAt: Date
});

module.exports = mongoose.model('Tour', tourSchema);
