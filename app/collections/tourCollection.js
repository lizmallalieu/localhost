var db = require('../config');
var Tour = require ('../models/tourModel.js');
var Tours = new db.Collection();

Tours.model = Tour;

module.exports = Tours;
