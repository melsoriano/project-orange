import { LOAD_ENTRIES } from '../actions';
const initialState = [];

const entries = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ENTRIES:
      return action.entries;

    default:
      return state;
  }
};

export default entries;
