import { LOGIN_USER } from '../actions';
const initialState = null;

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.auth;
    default:
      return state;
  }
};

export default auth;
