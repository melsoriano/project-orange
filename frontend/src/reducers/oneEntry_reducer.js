import { GET_ONE_ENTRY } from '../actions';
const initialState = [];

const singleEntry = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_ONE_ENTRY:
      return action.singleEntry;

    default:
      return state;
  }
};

export default singleEntry;
