import { combineReducers } from 'redux';
import entries from './entries_reducer.js';

const reducers = combineReducers({
  entries
});

export default reducers;
