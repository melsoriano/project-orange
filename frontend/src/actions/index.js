import axios from 'axios';
export const LOAD_ENTRIES = 'LOAD_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';

export const addEntry = entry => {
  return dispatch => {
    axios
      .post('/entry/new', {
        text: entry,
        type: 'text-entry'
      })
      .then(entry => {
        dispatch({
          type: LOAD_ENTRIES,
          entries: entry.data
        });
      });
  };
};
