var path = require('path');

var User = require('../controllers/userController');
var Tour = require('../controllers/tourController')

app.post('/search', Tour.findTour);
app.post('/createTour', Tour.createTour);
app.post('/joinTour', restrict, User.joinTour);
