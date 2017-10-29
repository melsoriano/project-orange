import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      twitterUsername: '',
      twitterPassword: '',
      twitterLoggedIn: false
    };
  }

  handleTwitterUsername = e => {
    this.setState({
      twitterUsername: e.target.value
    });
  };

  handleTwitterPassword = e => {
    this.setState({
      twitterPassword: e.target.value
    });
  };

  handleTwitterSubmitClick = e => {
    var twitterLogin = {
      username: this.state.twitterUsername,
      password: this.state.twitterPassword
    };
    axios.get('/twitterlogin/connect').then(() => {
      console.log(twitterLogin);
    });
  };

  render() {
    return (
      <div className="container">
        <div className="container is-mobile" id="mainBox">
          <nav className="level">
            <div className="level-item has-text-centered">
              <h1 className="title is-4">Twitter Login</h1>
            </div>
          </nav>
        </div>
        <div className="container" id="loginBox">
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left">
              <input
                type="text"
                className="input"
                placeholder="Username"
                onChange={this.handleTwitterUsername}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-twitter" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                type="password"
                className="input"
                placeholder="Password"
                onChange={this.handleTwitterPassword}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-unlock" />
              </span>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-danger"
                onClick={this.handleTwitterSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { authenticated: state.session.authenticated };
};

const mapDispatchtoProps = dispatch => {
  return {};
};

const ConnectedSettings = connect(mapStatetoProps, mapDispatchtoProps)(
  Settings
);

export default ConnectedSettings;
