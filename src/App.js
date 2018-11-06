import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import loadScript from "./functions/loadScript";

class App extends Component {

  map;

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDCmIPpcyP0wo2rE9LPDUYtFCHqapw2TIQ&callback=initMap");
  }

  componentDidMount() {
    this.renderMap();
    window.initMap = this.initMap;
  }

  initMap() {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
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
