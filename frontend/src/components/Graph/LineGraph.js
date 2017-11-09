import React, { Component } from "react";
import SingleEntry from "./SingleEntry";
import SingleKeyword from "./SingleKeyword";
import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip
} from "victory";
import { withGetScreen } from "react-getscreen";

class LineGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeModal: null
    };

    this.modalHander = this.modalHander.bind(this);
    this.hideModal = this.hideModal.bind(this);
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

  emotionIcon(e) {
    let emotionData = {
      angerScore: e.angerScore,
      disgustScore: e.disgustScore,
      fearScore: e.fearScore,
      joyScore: e.joyScore,
      sadnessScore: e.sadnessScore
    };
    let highestNum = 0;
    let highestEmotion = "";
    Object.entries(emotionData).forEach(([key, value]) => {
      if (value > highestNum) {
        highestNum = value;
        highestEmotion = key;
      }
    });
    switch (highestEmotion) {
      case "angerScore":
        return {
          style: { backgroundColor: "#F95738", borderColor: "#F95738" }
        };
      case "disgustScore":
        return {
          style: { backgroundColor: "#4a7c59", borderColor: "#4a7c59" }
        };
      case "fearScore":
        return {
          style: {
            backgroundColor: "#353129",
            borderColor: "#353129",
            color: "#ecf1fa"
          }
        };
      case "joyScore":
        return {
          style: { backgroundColor: "#f7ed83", borderColor: "#f7ed83" }
        };
      case "sadnessScore":
        return {
          style: {
            backgroundColor: "#084887",
            borderColor: "#084887",
            color: "#ecf1fa"
          }
        };
      default:
        return {
          style: {
            backgroundColor: "white",
            borderColor: "white"
          }
        };
    }
  }

  loadVictoryGraph() {
    if (Array.isArray(this.props.entries)) {
      let xAxis = this.props.entries.length;
      let graphObj = this.props.entries.map(data => {
        let newDate = new Date(data.createdAt);
        let point = {
          x: xAxis,
          y: (data.sentimentScore + 1) * 50,
          date: newDate.toLocaleString(),
          id: data.id
        };
        xAxis--;
        return point;
      });
      return (
        <div>
          <VictoryChart
            height={400}
            width={400}
            theme={VictoryTheme.grayscale}
            domain={{
              x: [
                1,
                this.props.entries.length > 0 &&
                Array.isArray(this.props.entries)
                  ? this.props.entries.length
                  : 2
              ],
              y: [0, 100]
            }}
            style={{
              parent: { stroke: "#f9a346", fill: "#f9a346" }
            }}
            containerComponent={<VictoryVoronoiContainer radius={25} />}
          >
            <VictoryGroup
              data={graphObj}
              color="#c43a31"
              labels={this.props.isMobile() ? null : d => d.date}
              labelComponent={<VictoryTooltip style={{ fontSize: 14 }} />}
            >
              <VictoryLine
                interpolation="monotoneX"
                animate={{
                  duration: 2000
                }}
              />
              <VictoryScatter
                size={6}
                animate={{
                  duration: 2000
                }}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onClick: evt => {
                        return [
                          {
                            target: "data",
                            mutation: props => {
                              this.modalHander(evt, props.datum.id);
                            }
                          }
                        ];
                      }
                    }
                  }
                ]}
              />
            </VictoryGroup>

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
        </div>
      );
    }
  }

  loadKeywords() {
    if (Array.isArray(this.props.keywords)) {
      let counter = -1;
      return this.props.keywords.map(keyword => {
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
    if (Array.isArray(this.props.entries)) {
      return this.props.entries.map(entry => {
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

  loadModals() {
    if (Array.isArray(this.props.data)) {
      return this.props.data.map(entry => {
        let newDate = new Date(entry.createdAt);
        return (
          <div key={entry.id}>
            <SingleEntry
              show={this.state.activeModal === entry.id}
              onHide={this.hideModal}
              entry={entry}
              date={newDate.toLocaleString()}
            />
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        {this.loadVictoryGraph()}
        {this.loadModals()}
        <div className="columns is-multiline is-mobile">
          {this.loadKeywords()}
        </div>
        {this.loadEntries()}
      </div>
    );
  }
}

export default withGetScreen(LineGraph);
