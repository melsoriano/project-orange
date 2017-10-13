import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import Logo from '../assets/orange_logo.svg';

class Home extends Component {
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
        <div className="container">
          <img src={Logo} alt="Logo" />
        </div>
      </Swipeable>
    );
  }
}

export default Home;
