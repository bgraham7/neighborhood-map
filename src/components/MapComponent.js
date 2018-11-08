import React, { Component } from 'react';   
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDCmIPpcyP0wo2rE9LPDUYtFCHqapw2TIQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={props.center}
  >
  {props.markers.map(marker => (
      <Marker key={marker.id} position={{ lat: marker.position.lat, lng: marker.position.lng }} />
  ))}
  </GoogleMap>
);

export default MapComponent;