import React, { Component } from 'react';
import './MarkerContentBar.css';

class App extends Component {
  render() {
    return (
      <div className="content-bar">
          <h1>NY Places</h1>
          <div className="search-bar">
            <input className="search-box" type="text" />
            <i className="fas fa-search search-icon"></i>
          </div>
          <div className="places">
            {this.props.markers.map(marker => (
                <div className={`place ${marker.isOpen? 'open': ''}`} 
                key={marker.id}>{marker.title}</div>
            ))}
          </div>
      </div>
    );
  }
}



export default App;