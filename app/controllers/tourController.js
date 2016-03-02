var tourModel = require('../models/tourModel.js');
var userModel = require('../models/userModel.js');
var Q = require('q');


var getTour = Q.nbind(tourModel.findOne, tourModel);
// var createCard = Q.nbind(Card.create, Card);
// var updateCard = Q.nbind(Card.findOneAndUpdate, Card);
// var removeCard = Q.nbind(Card.remove, Card);
// var populateVenues = Q.nbind(Card.populate, Card);

module.exports = {
  // Handles user searching for tours on Search page
  findTour: function(req, res, next){
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

    tourModel.getTour(newObj)
    .then(function (foundTour) {
      if (foundTour) {
        res.status(200).json(foundTour);
      }
    })
    .fail(function (err) {
      console.error('Could not find tour');
      throw new Error('Could not find tour');
    });
  },

  // Handles user creating a new tour
  createTour: function(req,res, next) {
    //chose a random downloaded picture to add to the tour as a background image
    // Construct address and send request to google geocode api to fetch Lat/Lng coordinates for given address
    var address = req.body.streetAddress + ", " + req.body.city + ", " + req.body.state;
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyBTKobIvbTZTl469EUXd9iM6Mx_08kJAxM';
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
        tourModel.create(newTour, function(err, tour) {
          if(err) {
            throw err;
          }

        // Fetch currently signed in user from DB, and add newly created Tour ID to their createdTour's array
        //TODO: Make this into .then (Promissify it)
          userModel.getTour({_id : req.session.userId}, function(err, user) {
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

  fetchTour: function(req, res) {
    var id = req.body.data;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {

      //TODO: Make this into .then (Promissify it)
      tourModel.findOne({_id: id}, function(err, data) {
        if (err) {
          throw err;
        } else {
          res.send(data);
        }
      });
    }
  }

};
