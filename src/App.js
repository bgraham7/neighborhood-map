import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  map;

  renderMap = () => {
    loadScripts("https://maps.googleapis.com/maps/api/js?key=AIzaSyDfJH3UfcNnAjFju7c5PExoGuPx_eaFklE&callback=initMap");
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

function loadScripts(url) {
  var index = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
