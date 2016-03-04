import React from 'react'
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";

export default class SearchListEntry extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div 
			  style={
					{
						backgroundImage: 'url(' + this.props.tour.pictureUrl + ')',
						backgroundRepeat: 'no-repeat',
						backgroundSize:'cover',
						backgroundPosition: 'center center'
					}
				} 
				className='searchTourEntry'
				onClick={this.props.getTourInfo.bind(null, this.props.tour)}
			>
				<div className='searchListEntryName'>{this.props.tour.name}</div>
				<div className='searchListEntryPrice'>${this.props.tour.price}</div>
			</div>
		)
	}
};


