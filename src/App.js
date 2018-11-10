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
      markers: [],
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.searchPlaces();
  }

  searchPlaces(query = "") {
    var self = this;
    fourSquare.searchPlaces(this.state.myCoords.lat, this.state.myCoords.lng, query)
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
        this.setError("An error happened talking with FourSquare");
    });
  }

  keyPressMove(key) {
    if(!this.state.markers.length || (key !== 38 && key !== 40)) {
      return;
    }

    var newIndex = 0;
    var selected = this.state.markers.find(m=> m.isOpen);
    if(selected) {
      var currentIndex = this.state.markers.indexOf(selected);
      var lastIndex = this.state.markers.length - 1;
      switch(key) {
        case 38: //up\
          if(currentIndex == 0) {
            newIndex = lastIndex;
          } else {
            newIndex = currentIndex - 1;
          }
          break;
        case 40:
          if(currentIndex != lastIndex) {
            newIndex = currentIndex + 1;
          }
          break;
      }
    }
    var marker = this.state.markers[newIndex];
    this.toggleInfoBox(marker.id);
  }

  toggleInfoBox(id) {
    this.setState({
      markers: this.state.markers.map(marker => {
          if(marker.id === id) {
            marker.isOpen = !marker.isOpen;
          } else {
            marker.isOpen = false;
          }
          return marker;
        })
      });
  }

  setError(error) {
    this.setState({
      errorMessage: error
    })
  }

  render() {
    return (
      <main>
        <div className="content-bar">
          <MarkerContentBar 
            markers={this.state.markers}
            toggleInfoBox={(id) => this.toggleInfoBox(id)}
            keyPressMove={(key) => this.keyPressMove(key)}
            searchPlaces={(query) => this.searchPlaces(query)}
          />
        </div>
        <div className="map-wrapper">
          <MapComponent 
            center={this.state.myCoords}
            markers={this.state.markers}
            toggleInfoBox={(id) => this.toggleInfoBox(id)}
          />
        </div>
        {this.state.errorMessage && (
          <div className="error-message">
            {this.state.errorMessage}
          </div>
        )}
      </main>
    );
  }
}



export default App;
