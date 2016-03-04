import React from 'react'
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";

export default class SearchMap extends React.Component {
  
  constructor(props) {
    super(props);
  }

  // If marker is clicked, its respective showInfo property is toggled, either showing or hiding the info
  handleMarkerClick(marker) {
    marker.showInfo = !marker.showInfo;
    this.setState(this.state);
  }

  // Renders the info window for a specific marker when its showInfo property is true (onClick)
  renderInfoWindow(ref, marker) {
    return (
      <InfoWindow key={`${ref}_info_window`} >
        <div>
          {/*marker.name*/}
        </div>  
      </InfoWindow> 
    );
  }

  render() {
    // Adapted from react-google-maps 'Pop-up InfoWindow' exampleg
    console.log('PROPS\n', this.props);
    return (
      <section className="map">
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={12}
              defaultCenter={this.props.defaultCenter}>
              {this.props.markers.map((marker, index) => {
                var ref = `marker_${index}`;
                return (
                  <Marker {...marker} onClick={this.handleMarkerClick.bind(this, marker)}>
                  {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
                  </Marker>
                );
              })}
            </GoogleMap>
          }
        />
      </section>
    );
  };
}