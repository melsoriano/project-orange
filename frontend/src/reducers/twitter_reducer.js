import { GET_TWITTER_ENTRIES } from '../actions';
const initialState = [];

const twitterEntries = (state = initialState, action) => {
  switch (action.type) {
    case GET_TWITTER_ENTRIES:
      return action.twitterEntries;

    default:
      return state;
  }
};

export default twitterEntries;
