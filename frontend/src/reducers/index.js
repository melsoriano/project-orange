import { combineReducers } from "redux";
import { sessionReducer } from "redux-react-session";
import weekEntries from "./weeklyEntry_reducer";
import userData from "./user_reducer";
import twitterEntries from "./twitter_reducer";
import auth from "./auth_reducer";

const reducers = combineReducers({
  weekEntries,
  twitterEntries,
  auth,
  userData,
  session: sessionReducer
});
export default reducers;
