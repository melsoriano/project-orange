import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineGraph from './LineGraph';
import { getWeekEntries, getMonthEntries } from '../../actions';

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      currentView: null,
      activeModal: null
    };

    this.modalHander = this.modalHander.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentWillMount() {
    this.props.getWeekEntries();
  }

  modalHander(e, index) {
    this.setState({
      activeModal: index
    });
  }

  hideModal() {
    this.setState({
      activeModal: null
    });
  }

  handleMonthButton = () => {
    this.props.getMonthEntries();
  };

  handleWeekButton = () => {
    this.props.getWeekEntries();
  };

  render() {
    return (
      <div className="container is-mobile">
        <div className="columns is-mobile is-centered">
          <div className="column">
            <button
              className="button is-danger is-fullwidth"
              onClick={this.handleWeekButton}
            >
              Current Week
            </button>
          </div>
          <div className="column">
            <button
              className="button is-danger is-fullwidth"
              onClick={this.handleMonthButton}
            >
              Month
            </button>
          </div>
        </div>
        <LineGraph
          entries={this.props.weekEntries.entries}
          keywords={this.props.weekEntries.keywordSummary}
        />
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { weekEntries: state.weekEntries };
};

const mapDispatchtoProps = dispatch => {
  return {
    getWeekEntries: () => {
      dispatch(getWeekEntries());
    },
    getMonthEntries: () => {
      dispatch(getMonthEntries());
    }
  };
};

const ConnectedGraph = connect(mapStatetoProps, mapDispatchtoProps)(Graph);

export default ConnectedGraph;
