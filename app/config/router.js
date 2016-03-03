var User = require('../controllers/userController');
var Tour = require('../controllers/tourController');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var request = require('request');

// Authenticates user access through the use of sessions
module.exports = function(app, express) {
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));

  // Checks if there is a session currently active.  If so, allows routing process to continue.  Otherwise, ceases routing.
  var restrict = function(req, res, next) {
    if (req.session.userId !== undefined) {
      next();
    } else {
      console.log("Access denied!");
      res.send({isAuth: false});
    }
  };

  app.post('/api/search', Tour.findTour);
  app.post('/api/createTour', Tour.createTour);
  app.post('/api/joinTour', restrict, User.joinTour);
  // Allows front-end to check if there is a session currently active or not
  app.get('/api/session',  function(req,res) {
    res.send({isAuth:true});
  });
  app.post('/api/createTour', Tour.createTour);
  app.get('/api/profile', restrict, User.getProfile);
  app.post('/api/signup', User.signup);
  app.post('/api/signin', User.signin);
  // Handles user logging out
  app.get('/api/logout', function (req, res) {
    req.session.destroy(function() {
      res.send('Bye Felicia');
    });
  });
  app.post('/api/fetchTourInfo', Tour.fetchTour);
  // Handles user editing their 'About Me' in their profile
  app.post('/api/aboutMeEdit', User.editUserProfile);

};
