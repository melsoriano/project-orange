import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUser, updateUser } from "../../actions";

class User extends Component {
  componentWillMount() {
    this.props.loadUser();
    this.props.updateUser(this.props.user.username);
  }

  render() {
    console.log("PROPS IN RENDER>>", this.props.user);

    return <div>HELLO</div>;
  }
}

const mapStateToProps = state => ({
  user: state.userData
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => {
    dispatch(loadUser());
  },
  updateUser: user => {
    dispatch(updateUser(user));
  }
});

const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User);

export default ConnectedUser;
