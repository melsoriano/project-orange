import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  render() {
    if (!this.props.show) {
      return null;
    }
    console.log(this.props.keywordData);
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
              Anger:
              <progress
                className="progress is-light"
                value={this.progressColor(this.props.keywordData).angerColor}
                max="100"
              />
            </div>
            <div className="content">
              Disgust:
              <progress
                className="progress is-success"
                value={this.progressColor(this.props.keywordData).disgustColor}
                max="100"
              />
            </div>
            <div className="content">
              Fear:
              <progress
                className="progress is-dark"
                value={this.progressColor(this.props.keywordData).fearColor}
                max="100"
              />
            </div>
            <div className="content">
              Joy:
              <progress
                className="progress is-warning"
                value={this.progressColor(this.props.keywordData).joyColor}
                max="100"
              />
            </div>
            <div className="content">
              Sadness:
              <progress
                className="progress is-link"
                value={this.progressColor(this.props.keywordData).sadnessColor}
                max="100"
              />
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

SingleKeyword.propTypes = {
  closeModal: PropTypes.func,
  modalState: PropTypes.bool,
  title: PropTypes.string
};

export default SingleKeyword;
