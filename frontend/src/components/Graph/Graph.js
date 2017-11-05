import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineGraph from './LineGraph';
import { getWeekEntries, getMonthEntries } from '../../actions';
import SingleEntry from './SingleEntry';
import SingleKeyword from './SingleKeyword';
import { VictoryBar, VictoryGroup, VictoryAxis } from 'victory';

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

  emotionIcon(e) {
    let emotionData = {
      angerScore: e.angerScore,
      disgustScore: e.disgustScore,
      fearScore: e.fearScore,
      joyScore: e.joyScore,
      sadnessScore: e.sadnessScore
    };
    let highestNum = 0;
    let highestEmotion = '';
    Object.entries(emotionData).forEach(([key, value]) => {
      if (value > highestNum) {
        highestNum = value;
        highestEmotion = key;
      }
    });
    switch (highestEmotion) {
      case 'angerScore':
        return {
          style: { backgroundColor: '#F95738', borderColor: '#F95738' }
        };
      case 'disgustScore':
        return {
          style: { backgroundColor: '#4a7c59', borderColor: '#4a7c59' }
        };
      case 'fearScore':
        return {
          style: {
            backgroundColor: '#353129',
            borderColor: '#353129',
            color: '#ecf1fa'
          }
        };
      case 'joyScore':
        return {
          style: { backgroundColor: '#f7ed83', borderColor: '#f7ed83' }
        };
      case 'sadnessScore':
        return {
          style: {
            backgroundColor: '#084887',
            borderColor: '#084887',
            color: '#ecf1fa'
          }
        };
      default:
        return {
          style: {
            backgroundColor: 'white',
            borderColor: 'white'
          }
        };
    }
  }

  loadKeywords() {
    if (Array.isArray(this.props.weekEntries.keywordSummary)) {
      let counter = -1;
      return this.props.weekEntries.keywordSummary.map(keyword => {
        counter++;
        return (
          <div key={counter} className="column is-narrow">
            <button
              className="button keywordButton"
              style={this.emotionIcon(keyword).style}
              onClick={e => this.modalHander(e, keyword.keyword)}
            >
              <span className="icon is-small">
                <i className="fa fa-pie-chart" />
              </span>
              <span>{keyword.keyword}</span>
            </button>
            <SingleKeyword
              show={this.state.activeModal === keyword.keyword}
              onHide={this.hideModal}
              keywordData={keyword}
            />
          </div>
        );
      });
    }
  }

  loadEntries() {
    if (Array.isArray(this.props.weekEntries.entries)) {
      console.log(this.props.weekEntries.entries);
      let newArr = this.props.weekEntries.entries;
      return newArr.map(entry => {
        let sentimentBar = (entry.sentimentScore + 1) * 50;
        let newDate = new Date(entry.createdAt);
        return (
          <article key={entry.id} className="media" id={entry.id}>
            <div className="media-left">
              <span
                className="icon is-large"
                id={entry.id}
                onClick={e => this.modalHander(e, entry.id)}
              >
                <i className="fa fa-bars" />
              </span>
            </div>
            <div className="media-content">
              <div className="content" id="entryText">
                <p id={entry.id} onClick={e => this.modalHander(e, entry.id)}>
                  <small>{newDate.toLocaleString()}</small>
                  <br />

                  <progress
                    className="progress sentimentProgress"
                    value={sentimentBar}
                    max="100"
                  />
                </p>
              </div>
            </div>
            <SingleEntry
              show={this.state.activeModal === entry.id}
              onHide={this.hideModal}
              entry={entry}
              date={newDate.toLocaleString()}
              emotionIcon={this.emotionIcon(entry)}
            />
          </article>
        );
      });
    }
  }

  render() {
    // this.props.weekEntries.entries - all entries for the week
    // this.props.weekEntries.keywordSummary -  top five keywords for the week
    //console.log(typeof this.props.weekEntries.entries);
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
        <LineGraph data={this.props.weekEntries.entries} />

        <br />
        <div className="columns is-multiline is-mobile">
          {this.loadKeywords()}
        </div>
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
    },
    getMonthEntries: () => {
      dispatch(getMonthEntries());
    }
  };
};

const ConnectedGraph = connect(mapStatetoProps, mapDispatchtoProps)(Graph);

export default ConnectedGraph;
