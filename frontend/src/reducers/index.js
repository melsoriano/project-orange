import { combineReducers } from 'redux';
import entries from './entries_reducer.js';
import weekEntries from './weeklyEntry_reducer';

const reducers = combineReducers({
  entries,
  weekEntries
});

export default reducers;
