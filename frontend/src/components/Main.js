import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Graph from "./Graph/Graph";
import Settings from "./Settings/Settings";
import User from "./User/User";
import Info from "./Info";

class Main extends Component {
  render() {
    return (
      <div className="mainPage_container">
        <Route exact path="/" component={Home} />
        <Route path="/graph" component={Graph} />
        <Route path="/settings" component={Settings} />
        <Route path="/profile" component={User} />
        <Route path="/info" component={Info} />
      </div>
    );
  }
}

export default Main;
