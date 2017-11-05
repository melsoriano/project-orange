import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from '../../actions';
import { Route, Link } from 'react-router-dom';
import Weekly from './Weekly';
import Monthly from './Monthly';

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      currentPage: 'weekly'
    };
  }

  render() {
     return (
      <div className="container">
           <Route path="/graph" component={Weekly} />
          <Route path="/graph/weekly/" component={Weekly} />
          <Route path="/graph/monthly/" component={Monthly} />
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { entries: state.entries };
};

const mapDispatchtoProps = dispatch => {
  return {};
};

const ConnectedGraph = connect(mapStatetoProps, mapDispatchtoProps)(Graph);

export default ConnectedGraph;
