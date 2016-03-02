import React from 'react'
import $ from 'jquery'

export default class CreatedToursListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      name: "",
      city: "",
      date: "",
      price: ""
    }
  }

  // Fetches tour info from DB before rendering so component renders with correct information
  componentDidMount () {
    $.post('/api/fetchTourInfo', {data: this.props.tourId})
    .done( (data) => {
      var date = data.date.substring(0,10);
      this.setState({
        data: data,
        name : data.name,
        city : data.city,
        date : date,
        price : data.price
      })
    })
    .fail( (err) => {
      console.log('error getProfile', err);
    })
  }
  
  render() {
    return (
       <div className='createTourForm'>
          <div className='tourContainer'
            onClick={ () => this.props.getTourInfo(this.state.data)}
            style={{backgroundImage: 'url(' + this.state.data.pictureUrl + ')', backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundPosition: 'center center'}} >
            <div className='searchListEntryName'> {this.state.name} </div>
            <div className='searchListEntryPrice'> ${this.state.price} </div>
          </div>
      </div>
    )
  }
}