var path = require('path');

var User = require('../controllers/userController');
var Tour = require('../controllers/tourController')

app.post('/search', Tour.findTour);
app.post('/createTour', Tour.createTour);
//TODO: Look at recast.ly to see how they use authenticaiton.
app.post('/joinTour', restrict, User.joinTour);
// Allows front-end to check if there is a session currently active or not
app.get('/session', restrict,  function(req,res) {
  res.send({isAuth:true});
});
// Handles user creating a new tour
app.post('/createTour', Tour.createTour);
