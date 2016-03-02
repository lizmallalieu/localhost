var db = require('../config');
var Venue = require('../models/venueModel.js')

var Venues = new db.Collection();

Venues.model = Venue;

module.exports = Venues;