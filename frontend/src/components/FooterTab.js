import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterTab extends Component {
  render() {
    return (
      <nav className="navbar" id="footer">
        <div className="navbar-brand">
          <p className="navbar-item">
            <Link to="/">Home</Link>
          </p>
          <p className="navbar-item">
            <Link to="/graph">Graph</Link>
          </p>
        </div>
      </nav>
    );
  }
}

export default FooterTab;
