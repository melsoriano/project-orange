import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEntries } from '../../actions';
import { Route, Link, Redirect } from 'react-router-dom';
import Swipeable from 'react-swipeable';
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

  handleSwipeLeft() {
    alert('Swiped left!');
  }

  handleSwipeRight() {
    alert('Swiped right!');
  }

  componentWillMount() {
    this.props.getEntries();
  }

  render() {
    console.log(this.props.entries);
    return (
      <Swipeable
        onSwipedLeft={this.handleSwipeLeft}
        onSwipedRight={this.handleSwipeRight}
      >
        <div className="container is-mobile" id="mainBox">
          <div className="columns is-mobile">
            <Link to="/graph/weekly">
              <div className="column">
                <button className="button is-danger">Current Week</button>
              </div>
            </Link>
            <Link to="/graph/monthly">
              <div className="column">
                <button className="button is-danger">Month</button>
              </div>
            </Link>
          </div>
          <Route exact path="/graph" render={() => <Weekly />} />
          <Route path="/graph/weekly/" component={Weekly} />
          <Route path="/graph/monthly/" component={Monthly} />
        </div>
      </Swipeable>
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
