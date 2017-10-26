import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEntries, addEntry } from '../actions';
import { Redirect } from 'react-router-dom';
import Logo from '../assets/orangelogo.png';
import { sessionService } from 'redux-react-session';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEntry: '',
      redirectToGraph: false
    };
  }

  handleSubmit = () => {
    this.props.addEntry(this.state.currentEntry);
    this.setState({
      currentEntry: '',
      redirectToGraph: true
    });
  };

  handleEntryBox = e => {
    this.setState({
      currentEntry: e.target.value
    });
  };

  handleLogout = () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    this.setState = {
      redirectToGraph: false
    };
  };

  render() {
    if (this.state.redirectToGraph) {
      return <Redirect to="/graph" />;
    }
    return (
      <div className="container">
        <nav className="level is-mobile">
          <div className="level-left" />
          <div className="level-right">
            <button className="button is-primary" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </nav>
        <div className="container" id="mainBox">
          <img src={Logo} alt="Logo" />
          <div className="level">
            <div className="level-item">
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Your feelings"
                    onChange={this.handleEntryBox}
                    value={this.state.currentEntry}
                  />
                </div>
              </div>
            </div>
            <div className="level-item">
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
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
    getEntries: () => {
      dispatch(getEntries());
    },
    addEntry: entry => {
      dispatch(addEntry(entry));
    }
  };
};

const ConnectedHome = connect(mapStatetoProps, mapDispatchtoProps)(Home);

export default ConnectedHome;
