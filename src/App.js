import React, { Component } from 'react';
import './App.css';

import MapComponent from './components/MapComponent';
import MarkerContentBar from './components/MarkerContentBar';
import * as fourSquare from "./apis/foursquare-api";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myCoords: { lat: 40.758896, lng: -73.985130 },
      markers: []
    };
  }

  componentDidMount() {
    this.searchPlaces();
  }


  searchPlaces() {
    var self = this;
    fourSquare.searchPlaces(this.state.myCoords.lat, this.state.myCoords.lng)
    .then(function(data) {
      var items = data.response.groups[0].items;
      let markers = [];
      for(let i = 0; i < items.length; i++) {
        let item = items[i];
        markers.push({
          id: item.venue.id,
          isOpen: false,
          position: { lat: item.venue.location.lat, lng: item.venue.location.lng },
          title: item.venue.name
        });
      }
      self.setState({
        markers: markers
      });
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  toggleInfoBox(id) {
    this.setState({
      markers: this.state.markers.map(marker => {
          if(marker.id == id) {
            marker.isOpen = !marker.isOpen;
          } else {
            marker.isOpen = false;
          }
          return marker;
        })
      });
  }

  render() {
    return (
      <main>
        <div className="content-bar">
          <MarkerContentBar 
            markers={this.state.markers}
          />
        </div>
        <div className="map-wrapper">
          <MapComponent 
            center={this.state.myCoords}
            markers={this.state.markers}
            toggleInfoBox={(id) => this.toggleInfoBox(id)}
          />
        </div>
      </main>
    );
  }
}



export default App;
