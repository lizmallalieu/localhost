var Tour = require('../models/tourModel.js');
var User = require('../models/userModel.js');
var Q = require('q');
var request = require('request');

<<<<<<< 52b4fee0af6efe7a9e6f5fab715acf56c2ac09ed
// var findTours = Q.nbind(Tour.find, Tour);
var createTour = Q.nbind(Tour.create, Tour);
var updateUser = Q.nbind(User.update, User);
=======
// var getTour = Q.nbind(Tour.findOne, Tour);
// var createCard = Q.nbind(Card.create, Card);
>>>>>>> Add ratedTour field to schema and fix bugs in controller
// var updateCard = Q.nbind(Card.findOneAndUpdate, Card);
// var removeCard = Q.nbind(Card.remove, Card);
// var populateVenues = Q.nbind(Card.populate, Card);

var _photos = ['pictures/brooklynSkyline.jpg', 'pictures/goldenGateBridge.jpg', 'pictures/Park2.JPG', 'pictures/Houses.jpg', 'pictures/Berkeley.jpg', 'pictures/Marina.jpg', 'pictures/Denver.jpg', 'pictures/OutdoorCafe.jpg', 'pictures/LosAngeles.jpg', 'pictures/Tahoe.jpg', 'pictures/cableCar.jpg'];

var _index = Math.floor(Math.random()*_photos.length);

module.exports = {
  // Handles user searching for tours on Search page
  findTour: (req, res) => {
    // Checks for valid inputs and creates a new object with keys for each legitimate input
    var inputObj = req.body.data;
    var newObj = {};
    for (var key in inputObj) {
      if (inputObj[key] !== "") {
        newObj[key] = inputObj[key];
      }
    }
    /* Filters tours based on the price range. Similar idea to Yelps "$" indicator of cost. Leaving this blank returns all prices.
    *   Guide:  $ = $0-26 , $$ = $0-51 , $$$ = $0-76 , $$$$ = $0-101.
    */
    if(newObj.price !== undefined) {
      if (newObj.price === "$") {
        newObj.price = {$lt: 26};
      } else if (newObj.price === "$$") {
        newObj.price = {$lt: 51};
      } else if (newObj.price === "$$$") {
        newObj.price = {$lt: 76};
      } else if (newObj.price === "$$$$") {
        newObj.price = {$lt: 101};
      }
    }

    Tour.find(newObj, function(err, data) {
      if (err) {
        console.log('error');
        res.send(err);
      } else {
        res.send(data);
<<<<<<< 52b4fee0af6efe7a9e6f5fab715acf56c2ac09ed
      }
    });
  },

  /////////////////////
  // CREATE NEW TOUR //
  /////////////////////
  createOne: (req, res) => {
    var tour = {
      userId: req.body.userId,
      title: req.body.title || '',
      description: req.body.description || '',
      photo: req.body.photo || _photos[_index],
      date: req.body.date || {},
      time: req.body.time || {},
      price: req.body.price || 0,
      addPhone: req.body.addPhone || false,
      addTwitter: req.body.addTwitter || false,
      createdAt: new Date()
    };

    createTour(tour)
    .then((newTour) => {
      if (!newTour) {
        res.status(409).json(tour);
      } else {
        updateUser({_id: req.body.userId},
          {$push: {createdTours: newTour._id}},
          {new: true})
        .then((user) => {
          res.status(200).json(newTour);
        })
        .fail((err) => {
          console.error(`Could add tour to user: ${err}`);
          throw new Error(`Could add tour to user: ${err}`);
        });
=======
    Tour.findOne(newObj)
    .then(function (foundTour) {
      if (foundTour) {
        res.status(200).json(foundTour);
>>>>>>> Add ratedTour field to schema and fix bugs in controller
      }
    })
    .fail((err) => {
      console.error(`Could not create new tour: ${err}`);
      throw new Error(`Could not create new tour: ${err}`);
    });
  },

  fetchTour: (req, res) => {
    var id = req.body.data;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      //TODO: Make this into .then (Promissify it)
      Tour.findOne({_id: id}, function(err, data) {
        if (err) {
          throw err;
        } else {
          res.send(data);
        }
      });
    }
  },

  rateTour: (req, res) => {
    var rating = req.body.rating;
    var userId = req.body.userId;
    var tourId = req.body.tourId;

    Tour.findOne({_id: tourId}, function(err, tour){
      if(err){
        res.send(err);
      } else {
        var newRatings = tour.ratings;
        newRatings[userId] = rating;
        Tour.update({_id: tour._id}, {ratings: newRatings}, (err, data) => {
          if(err){
            console.log("There was an error updating the tour");
          } else {
            User.findOne({_id: userId}, function(err, user){
              if(err){
                console.log("There was an error finding the user")
                res.send(err);
              } else {
                console.log(" ==== USER FOUND! ==== ", user);
                var newUserRating = user.ratedTours;
                console.log(" ==== newUserRating ==== ", newUserRating);
                console.log(" ==== user.email ==== ", user.email);
                newUserRating[tourId] = rating;
                User.update({_id: userId}, {ratedTours: newUserRating}, (err, data) => {
                  if(err){
                    console.log("There was an error updating the user");
                  } else {
                    console.log("User updated!!");
                    res.send(data);
                  }
                });
              }
            });
          }
        });
      }
    });

  },

  // Handles user creating a new tour
  //In here we will put all of the multiple locations, so that when the map renders, it renders all of the locations in the
  createTour: function(req,res, next) {
    //chose a random downloaded picture to add to the tour as a background image
    // Construct address and send request to google geocode api to fetch Lat/Lng coordinates for given address
    var address = req.body.streetAddress + ", " + req.body.city + ", " + req.body.state;
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=' + process.env.API_MAP_CLIENT;
    request(url, function (error, response, body) {
      if (error) {
        throw error;
      } else {
        var pictures = ['pictures/brooklynSkyline.jpg', 'pictures/goldenGateBridge.jpg', 'pictures/Park2.JPG', 'pictures/Houses.jpg', 'pictures/Berkeley.jpg', 'pictures/Marina.jpg', 'pictures/Denver.jpg', 'pictures/OutdoorCafe.jpg', 'pictures/LosAngeles.jpg', 'pictures/Tahoe.jpg', 'pictures/cableCar.jpg'];
        var index = Math.floor(Math.random()*pictures.length);
        var pictureUrl = pictures[index];
        // Extract Lat/Lng coordinates from response body, and pass them to newTour object
        var parsedResults = JSON.parse(body).results[0].geometry;
        var LatLng = [parsedResults.location.lat, parsedResults.location.lng];
        var newTour = {
          pictureUrl: pictureUrl,
          name: req.body.name,
          streetAddress: req.body.streetAddress,
          city: req.body.city,
          state: req.body.state,
          price: req.body.price,
          date: req.body.date,
          LatLng: LatLng,
          description: req.body.description
        };

        // Create new Tour document on DB using data stored in newTour object
        //TODO: Make this into .then (Promissify it)
        Tour.create(newTour, function(err, tour) {
          if(err) {
            throw err;
          }
          // Fetch currently signed in user from DB, and add newly created Tour ID to their createdTour's array
          User.findOne({_id : req.session.userId}, function(err, user) {
            if(err) {
              throw err;
            }
            user.createdTours.push(tour._id);
            user.save(function(err, user) {
              if(err) {
               throw err;
              }
              tour.createdBy = user.username;
              tour.save(function(err, tour){
                res.send(user);
              });
            });
          });
        });
        //END OF Promissify
      }
  });
},

  fetchTour: function(req, res){
    var id = req.body.data;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      //TODO: Make this into .then (Promissify it)
      Tour.findOne({_id: id}, function(err, data) {
        if (err) {
          throw err;
        } else {
          res.send(data);
        }
      });
    }
  }
};
