import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import FooterTab from "./components/FooterTab";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import User from "./components/User/User";
import { getWeekEntries } from "./actions";
import "../node_modules/font-awesome/css/font-awesome.min.css";
const browserHistory = Router.browserHistory;

class App extends Component {
  ifLoggedIn() {
    return (
      <Router history={browserHistory}>
        <div className="container">
          <Main />
          <User />
          <FooterTab />
        </div>
      </Router>
    );
  }

  ifNotLoggedIn() {
    return <Login />;
  }

  render() {
    return this.props.authenticated ? this.ifLoggedIn() : this.ifNotLoggedIn();
  }
}

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    checked: state.session.checked,
    authenticated: state.session.authenticated
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getWeekEntries: () => {
      dispatch(getWeekEntries());
    }
  };
};

const ConnectedApp = connect(mapStatetoProps, mapDispatchtoProps)(App);

export default ConnectedApp;
