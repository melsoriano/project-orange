import React, { Component } from "react";
import { connect } from "react-redux";
import LineGraph from "./../Graph/LineGraph";
import { getTwitterEntries } from "../../actions";

class Twitter extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: false,
      user: null,
      token: "",
      activeModal: null
    };

    this.modalHander = this.modalHander.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentWillMount() {
    this.props.getTwitterEntries();
  }

  modalHander(e, index) {
    this.setState({
      activeModal: index
    });
  }

  hideModal() {
    this.setState({
      activeModal: null
    });
  }

  render() {
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
        loginUrl="https://projectorange.me/auth/twitter"
        onFailure={this.onFailed}
        onSuccess={this.onSuccess}
        requestTokenUrl="https://projectorange.me/auth/twitter/reverse"
        text=""
      />
    );

    return (
      <div className="container is-mobile" id="paddingTop">
        <div className="mainGraph_container hero is-fullheight">
          <div className="container is-mobile">
            {this.props.twitterEntries.entries ? (
              <LineGraph
                entries={this.props.twitterEntries.entries}
                keywords={this.props.twitterEntries.keywordSummary}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { twitterEntries: state.twitterEntries };
};

const mapDispatchtoProps = dispatch => {
  return {
    getTwitterEntries: () => {
      dispatch(getTwitterEntries());
    }
  };
};

const ConnectedApp = connect(mapStatetoProps, mapDispatchtoProps)(Twitter);

export default ConnectedApp;
