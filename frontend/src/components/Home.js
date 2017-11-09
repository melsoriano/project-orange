import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEntry, getWeekEntries } from '../actions';
import { Redirect } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../assets/OrangeLogo_outline.png';

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
      return <Redirect to="/graph" />;
    }
    return (
      <section className="hero is-fullheight">
        <div className="hero-head">
          <div className="container has-text-centered orangeLogo">
            <img src={Logo} alt="Logo" />
          </div>
        </div>

        <div className="textarea_container hero-body">
          <div className="container has-text-centered">
            <div className="columns is-vcentered">
              <div className="textareaBox column is-5">
                <div className="control">
                  <textarea
                    className="textarea"
                    placehold="HOW ARE YOU DOING"
                    row="10"
                    onChange={this.handleEntryBox}
                    value={this.state.currentEntry}
                  />
                  <button
                    className="button is-primary is-inverted is-fullwidth"
                    onClick={this.handleSubmit}
                  >
                    Submit{' '}
                  </button>
                </div>
              </div>
              <div className="questionBox column is-6 is-offset-1 has-text-centered">
                <h1 className="title is-5">QUESTION OF THE DAY!</h1>
                <hr />
                <h2 className="subtitle is-6">
                  Let this cover page describe a product or service.
                </h2>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
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
