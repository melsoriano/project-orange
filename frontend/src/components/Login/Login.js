import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions";
import axios from "axios";
import querystring from "querystring";
import Logo from "../../assets/orange-logo.png";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      newUser: null
    };
  }

  handleLoginClick = e => {
    let userLogin = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userLogin);
    e.preventDefault();
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

  handleEnterPress = e => {
    if (e.key === "Enter") {
      let userLogin = {
        username: this.state.username,
        password: this.state.password
      };

      this.props.loginUser(userLogin);
    }
  };

  handleNewUser = () => {
    let newUser = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post("/register", querystring.stringify(newUser));
  };

  render() {
    return (
      <div className="login-container">
        <canvas id="background-canvas" />
        <div className="login-page">
          <form className="form">
            <img src={Logo} className="logo" alt="logo" />
            <p className="subtitle">
              Take control of your mind today, live better tomorrow.
            </p>
            <form id="register-form" className="switch-form">
              <input
                type="text"
                placeholder="Username"
                className="input"
                onChange={this.handleUsername.bind(this)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                onChange={this.handlePassword.bind(this)}
                onKeyPress={this.handleEnterPress.bind(this)}
              />
              <button onClick={this.handleNewUser.bind(this)}> create </button>
              <p className="message">
                Already registered ? <span> Sign In </span>
              </p>
            </form>
            <form
              id="login-form"
              className="switch-form"
              onSubmit={this.handleLoginClick.bind(this)}
            >
              <input
                type="text"
                placeholder="Username"
                className="input"
                onChange={this.handleUsername.bind(this)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                onChange={this.handlePassword.bind(this)}
                onKeyPress={this.handleEnterPress.bind(this)}
              />
              <button className="login-button" type="submit" value="submit">
                login
              </button>
              <p className="message">
                Not registered ? <span> Create an account </span>
              </p>
            </form>
          </form>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    session: state.session
  };
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
