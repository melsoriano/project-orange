import React, { Component } from "react";
import { Link } from "react-router-dom";

class FooterTab extends Component {
  render() {
    return (
      <section className="footerNavbar">
        <nav className="navbar">
          <ul className="nav_links has-text-centered">
            <li>
              <a href="/">
                <span className="icon is-medium ">
                  <i className="fa fa-home " />
                </span>
              </a>
            </li>
            <li>
              <a href="/graph">
                <span className="icon is-medium">
                  <i className="fa fa-area-chart" />
                </span>
              </a>
            </li>
            <li>
              <a href="/settings">
                <span className="icon is-medium">
                  <i className="fa fa-gear" />
                </span>
              </a>
            </li>
            <li>
              <a href="/settings">
                <span className="icon is-medium">
                  <i className="fa fa-gear" />
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default FooterTab;
