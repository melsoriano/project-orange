import { USER_DATA } from "../actions";

const userData = (state = [], action) => {
  switch (action.type) {
    case USER_DATA:
      return action.user;

    default:
      return state;
  }
};

export default userData;
