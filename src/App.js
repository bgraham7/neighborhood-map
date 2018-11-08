import React, { Component } from 'react';
import './App.css';

import SimpleMap from './components/map';
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
      console.log(items);
      let markers = [];
      for(let i = 0; i < items.length; i++) {
        let item = items[i];
        markers.push({
          id: item.venue.id,
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

  render() {
    return (
      <div className="map-wrapper">
        <SimpleMap
          markers={this.state.markers}
        />
      </div>
    );
  }
}



export default App;
