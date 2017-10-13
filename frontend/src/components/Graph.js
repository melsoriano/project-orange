import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import Logo from '../assets/orange_logo.svg';

class Graph extends Component {
  handleSwipeLeft() {
    alert('Swiped left!');
  }

  handleSwipeRight() {
    alert('Swiped right!');
  }
  render() {
    return (
      <Swipeable
        onSwipedLeft={this.handleSwipeLeft}
        onSwipedRight={this.handleSwipeRight}
      >
        <div className="container">GRAPH GOES HERE</div>
      </Swipeable>
    );
  }
}

export default Graph;
