import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeekEntries, getMonthEntries } from '../../actions';
import SingleEntry from './SingleEntry';
import AngryIcon from '../../assets/anger.jpg';
import DisgustIcon from '../../assets/disgust.jpg';
import FearIcon from '../../assets/fear.jpg';
import JoyIcon from '../../assets/joy.jpg';
import SadnessIcon from '../../assets/sadness.jpg';
import SingleKeyword from './SingleKeyword';
import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis
} from 'victory';

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
    console.log(this.props.weekEntries.entries);
  };

  handleWeekButton = () => {
    this.props.getWeekEntries();
    console.log(this.props.weekEntries.entries);
  };

  loadVictoryGraph() {
    if (Array.isArray(this.props.weekEntries.entries)) {
      let xAxis = this.props.weekEntries.entries.length;
      let graphObj = this.props.weekEntries.entries.map(data => {
        let newDate = new Date(data.createdAt);
        let point = {
          x: xAxis,
          y: (data.sentimentScore + 1) * 50,
          date: newDate.toLocaleString()
        };
        xAxis--;
        return point;
      });
      return (
        <VictoryChart
          height={400}
          width={400}
          theme={VictoryTheme.grayscale}
          domain={{
            x: [1, this.props.weekEntries.entries.length],
            y: [0, 100]
          }}
          style={{
            parent: { stroke: '#f9a346', fill: '#f9a346' }
          }}
        >
          <VictoryLine
            interpolation="monotoneX"
            animate={{
              duration: 2000
            }}
            data={graphObj}
            style={{
              data: { stroke: '#c43a31' }
            }}
          />
          <VictoryScatter
            animate={{
              duration: 2000
            }}
            style={{
              data: { fill: '#c43a31' },
              labels: { fill: 'white', fontWeight: 'bold', fontSize: 20 }
            }}
            size={5}
            data={graphObj}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: 'data',
                        mutation: props => {
                          const fill = props.style && props.style.fill;
                          return fill === 'black'
                            ? null
                            : { style: { fill: 'black' } };
                        }
                      },
                      {
                        target: 'labels',
                        mutation: props => {
                          return props.text ? null : { text: props.datum.date };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
          <VictoryAxis
            label="Entries"
            style={{ axisLabel: { padding: 35, fontSize: 17 } }}
          />
          <VictoryAxis
            dependentAxis
            label="Sentiment Score 0(bad) - 100(good)"
            style={{ axisLabel: { padding: 35, fontSize: 17 } }}
          />
        </VictoryChart>
      );
    }
  }

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
          icon: AngryIcon,
          style: { backgroundColor: '#F95738', borderColor: '#F95738' }
        };
      case 'disgustScore':
        return {
          icon: DisgustIcon,
          style: { backgroundColor: '#4a7c59', borderColor: '#4a7c59' }
        };
      case 'fearScore':
        return {
          icon: FearIcon,
          style: {
            backgroundColor: '#353129',
            borderColor: '#353129',
            color: '#ecf1fa'
          }
        };
      case 'joyScore':
        return {
          icon: JoyIcon,
          style: { backgroundColor: '#f7ed83', borderColor: '#f7ed83' }
        };
      case 'sadnessScore':
        return {
          icon: SadnessIcon,
          style: {
            backgroundColor: '#084887',
            borderColor: '#084887',
            color: '#ecf1fa'
          }
        };
      default:
        return {
          icon: null,
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
      let newArr = this.props.weekEntries.entries;
      return newArr.map(entry => {
        let newDate = new Date(entry.createdAt);
        return (
          <article key={entry.id} className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={this.emotionIcon(entry).icon} alt="" />
              </p>
            </figure>
            <div className="media-content">
              <div className="content" id="entryText">
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
        {this.loadVictoryGraph()}

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

const ConnectedWeekly = connect(mapStatetoProps, mapDispatchtoProps)(Weekly);

export default ConnectedWeekly;
