import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SingleEntry extends Component {
  progressColor(e) {
    return {
      angerColor: e.angerScore * 100,
      disgustColor: e.disgustScore * 100,
      fearColor: e.fearScore * 100,
      joyColor: e.joyScore * 100,
      sadnessColor: e.sadnessScore * 100
    };
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
            <p className="modal-card-title">{this.props.date}</p>
            <button className="delete" onClick={this.props.onHide} />
          </header>
          <section className="modal-card-body">
            <div className="content">
              Anger:
              <progress
                className="progress is-light"
                value={this.progressColor(this.props.entry).angerColor}
                max="100"
              />
              Disgust:
              <progress
                className="progress is-success"
                value={this.progressColor(this.props.entry).disgustColor}
                max="100"
              />
              Fear:
              <progress
                className="progress is-dark"
                value={this.progressColor(this.props.entry).fearColor}
                max="100"
              />
              Joy:
              <progress
                className="progress is-warning"
                value={this.progressColor(this.props.entry).joyColor}
                max="100"
              />
              Sadness:
              <progress
                className="progress is-link"
                value={this.progressColor(this.props.entry).sadnessColor}
                max="100"
              />
            </div>
            <div className="content" id="entryText">
              {this.props.entry.text}
            </div>
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

SingleEntry.propTypes = {
  closeModal: PropTypes.func,
  modalState: PropTypes.bool,
  title: PropTypes.string
};

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
