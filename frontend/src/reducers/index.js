import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import weekEntries from './weeklyEntry_reducer';
import monthEntries from './monthlyEntry_reducer';
import auth from './auth_reducer';

const reducers = combineReducers({
  weekEntries,
  monthEntries,
  auth,
  session: sessionReducer
});

export default reducers;
