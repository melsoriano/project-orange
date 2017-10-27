import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import querystring from 'querystring';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

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

  handleSubmitClick = () => {
    let newUser = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('/register', querystring.stringify(newUser)).then(() => {
      this.props.onHide();
    });
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={this.props.onHide} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Register</p>
            <button className="delete" onClick={this.props.onHide} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  type="text"
                  className="input"
                  placeholder="Username"
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
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-danger"
              onClick={this.handleSubmitClick}
            >
              Submit
            </button>
            <button className="button is-text" onClick={this.props.onHide}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

Register.PropTypes = {
  closeModal: PropTypes.func,
  modalState: PropTypes.bool,
  title: PropTypes.string
};

export default Register;
