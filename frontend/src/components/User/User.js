import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user
    };
  }

  componentWillMount() {
    this.props.loadUser();
  }

  handleUserButton = () => {
    this.props.loadUser();
    console.log(this.props.loadUser.user);
  };

  render() {
    return (
      <div>
        <button onClick={this.props.handleUserButton}>CLICK ME</button>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { userData: state.userData };
};

const mapDispatchtoProps = dispatch => {
  return {
    loadUser: () => {
      dispatch(loadUser());
    }
  };
};

const ConnectedUser = connect(mapStatetoProps, mapDispatchtoProps)(User);

export default ConnectedUser;
