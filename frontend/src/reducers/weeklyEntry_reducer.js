import { GET_WEEK_ENTRIES } from '../actions';
const initialState = [];

const weekEntries = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEEK_ENTRIES:
      return action.weekEntries;

    default:
      return state;
  }
};

export default weekEntries;
