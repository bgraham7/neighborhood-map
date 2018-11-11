import React, { Component } from 'react';
import './MarkerContentBar.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          menuOpen: false
        };
      }

    // https://medium.com/@griffinmichl/implementing-debounce-in-javascript-eab51a12311e
    // Prevents a function from running too often, wait is the number of milliseconds
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

    keyToggleMenu(key) {
        if(key === 13 || key === 32) {
            this.toggleMenu();
        }
    }

    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }

  render() {
    return (
      <section className="content-bar">
          <header className="header" onKeyUp={(e) => this.keyToggleMenu(e.which)}>
            <div className="hamburger" onClick={() => this.toggleMenu()} tabIndex="0">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <h1>NY Places</h1>
          </header>
          
          <div className={'place-filter-pane ' + (this.state.menuOpen? 'open' : '')} >
            <div className="search-bar">
                <input 
                    role="search" aria-label="Search box to filter locations"
                    onKeyUp={(e)=>this.searchPlaces(e.target.value)}
                    className="search-box" type="text" />
                <i className="fas fa-search search-icon"></i>
            </div>
            <ul className="places" tabIndex="0" onKeyUp={(e) => this.props.keyPressMove(e.which)}>
                {this.props.markers.map(marker => (
                    <li className={`place ${marker.isOpen? 'open': ''}`} 
                    onClick={() => this.props.toggleInfoBox(marker.id)}
                    key={marker.id}>{marker.title}</li>
                ))}
            </ul>
          </div>
          
      </section>
    );
  }
}



export default App;