var User = require('./models/userModel.js');

module.export = {
  // Handles user joining a tour
  joinTour: function(req, res) {
    // Find the currently logged in user
    User.findOne({_id: req.session.userId}, function(err, user){
      if (err) {
        res.send(err);
      } else {
        if (user.createdTours.indexOf(req.body.data) > -1) {
          res.send('You cannot join your own tour.');
          return;
        }
        user.attendingTours.push(req.body.data);
        user.save(function(err, user) {
          if(err) {
            return next(err);
          } else {
            // Stores the tour document's ID to the user's attendingTours array as a reference
            user.attendingTours.push(tour._id);
            user.save(function(err, user) {
              if(err) {
                return next(err);
              } else {
                console.log(user);
                res.send(user);
              }
            });
          }
        });
      }
    });
  }
};
