import React, { Component } from "react";
import { connect } from "react-redux";
import { addEntry, getWeekEntries } from "../actions";
import { Redirect } from "react-router-dom";
import { sessionService } from "redux-react-session";
import axios from "axios";
import Logo from "../assets/OrangeLogo_outline.png";
import TwitterLogin from "react-twitter-auth";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEntry: "",
      redirectTo: null,
      isAuthenticated: false,
      user: null,
      token: ""
    };
  }

  componentWillMount() {
    sessionService.loadSession().then(currentSession => null);
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

  onSuccess = response => {
    const token = response.headers.get("x-auth-token");
    response
      .json()
      .then(user => {
        if (token) {
          this.setState({ isAuthenticated: true, user: user, token: token });
        }
      })
      .then(() => {
        this.setState({
          redirectTo: "twitter"
        });
      });
  };

  onFailed = error => {
    alert(error);
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
  };

  render() {
    if (this.state.redirectTo === "graph") {
      return <Redirect to="/graph" />;
    } else if (this.state.redirectTo === "twitter") {
      return <Redirect to="/settings" />;
    }
    let content = this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <TwitterLogin
        loginUrl="http://localhost:3000/auth/twitter"
        onFailure={this.onFailed}
        onSuccess={this.onSuccess}
        requestTokenUrl="http://localhost:3000/auth/twitter/reverse"
        text=""
      />
    );
    return (
      <section className="hero is-fullheight">
        <div className="hero-head">
          <div className="level is-mobile" id="loginBox">
            <div className="level-left">{content}</div>
            <div className="level-right">
              <div className="level-item">
                <button className="button" onClick={this.handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="textarea_container hero-body">
          <div className="container has-text-centered">
            <div className="container has-text-centered orangeLogo">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="columns is-vcentered">
              <div className="questionBox column is-6 is-offset-1 has-text-centered">
                <h1 className="title is-5">
                  Hello {this.props.session.user.username}, how are you doing
                  today?
                </h1>
                <hr />
              </div>
              <div className="textareaBox column is-5">
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Type here!"
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
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStatetoProps = state => {
  return { entries: state.entries, session: state.session };
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
