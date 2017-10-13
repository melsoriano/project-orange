import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterTab extends Component {
  render() {
    return (
      //   <nav className="navbar" id="footer">
      //     <div className="navbar-brand">
      //       <p className="navbar-item">
      //         <Link to="/graph">Graph</Link>
      //       </p>
      //       <p className="navbar-item">
      //         <Link to="/">Home</Link>
      //       </p>
      //     </div>
      //   </nav>
      <div
        className="tabs is-centered is-medium is-toggle is-fullwidth"
        id="footer"
      >
        <ul>
          <li>
            <Link to="/graph">Graph</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default FooterTab;
