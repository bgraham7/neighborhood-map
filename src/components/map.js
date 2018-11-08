import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
class MarkerComponent extends Component {
    render() {
        return(
            <div>
                <i class="fas fa-2x fa-map-marker-alt"></i>
            </div>
        );
    }
}

class SimpleMap extends Component {
    static defaultProps = {
      center: {
        lat: 40.758896,
        lng: -73.985130
      },
      zoom: 11
    };
   
    render() {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDCmIPpcyP0wo2rE9LPDUYtFCHqapw2TIQ" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {this.props.markers.map(marker => (
                <MarkerComponent
                key={marker.id}
                lat={marker.position.lat}
                lng={marker.position.long}
                title={marker.title}
              />
            ))}
            
          </GoogleMapReact>
        </div>
      );
    }
  }
   
  export default SimpleMap;