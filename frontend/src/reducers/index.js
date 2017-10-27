import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import entries from './entries_reducer.js';
import weekEntries from './weeklyEntry_reducer';
import monthEntries from './monthlyEntry_reducer';
import auth from './auth_reducer';

const reducers = combineReducers({
  entries,
  weekEntries,
  monthEntries,
  auth,
  session: sessionReducer
});

export default reducers;
