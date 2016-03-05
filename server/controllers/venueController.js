var Venue = require('../models/venueModel');
var httpRequest = require('request-promise');
var Q = require('q');

/* ---------------- */
/*     PROMISES     */
/* ---------------- */

var findVenue = Q.nbind(Venue.findOne, Venue);
var findVenues = Q.nbind(Venue.find, Venue);
var createVenue = Q.nbind(Venue.create, Venue);
var updateVenue = Q.nbind(Venue.findOneAndUpdate, Venue);
var removeVenue = Q.nbind(Venue.remove, Venue);

/* -------------------- */
/*     EXTERNAL API     */
/* -------------------- */

const foursquare = {
  uri: 'https://api.foursquare.com/v2/venues/',
  query: {
    client_id: process.env.API_FSQ_CLIENT,
    client_secret: process.env.API_FSQ_SECRET,
    v: '20160225'
  }
};

/* ------------------------ */
/*     VENUE CONTROLLER     */
/* ------------------------ */

module.exports = {
  /////////////////
  // FETCH VENUE //
  /////////////////
  fetchOne: (req, res) => {
    var venueId = req.query.venueId;
    findVenue({_id: venueId})
    .then(venue => {
      if (venue) {
        res.status(200).json(venue);
      } else {
        httpRequest({
          uri: `${foursquare.uri}${venueId}`,
          qs: foursquare.query,
          json: true
        })
        .then((fsq) => {
          var venue = fsq.response.venue
          createVenue({
            venueId: venueId || '',
            name: venue.name || '',
            photoSuffix: venue.bestPhoto ?
              venue.bestPhoto.suffix || '' : '',
            address: venue.location.address || '',
            phone: venue.contact ? '' :
              venue.contact.formattedPhone || '',
            rating: venue.rating || '',
            price: !venue.price ? '' :
              venue.price.tier,
            tier: !venue.price ? '' :
              venue.price.message,
            tips: venue.stats.tipCount,
            visitors: venue.stats.visitsCount,
            checkins: venue.stats.checkinsCount,
            hasMenu: venue.hasMenu || '',
            menu: !venue.hasMenu ? '' :
              venue.menu.externalUrl || venue.menu.mobileUrl || '',
            url: venue.url || venue.canonicalUrl || '',
            twitter: venue.contact ? '' :
              venue.contact.twitter || '',
            facebook: venue.contact ? '' :
              venue.contact.facebook || '',
            category: venue.categories[0].shortName || '',
            hours: !venue.hours ? [] :
              venue.hours.timeframes.map(time => {
                return {days: time.days, open: time.open}
              }),
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .then((newVenue) => {
            res.status(201).json(newVenue);
          })
          .fail((err) => {
            console.error(`Could not create new venue: ${err}`);
            throw new Error(`Could not create new venue: ${err}`);
          });
        })
        .catch((err) => {
          console.error(`Failed to get venue data from Foursquare: ${err}`);
          throw new Error(`Failed to get venue data from Foursquare: ${err}`);
        });
      }
    })
    .fail((err) => {
      console.error(`Failed to get venue data from database: ${err}`);
      throw new Error(`Failed to get venue data from database: ${err}`);
    });
  },

  ///////////////////////////
  // FETCH MULTIPLE VENUES //
  ///////////////////////////
  fetchAll: (req, res) => {
    findVenue({_id: {$in: req.body.venues}})
    .then((venues) => {
      if (venues.length) {
        res.status(200).json(venues);
      } else {
        res.status(404).send('No venues found');
      }
    })
    .fail((err) => {
      console.error(`Failed to fetch multiple venue data from database: ${err}`);
      throw new Error(`Failed to fetch multiple venue data from database: ${err}`);
    });
  },

  ///////////////////
  // SEARCH VENUES //
  ///////////////////
  searchAll: (req, res) => {
    var re = new RegExp(req.query.search, 'i');
    findVenues({name: re})
    .then((venues) => {
      if (venues.length) {
        res.status(200).json(venues);
      } else {
        res.status(204).send('No venues found');
      }
    })
    .fail((err) => {
      console.error(`Failed to search multiple venue data from database: ${err}`);
      throw new Error(`Failed to search multiple venue data from database: ${err}`);
    });
  },

  //////////////////////////////////
  // SEARCH FOURSQUARE FOR VENUES //
  //////////////////////////////////
  searchNew: (req, res) => {
    var search = req.query.search.split(' ').join('+')
    var qs = foursquare.query;
    qs.v = 20130815;
    qs.near = 94102;
    qs.query = search;
    httpRequest({
      uri: `${foursquare.uri}/search`,
      qs: qs,
      json: true
    })
    .then((result) => {
      if(result) {
        res.status(200).json(result.response.venues);
      } else {
        console.error('Could not find any results for ' + query);
        res.status(404).json('Could not find any results for ' + query);
      }
    })
    .catch(function(err) {
      console.error('Could not query Foursquare with bad request: ' + err);
      res.status(400).json('Could not query Foursquare with bad request: ' + err);
    });
  },

  //////////////////
  // UPDATE VENUE //
  //////////////////
  updateOne: (req, res) => {
    const venueId = req.body.venueId;
    httpRequest({
      uri: `${foursquare.uri}${venueId}`,
      qs: foursquare.query,
      json: true
    })
    .then((fsq) => {
      var venue = fsq.response.venue;
      var update = {
        venueId: venueId || '',
        name: venue.name || '',
        photoSuffix: venue.bestPhoto.suffix || '',
        address: venue.location.address || '',
        rating: venue.rating || '',
        price: !venue.price ? '' :
          venue.price.tier,
        tier: !venue.price ? '' :
          venue.price.message,
        tips: venue.stats.tipCount,
        visitors: venue.stats.visitsCount,
        menu: !venue.hasMenu ? '' :
          venue.menu.externalUrl || venue.menu.mobileUrl || '',
        url: venue.url || venue.canonicalUrl || '',
        twitter: venue.contact ? '' :
          venue.contact.twitter || '',
        facebook: venue.contact ? '' :
          venue.contact.facebook || '',
        category: venue.categories[0].shortName || '',
        hours: !venue.hours ? [] :
          venue.hours.timeframes.map(time => {
            return {days: time.days, open: time.open}
          }),
        updatedAt: new Date()
      };

      updateVenue({venueId: venueId}, update, {new: true})
      .then(updatedVenue => {
        res.status(201).json(updatedVenue);
      })
      .fail((err) => {
        console.error(`Could not update new venue: ${err}`);
        throw new Error(`Could not update new venue: ${err}`);
      });
    })
    .catch((err) => {
      console.error(`Failed to get venue data from Foursquare: ${err}`);
      throw new Error(`Failed to get venue data from Foursquare: ${err}`);
    });
  },

  //////////////////
  // REMOVE VENUE //
  //////////////////
  removeOne: (req, res) => {
    removeVenue({venueId: req.body.venueId})
    .then(function (status) {
      res.status(200).json(status);
    })
    .fail(function (err) {
      console.error('Could not delete venue');
      throw new Error('Could not delete venue');
    })
  }
};
