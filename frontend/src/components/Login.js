import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

class Login extends Component {
  render() {
    return (
      <div className="container is-mobile" id="loginBox">
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left">
            <input type="text" placeholder="Username" className="input" />
            <span className="icon is-small is-left">
              <i className="fa fa-user" />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input type="text" placeholder="Password" className="input" />
            <span className="icon is-small is-left">
              <i className="fa fa-unlock" />
            </span>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-danger">Submit</button>
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
    loginUser: (user, password) => {
      dispatch(loginUser(user, password));
    }
  };
};

const ConnectedLogin = connect(mapStatetoProps, mapDispatchtoProps)(Login);

export default ConnectedLogin;
