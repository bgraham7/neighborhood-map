import React, { Component } from 'react';   
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

import './MapComponent.css';

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
      <Marker key={marker.id} 
              onClick={() => props.toggleInfoBox(marker.id)}
              position={{ lat: marker.position.lat, lng: marker.position.lng }}>
        {marker.isOpen && 
          <InfoWindow
              options={{ enableEventPropagation: true,alignBottom: true }}
            >
            <div className="info-box">
              <div className="info-box-content">
                {marker.title}
              </div>
            </div>
          </InfoWindow>}
      </Marker>
  ))}
  </GoogleMap>
);

export default MapComponent;