import React, { Component } from "react";
import { connect } from "react-redux";
import LineGraph from "./LineGraph";
import { getWeekEntries, getMonthEntries } from "../../actions";

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
      <section className="graphContainer">
        <div className="monthlyWeeklyButtons">
          <div className="container">
            <div
              className="button is-primary is-inverted is-outlined"
              onClick={this.handleWeekButton}
            >
              Current Week
            </div>
          </div>
          <div className="container">
            <div
              className="button is-primary is-inverted is-outlined"
              onClick={this.handleMonthButton}
            >
              Month
            </div>
          </div>
        </div>

        <LineGraph
          entries={this.props.weekEntries.entries}
          keywords={this.props.weekEntries.keywordSummary}
        />
      </section>
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
