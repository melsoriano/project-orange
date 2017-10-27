import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeekEntries } from '../../actions';
import demoGraph from '../../assets/graph.png';
import SingleEntry from './SingleEntry';

class Weekly extends Component {
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

  componentDidMount() {
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

  loadEntries() {
    if (Array.isArray(this.props.weekEntries.entries)) {
      return this.props.weekEntries.entries.map(entry => {
        let newDate = new Date(entry.createdAt);
        return (
          <article key={entry.id} className="media" id="showText">
            <div className="media-content">
              <div className="content">
                <p id={entry.id} onClick={e => this.modalHander(e, entry.id)}>
                  <small>{newDate.toLocaleString()}</small>
                  <br />
                  {entry.text}
                </p>
              </div>
            </div>
            <SingleEntry
              show={this.state.activeModal === entry.id}
              onHide={this.hideModal}
              entry={entry}
              date={newDate.toLocaleString()}
            />
          </article>
        );
      });
    }
  }

  handleOpenTextClick(bool) {
    this.setState({ bool: !this.state.bool });
  }

  render() {
    // this.props.weekEntries.entries - all entries for the week
    // this.props.weekEntries.keywordSummary -  top five keywords for the week
    return (
      <div className="container is-mobile" id="mainBox">
        <img src={demoGraph} alt="demo graph" />
        {this.loadEntries()}
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
    }
  };
};

const ConnectedWeekly = connect(mapStatetoProps, mapDispatchtoProps)(Weekly);

export default ConnectedWeekly;
