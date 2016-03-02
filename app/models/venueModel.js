var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
  venueId: String,
  name: String,
  photoSuffix: String,
  address: String,
  rating: Number,
  price: Number,
  tier: String,
  tips: Number,
  visitors: Number,
  menu: String,
  url: String,
  twitter: String,
  facebook: String,
  category: String,
  hours: [{
    days: String,
    open: [{ time: String }]
  }],
  createdAt: Date,
  updatedAt: Date
}, 
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

venueSchema.virtual('photo')
  .get(function () {
    return 'https://irs0.4sqi.net/img/general/300x300' + this.photoSuffix;
  });

module.exports = mongoose.model('Venue', venueSchema);
