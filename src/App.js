import React, { Component } from 'react';
import './App.css';

import SimpleMap from './components/map';
import * as fourSquare from "./apis/foursquare-api";

class App extends Component {

  // Time Square
  myCoords = {
    lat: 40.758896,
    lng: -73.985130
  }

  markers;

  componentDidMount() {
    
  }


  searchPlaces() {
    fourSquare.searchPlaces(this.myCoords.lat, this.myCoords.lng)
    .then(function(data) {
      var items = data.response.groups[0].items;
      console.log(items);
      for(let i = 0; i < items.length; i++) {
        let item = items[i];
        var marker = new window.google.maps.Marker({
          position: { lat: item.venue.location.lat, lng: item.venue.location.lng },
          map: this.map,
          title: item.venue.name
        });
        this.markers.push(marker);
      }
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  render() {
    return (
      <div className="map-wrapper">
        <SimpleMap />
      </div>
    );
  }
}



export default App;
