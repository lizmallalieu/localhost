var User = require('../controllers/userController');
var Tour = require('../controllers/tourController');
var Venue = require('../controllers/venueController');

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

  app.post('/api/signin', User.signin);
  app.post('/api/signup', User.signup);
  app.get('/api/session',  function(req, res) {
    res.send({isAuth:true});
  });
  app.get('/api/logout', function (req, res) {
    req.session.destroy(function() {
      res.send('Bye Felicia');
    });
  });

  app.get('/api/profile', restrict, User.getProfile);
  // Handles user editing their 'About Me' in their profile
  app.post('/api/aboutMeEdit', User.editUserProfile);

  app.post('/api/search', Tour.findTour);

  // Allows front-end to check if there is a session currently active or not
  app.post('/api/tours', Tour.createOne);
  app.post('/api/tours/rate', Tour.rateTour);
  app.post('/api/joinTour', restrict, User.joinTour);
  app.post('/api/fetchTourInfo', Tour.fetchTour);

  app.get('/api/venues', Venue.fetchOne);
  app.post('/api/venues', Venue.fetchAll);
  app.put('/api/venues', Venue.updateOne);
  app.delete('/api/venues', Venue.removeOne);
  app.post('/api/venues/search', Venue.searchAll);
  app.post('/api/venues/fetch', Venue.searchNew);

  app.get('*', function(req, res, next) {
    res.status(200).sendfile(path.resolve(__dirname, '../../public/index.html'));
  });
};
