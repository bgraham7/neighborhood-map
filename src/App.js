import React, { Component } from 'react';
import './App.css';

import loadScript from "./functions/loadScript";
import * as fourSquare from "./apis/foursquare-api";

class App extends Component {

  // Time Square
  myCoords = {
    lat: 40.758896,
    long: -73.985130
  }

  map;

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDCmIPpcyP0wo2rE9LPDUYtFCHqapw2TIQ&callback=initMap");
    fourSquare.searchPlaces(this.myCoords.lat, this.myCoords.long)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  componentDidMount() {
    this.renderMap();
    window.initMap = this.initMap;
    window.myCoords = this.myCoords;
  }

  initMap() {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: this.myCoords.lat, lng: this.myCoords.long},
      zoom: 8
    });
  }

  render() {
    return (
      <div className="App">
        <div id="map"></div>
      </div>
    );
  }
}



export default App;
