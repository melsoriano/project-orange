import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterTab extends Component {
  render() {
    return (
      <section className="footerTab_container">
        <div className="hero-foot">
          <div className="tabs is-fullwidth">
            <div className="container">
              <ul>
                <li>
                  <Link to="/">
                    <span className="icon is-medium ">
                      <i className="fa fa-home " />
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/graph">
                    <span className="icon is-medium">
                      <i className="fa fa-area-chart" />
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/settings">
                    <span className="icon is-medium">
                      <i className="fa fa-gear" />
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/quotes">
                    <span className="icon is-medium">
                      <i className="fa fa-quote-right" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default FooterTab;
