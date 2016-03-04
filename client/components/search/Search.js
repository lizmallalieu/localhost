import React from 'react'
import $ from 'jquery'
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";

import SearchBar from './SearchBar'
import SearchList from './SearchList'
import SearchMap from './SearchMap'
import {Link} from 'react-router'
import Tour from '../tour/Tour'


export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tours: [],
      notFound: false,
      currentTour: {
        name: 'default',
        price:'1',
        date:'',
        venues: [
          [37.781422, -122.406322],
          [37.787204, -122.412992],
          [37.764044, -122.474129]
        ] 
      },
      markers: [],
      defaultCenter: {
        lat: 37.781422,
        lng: -122.406322
      },
      showTourModal: false,
    }
  }

  // Fetches all tours matching the passed-in search criteria (options)
  getToursFromDatabase (options) {
    $.post('/api/search', {data: options})
    .done(tours => {
      console.log('in done');
      // Checks if the tours is empty array
      if (tours.length === 0) {
        this.setState ({
          notFound: true,
          tours: []
        })
      } else {
        // When it finds, changes back to false so it is not shown
        this.setState ({
          notFound: false,
          tours: []
        })
      }
      this.setState ({
        tours: tours
      })
    })
    .fail(({responseJSON}) => {
      responseJSON.error.errors.forEach((err) =>
      console.error(err)
    )
  });
};

// Creates markers for each passed in tour, giving them the proper Lat/Lng coords for proper map placement
showVenuesInTour = (tour) => {
  var venues = tour.venues;
  venues = [ [37.781422, -122.406322], [37.787204, -122.412992], [37.764044, -122.474129] ] 
  var markers = [];
  venues.forEach(function(venue) {
    // Gives each marker Lat/Lng coordinates, a name, and a showInfo property set to false initially
    var marker = {};
    // marker.name = venue.name;
    // marker.showInfo = false;
    marker.position = {};
    marker.position.lat = venue[0];
    marker.position.lng = venue[1];
    markers.push(marker);
  });

  return markers;
};


/* getTourInfo for John to use */
// This is passed down to SearchList, which is passed down to SearchListEntry
getTourInfo = (tour) => {
  // Props will be passed into here, which contains all of the tour information
  console.log('CLICKED TOUR_______', tour);
  var markers = this.showVenuesInTour(tour);
  console.log('THIS', this);
  this.setState({
    currentTour: tour,
    markers: markers,
    defaultCenter: {
      lat: tour.LatLng[0],
      lng: tour.LatLng[1]
    },
    showTourModal: false
  })
  console.log('markers', markers);
  console.log('this.state after setState     ', this.state);
}

// This is passed down to Tour. Hides the Tour modal.
closeTourModal () {
  this.setState({showTourModal: false});
};

changeFound () {
  this.setState ({
    notFound: false
  })
};

/* <SearchMap/> renders correctly first time, but doesn't re-render with subsequent searches unless it is demounted first. To handle this,
* every time a search is made, the 'tours' state property is first set to an empty array (lines 31/37) so the <SearchMap/> will be demounted,
* then immediately afterward set to equal the tours returned from the post request to the server (line 41), so the <SearchMap/> is remounted
*  with the new search results.
*/
render() {
  var noResultMessage = <p> Could not find the result, please try again </p>
  var tourProps = {
    page: 'search',
    currentTour: this.state.currentTour,
    closeTourModal: this.closeTourModal.bind(this),
    show: this.state.showTourModal
  }
  var searchListProps = {
    tours: this.state.tours,
    getTourInfo: this.getTourInfo.bind(this),
  }

  return (
    <div className="searchContainer">
      <Tour {...tourProps} />
        <div className="searchList-BarContainer">
          <SearchBar getToursFromDatabase = {this.getToursFromDatabase.bind(this)}/>
          <SearchList {...searchListProps}/>
          {this.state.notFound ? noResultMessage : null}
        </div>
      <div className='searchMapContainer'>
      {/*{this.state.tours.length > 0 ? <SearchMap tours={this.state.tours}/> : null}*/}
        <SearchMap 
          // venues={this.state.currentTour.venues}
          // showVenuesInTour={this.showVenuesInTour.bind(this)}
          markers={this.state.markers}
          defaultCenter={this.state.defaultCenter}
        />
      </div>
    </div>
  )
}
}
