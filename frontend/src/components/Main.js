import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Graph from "./Graph/Graph";
import Settings from "./Settings/Settings";
import FooterTab from "./FooterTab";

class Main extends Component {
  render() {
    return (
      <section className="Main">
        <Route exact path="/" component={Home} />
        <Route path="/graph" component={Graph} />
        <Route path="/settings" component={Settings} />
        <div className="FooterTab">
          <FooterTab />
        </div>
      </section>
    );
  }
}

export default Main;
