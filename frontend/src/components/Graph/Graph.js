import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEntries } from '../../actions';
import { Route, Link, Switch } from 'react-router-dom';
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
      <div className="container is-mobile" id="mainBox">
        <div className="columns is-mobile is-centered">
          <div className="column">
            <Link to="/graph/weekly">
              <button className="button is-danger is-fullwidth">
                Current Week
              </button>
            </Link>
          </div>
          <div className="column">
            <Link to="/graph/monthly">
              <button className="button is-danger is-fullwidth">Month</button>
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/graph" render={() => <Weekly />} />
          <Route path="/graph/weekly/" component={Weekly} />
          <Route path="/graph/monthly/" component={Monthly} />
        </Switch>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { entries: state.entries };
};

const mapDispatchtoProps = dispatch => {
  return {
    getEntries: () => {
      dispatch(getEntries());
    }
  };
};

const ConnectedGraph = connect(mapStatetoProps, mapDispatchtoProps)(Graph);

export default ConnectedGraph;
