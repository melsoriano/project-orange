import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Graph from './Graph';
const browserHistory = Router.browserHistory;

class Main extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route path="/graph" component={Graph} />
      </div>
    );
  }
}

export default Main;
