import { combineReducers } from 'redux';
import entries from './entries_reducer.js';
import weekEntries from './weeklyEntry_reducer';
import auth from './auth_reducer';

const reducers = combineReducers({
  entries,
  weekEntries,
  auth
});

export default reducers;
