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
app.post('/createTour', Tour.createTour);
app.get('/profile', restrict, User.getProfile);
app.post('/signup', User.signup);
app.post('/signin', User.signin);
// Handles user logging out
app.get('/logout', function (req, res) {
  req.session.destroy(function() {
    res.send('hey');
  });
});
// Fetches information for a specific tour, given its id
app.post('/fetchTourInfo', Tour.fetchTour);
