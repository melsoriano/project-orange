import { USER_INFO } from "../actions";
const initialState = [];

const userData = (state = [], action) => {
  switch (action.type) {
    case USER_DATA:
      return action.userData;

    default:
      return state;
  }
};
