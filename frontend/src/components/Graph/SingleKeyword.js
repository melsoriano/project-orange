import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  VictoryPie,
  VictoryLegend,
  VictoryChart,
  VictoryPolarAxis
} from "victory";

class SingleKeyword extends Component {
  progressColor(e) {
    return {
      angerColor: e.angerScore * 100,
      disgustColor: e.disgustScore * 100,
      fearColor: e.fearScore * 100,
      joyColor: e.joyScore * 100,
      sadnessColor: e.sadnessScore * 100
    };
  }

  loadRelatedEntries(e) {
    return e.map(entry => {
      let newDate = new Date(entry.createdAt);
      return (
        <article key={entry.createdAt} className="media">
          <div className="media-content">
            <div className="content" id="entryText">
              <p>
                <small>{newDate.toLocaleString()}</small>
                <br />
                {entry.text}
              </p>
            </div>
          </div>
        </article>
      );
    });
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={this.props.onHide} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.keywordData.keyword}</p>
            <button className="delete" onClick={this.props.onHide} />
          </header>
          <section className="modal-card-body">
            <div className="content">
              <VictoryChart polar height={475} width={400}>
                <VictoryLegend
                  x={50}
                  title="Legend"
                  centerTitle
                  orientation="horizontal"
                  gutter={10}
                  style={{
                    border: { stroke: "black" },
                    title: { fontSize: 20 }
                  }}
                  data={[
                    { name: "Anger", symbol: { fill: "#F95738" } },
                    { name: "Disgust", symbol: { fill: "#4a7c59" } },
                    { name: "Fear", symbol: { fill: "#353129" } },
                    { name: "Joy", symbol: { fill: "#f7ed83" } },
                    { name: "Sadness", symbol: { fill: "#084887" } }
                  ]}
                />
                <VictoryPie
                  colorScale={[
                    "#F95738",
                    "#4a7c59",
                    "#353129",
                    "#f7ed83",
                    "#084887"
                  ]}
                  data={[
                    { x: null, y: this.props.keywordData.angerScore * 100 },
                    { x: null, y: this.props.keywordData.disgustScore * 100 },
                    { x: null, y: this.props.keywordData.fearScore * 100 },
                    { x: null, y: this.props.keywordData.joyScore * 100 },
                    { x: null, y: this.props.keywordData.sadnessScore * 100 }
                  ]}
                  animate={{
                    onLoad: { duration: 2000 }
                  }}
                />
                <VictoryPolarAxis
                  style={{
                    axis: { stroke: "none" },
                    tickLabels: { fill: "none" }
                  }}
                />
              </VictoryChart>
            </div>
            {this.loadRelatedEntries(this.props.keywordData.entries)}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={this.props.onHide}>
              Close
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

SingleKeyword.propTypes = {
  closeModal: PropTypes.func,
  modalState: PropTypes.bool,
  title: PropTypes.string
};

export default SingleKeyword;
