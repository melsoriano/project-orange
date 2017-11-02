import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from '../../actions';
import demoGraph from '../../assets/graph.png';

class Monthly extends Component {
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
        MONTHLY
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

const ConnectedMonthly = connect(mapStatetoProps, mapDispatchtoProps)(Monthly);

export default ConnectedMonthly;
