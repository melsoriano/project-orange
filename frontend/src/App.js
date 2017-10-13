import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import { connect } from 'react-redux';
import 'bulma/css/bulma.css';
import './App.css';

class App extends Component {
  handleSwipeUp() {
    alert('swiped up!');
  }

  handleSwipeDown() {
    alert('swiped down!');
  }

  handleSwipeLeft() {
    alert('swiped left!');
  }

  handleSwipeRight() {
    alert('swiped right!');
  }

  render() {
    return (
      <Swipeable
        onSwipedUp={this.handleSwipeUp}
        onSwipedDown={this.handleSwipeDown}
        onSwipedLeft={this.handleSwipeLeft}
        onSwipedRight={this.handleSwipeRight}
      >
        <div className="container">
          <h1 className="App-title">Orange</h1>
        </div>
      </Swipeable>
    );
  }
}

const mapStatetoProps = state => {
  return { entries: state.entries };
};

const mapDispatchtoProps = dispatch => {
  return {};
};

const ConnectedApp = connect(mapStatetoProps, mapDispatchtoProps)(App);

export default ConnectedApp;
