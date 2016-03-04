var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Venue = require('./venueModel');
var User = require('./userModel');

// Schema for all user-created tours. Tours have no knowledge of their creator (other than name) or their attendees (other than how many)
var tourSchema = new Schema({
  pictureUrl: String,
  name: String,
  createdBy: String,
  attendees: Number,
  streetAddress: String,
  city: String,
  state: String,
  date: Date,
  price: Number,
  description: String,
  LatLng: Array,
  venues: [{type: ObjectId, ref: Venue}],
  tourGuide: [{type: ObjectId, ref: User}],
  ratings: Object 
});

module.exports = mongoose.model('Tour', tourSchema);
