import React from 'react'
import TourListEntry from './TourListEntry'

export default class TourList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tours: []
    }
  }

  setTours () => {
    this.setState({tours: this.props.tours});
  }

  render() {
    if (typeof this.props.tourIds !== 'undefined') {
      var tourListEntries = this.props.tourIds.map((tourId, key) =>
        <TourListEntry
          key={key}
          tourId={tourId}
          getTourInfo={this.props.getTourInfo}
        />
      )
    }
    return (
      <div className="createdToursListParentContainer">

       {tourListEntries ? tourListEntries : null}
       
      </div>
    )
  }
}