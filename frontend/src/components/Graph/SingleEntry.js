import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SingleEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container is-mobile">
        <div>Single Entry!</div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { weekEntries: state.weekEntries };
};

const mapDispatchtoProps = dispatch => {
  return {};
};

const ConnectedSingleEntry = connect(mapStatetoProps, mapDispatchtoProps)(
  SingleEntry
);

export default ConnectedSingleEntry;
