import React, { Component } from 'react';
import SingleEntry from './SingleEntry';
import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip
} from 'victory';
import { withGetScreen } from 'react-getscreen';

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

  componentWillMount() {
    console.log(this.props);
  }

  loadVictoryGraph() {
    if (Array.isArray(this.props.data)) {
      let xAxis = this.props.data.length;
      let graphObj = this.props.data.map(data => {
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
              x: [1, this.props.data.length],
              y: [0, 100]
            }}
            style={{
              parent: { stroke: '#f9a346', fill: '#f9a346' }
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
                    target: 'data',
                    eventHandlers: {
                      onClick: evt => {
                        return [
                          {
                            target: 'data',
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
      </div>
    );
  }
}

export default withGetScreen(LineGraph);
