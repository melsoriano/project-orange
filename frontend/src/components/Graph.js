import React, { Component } from 'react';
import Swipeable from 'react-swipeable';

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
        <div className="container" id="mainBox">
          GRAPH GOES HERE
        </div>
      </Swipeable>
    );
  }
}

export default Graph;
