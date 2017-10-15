import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Graph from './Graph';

class Main extends Component {
  render() {
    return (
      <div className="container" id="mainBox">
        <Route exact path="/" component={Home} />
        <Route path="/graph" component={Graph} />
      </div>
    );
  }
}

export default Main;
