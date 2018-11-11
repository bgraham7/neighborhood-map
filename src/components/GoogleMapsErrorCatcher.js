import React from 'react';   

class GoogleMapsErrorCatcher extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        return <div class="gm-err-container"></div>;
      }
      return this.props.children;
    }
  }

  export default GoogleMapsErrorCatcher;