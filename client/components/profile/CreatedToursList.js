import React from 'react'
import CreatedToursListEntry from './CreatedToursListEntry'

export default class CreatedToursList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (typeof this.props.tourIds !== 'undefined') {
      var tourListEntries = this.props.tourIds.map((tourId, key) =>
        <CreatedToursListEntry
          key={key}
          tourId={tourId}
          getTourInfo={this.props.getTourInfo}
        />
      )
    }
    return (
      <div className = "createdToursListParentContainer">
       {tourListEntries ? tourListEntries : null}
      </div>
    )
  }
}
