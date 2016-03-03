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
<<<<<<< 6aaad8ae5faf88b8b96ec85e48e0b54ffccee12c
          {/*marker.name*/}
        </div>  
      </InfoWindow> 
=======
          {marker.name}
        </div>
      </InfoWindow>
>>>>>>> Outline solutuion to connecting pins
    );
  }

  render() {
    //Google documentation http://www.mapsplugin.com/Google-Maps/Documentation-of-plugin-Googlemap/parameters-of-plugin-google-maps.html
    //Seems to work for using diroptimize.
    //Will loop over that 
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
