import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Logo from './assets/orange_logo.svg';
import FooterTab from './components/FooterTab';
import Main from './components/Main';
import 'bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
const browserHistory = Router.browserHistory;

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
      <Router history={browserHistory}>
        <div className="container">
          <Main />
          <FooterTab />
        </div>
      </Router>
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
