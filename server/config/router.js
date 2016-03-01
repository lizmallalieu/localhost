var path = require('path');

var User = require('../controllers/userController');
var Tour = require('../controllers/tourController')

app.post('/search', Tour.findOne);
app.post('/createTour', Tour.createOne);
