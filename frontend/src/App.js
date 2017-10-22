import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import FooterTab from './components/FooterTab';
import Main from './components/Main';
import Login from './components/Login';
//import 'bulma/css/bulma.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
const browserHistory = Router.browserHistory;

class App extends Component {
  ifLoggedIn() {
    return (
      <Router history={browserHistory}>
        <div className="container">
          <Main />
          <FooterTab />
        </div>
      </Router>
    );
  }

  ifNotLoggedIn() {
    return <Login />;
  }

  render() {
    return this.ifNotLoggedIn();
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
