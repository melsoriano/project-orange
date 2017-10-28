import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEntry, getWeekEntries } from '../actions';
import { Redirect } from 'react-router-dom';
import Logo from '../assets/orangelogo.png';
import { sessionService } from 'redux-react-session';
import axios from 'axios';

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
    this.props.getWeekEntries();
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
    axios.get('/logout').then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      this.setState = {
        redirectToGraph: false
      };
    });
  };

  render() {
    if (this.state.redirectToGraph) {
      console.log('redirecting to weekly');
      return <Redirect to="/graph/weekly/" />;
    }
    return (
      <div className="container">
        <nav className="level is-mobile">
          <div className="level-left" />
          <div className="level-right">
            <button className="button is-danger" onClick={this.handleLogout}>
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
                  className="button is-danger is-fullwidth"
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
    addEntry: entry => {
      dispatch(addEntry(entry));
    },
    getWeekEntries: () => {
      dispatch(getWeekEntries());
    }
  };
};

const ConnectedHome = connect(mapStatetoProps, mapDispatchtoProps)(Home);

export default ConnectedHome;
