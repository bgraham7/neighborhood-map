import React, { Component } from 'react';
import './MarkerContentBar.css';

class App extends Component {

    // https://medium.com/@griffinmichl/implementing-debounce-in-javascript-eab51a12311e
    debounce(func, wait) {
        let timeout
        return function(...args) {
          const context = this
          clearTimeout(timeout)
          timeout = setTimeout(() => func.apply(context, args), wait)
        }
      }

    componentDidMount() {
        this.searchPlaces = this.debounce(function(query) {
            this.props.searchPlaces(query);
        }, 200);
    }

  render() {
    return (
      <div className="content-bar">
          <h1>NY Places</h1>
          <div className="search-bar">
            <input 
                onKeyUp={(e)=>this.searchPlaces(e.target.value)}
                className="search-box" type="text" />
            <i className="fas fa-search search-icon"></i>
          </div>
          <div className="places">
            {this.props.markers.map(marker => (
                <div className={`place ${marker.isOpen? 'open': ''}`} 
                onClick={() => this.props.toggleInfoBox(marker.id)}
                key={marker.id}>{marker.title}</div>
            ))}
          </div>
      </div>
    );
  }
}



export default App;