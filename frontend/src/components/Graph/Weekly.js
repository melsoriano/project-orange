import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEntries } from '../../actions';
import demoGraph from '../../assets/graph.png';

class Weekly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: []
    };
  }

  render() {
    return (
      <div className="container is-mobile" id="mainBox">
        <img src={demoGraph} alt="demo graph" />
        WEEKLY
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

const ConnectedWeekly = connect(mapStatetoProps, mapDispatchtoProps)(Weekly);

export default ConnectedWeekly;
