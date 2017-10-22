import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      newUser: null
    };
  }

  handleLoginClick = () => {
    let userLogin = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userLogin);
    console.log(userLogin);
  };

  handleUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <div className="container is-mobile" id="loginBox">
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left">
            <input
              type="text"
              placeholder="Username"
              className="input"
              onChange={this.handleUsername}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user" />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input
              type="password"
              placeholder="Password"
              className="input"
              onChange={this.handlePassword}
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
              onClick={this.handleLoginClick}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-text">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { entries: state.entries };
};

const mapDispatchtoProps = dispatch => {
  return {
    loginUser: user => {
      dispatch(loginUser(user));
    }
  };
};

const ConnectedLogin = connect(mapStatetoProps, mapDispatchtoProps)(Login);

export default ConnectedLogin;
