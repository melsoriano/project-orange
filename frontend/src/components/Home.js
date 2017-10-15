import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import Swipeable from 'react-swipeable';
import Logo from '../assets/orange_logo.svg';

class Home extends Component {
  handleSwipeLeft() {
    alert('Swiped left!');
  }

  handleSwipeRight() {
    alert('Swiped right!');
  }

  handleSubmit = () => {
    alert('Submitted!');
  };

  render() {
    return (
      <Swipeable
        onSwipedLeft={this.handleSwipeLeft}
        onSwipedRight={this.handleSwipeRight}
      >
        <div className="container">
          <img src={Logo} alt="Logo" />
          <div className="level">
            <div className="level-item">
              <div className="field">
                <div className="control">
                  <textarea className="textarea" placeholder="Your feelings" />
                </div>
              </div>
            </div>
            <div className="level-item">
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Swipeable>
    );
  }
}

const mapStatetoProps = state => {
  return { entries: state.entries };
};

const mapDispatchtoProps = dispatch => {
  return {
    addEntry: entry => {
      dispatch(addEntry(entry));
    }
  };
};

const ConnectedHome = connect(mapStatetoProps, mapDispatchtoProps)(Home);

export default ConnectedHome;
