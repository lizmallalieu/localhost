import React from 'react'
import $ from 'jquery'

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
        location: 'default',
        price:'1',
        date:'1/1/1'
      },
      showTourModal: false
    }
  }

  // Fetches all tours matching the passed-in search criteria (options)
  getToursFromDatabase (options) {
    $.post('/search', {data: options})
    .done(tours => {
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

// This is passed down to SearchList, which is passed down to SearchListEntry
getTourInfo(tour) {
  // Props will be passed into here, which contains all of the tour information
  this.setState({
    currentTour: tour,
    showTourModal: true
  })
}

// This is passed down to Tour. Hides the Tour modal.
closeTourModal() {
  this.setState({showTourModal:false});
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
  var tourProps = {page: 'search', currentTour: this.state.currentTour, closeTourModal: this.closeTourModal.bind(this), show: this.state.showTourModal}
  var searchListProps = {tours: this.state.tours, getTourInfo: this.getTourInfo.bind(this)}
  return (
    <div className="searchContainer">
      <Tour {...tourProps} />
        <div className="searchList-BarContainer">
          <SearchBar getToursFromDatabase = {this.getToursFromDatabase.bind(this)}/>
          <SearchList {...searchListProps}/>
          {this.state.notFound ? noResultMessage : null}
        </div>
    <div className='searchMapContainer'>
    {this.state.tours.length > 0 ? <SearchMap tours={this.state.tours}/> : null}
    </div>
    </div>
  )
}
}
