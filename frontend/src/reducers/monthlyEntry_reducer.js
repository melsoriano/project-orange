import { GET_MONTH_ENTRIES } from '../actions';
const initialState = [];

const monthEntries = (state = initialState, action) => {
  switch (action.type) {
    case GET_MONTH_ENTRIES:
      return action.monthEntries;

    default:
      return state;
  }
};

export default monthEntries;
