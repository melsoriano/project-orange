import React, { Component } from "react";
import { connect } from "react-redux";
import { addEntry, getWeekEntries } from "../actions";
import { Redirect } from "react-router-dom";
import { sessionService } from "redux-react-session";
import axios from "axios";
import Logo from "../assets/OrangeLogo_outline.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEntry: "",
      redirectTo: null
    };
  }

  handleSubmit = () => {
    this.props.addEntry(this.state.currentEntry);
    this.props.getWeekEntries();
    this.setState({
      currentEntry: "",
      redirectTo: "graph"
    });
  };

  handleEntryBox = e => {
    this.setState({
      currentEntry: e.target.value
    });
  };

  handleLogout = () => {
    axios.get("/logout").then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      this.setState = {
        redirectTo: null
      };
    });
  };

  render() {
    if (this.state.redirectTo === "graph") {
      return <Redirect to="/graph" />;
    }
    return (
      <section className="hero is-fullheight">
        <div className="hero-head">
          <div className="level is-mobile" id="loginBox">
            <div className="level-left" />
            <div className="level-right">
              <div className="level-item">
                <button className="button" onClick={this.handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
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
                    Submit{" "}
                  </button>
                </div>
              </div>
              <div className="questionBox column is-6 is-offset-1 has-text-centered">
                <h1 className="title is-5">How are you doing today?</h1>
                <hr />
                <h2 className="subtitle is-6">Type in the box above!</h2>
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
