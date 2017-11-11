import React, { Component } from "react";
import { Link } from "react-router-dom";

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
                      <i className="fa fa-twitter" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/info">
                    <span className="icon is-medium">
                      <i className="fa fa-info-circle" />
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
