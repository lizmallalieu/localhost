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
  },

  getProfile: function(req,res) {
    User.findOne({_id: req.session.userId}, function(err, data){
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(data);
      }
    });
  },

  signup: function (req, res, next) {
    var username = req.body.data.username;
    var password = req.body.data.password;
    var email = req.body.data.email;
    // Check to see if a user exists already:
    User.findOne({username: username})
      .exec(function(err, user) {
        if (user) {
          console.log('Account already exists.');
          res.send('Account already exists.');
        } else {
          // If user does not exist, create and save the user:
          var newUser = User({
              aboutMe: 'Tell us about yourself!',
              username: username,
              email: email,
              password: password,
              createdTours: [],
              attendingTours: []
          });
          User.hashPassword(password, function(hash) {
            if(err) {
              return next(err);
            }
            newUser.password = hash;
            newUser.save(function(err, newUser) {
              req.session.regenerate(function () {
                req.session.userId = newUser._id;
                res.send(newUser);
              });
            });
          });
        }
      });
  },

  signin: function (req, res, next) {
    var name = req.body.data.username;
    var password = req.body.data.password;

    // Find if user exists
    User.findOne({username: name}, function(err, user) {
      if(err) {
        return next(err);
      }
      if(!user) {
        return res.send('Username and/or password invalid.');
      }
      // Checks entered PW with the saved hashed/salted PW (defined in user.js)
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) { return next(err); }
        else if (isMatch) {
          req.session.regenerate(function () {
            req.session.userId = user._id;
            res.send(user);
          });
        }
        else {
          res.send('Username and/or password invalid.');
        }
      });
    });
  },

  editUserProfile: function(req, res) {
    var aboutMe = req.body.data;
    User.findOne({_id: req.session.userId}, function(err, user){
      if (err) {
        throw err;
      } else {
        user.aboutMe = aboutMe;
        user.save(function(err, user) {
          if(err) {
            return next(err);
          } else {
            res.send(user);
          }
        });
      }
    });
  }
};
