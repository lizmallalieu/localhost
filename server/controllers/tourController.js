var Tour = require('../models/tourModel.js');
var User = require('../models/userModel.js');
var Q = require('q');
var request = require('request');

// var findTours = Q.nbind(Tour.find, Tour);
var createTour = Q.nbind(Tour.create, Tour);
var updateUser = Q.nbind(User.update, User);
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
     ratings: {},
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
       console.log("THE TOUR :", tour)
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
               var userRatings = user.ratedTours;
               var newRating = userRatings[tourId];
               User.update({_id: userId}, {userRatings: newRating}, (err, data) => {
                 if(err){
                   console.log("There was an error updating the user");
                 } else {
                   res.send(data);
                 }
               });
             }
           });
         }
       });
     }
    });
   }
 };
