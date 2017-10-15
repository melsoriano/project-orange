import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterTab extends Component {
  render() {
    return (
      <div
        className="tabs is-centered is-medium is-boxed is-toggle is-fullwidth"
        id="footer"
      >
        <ul>
          <li>
            <Link to="/graph">
              <span className="icon is-small">
                <i className="fa fa-home" />
              </span>
              <span>Graph</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="icon is-small">
                <i className="fa fa-pie-chart" />
              </span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <span className="icon is-small">
                <i className="fa fa-wrench" />
              </span>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default FooterTab;
