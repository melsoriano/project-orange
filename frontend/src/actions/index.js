import axios from 'axios';
export const LOAD_ENTRIES = 'LOAD_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';
export const GET_ONE_ENTRY = 'GET_ONE_ENTRY';

export const addEntry = entry => {
  return dispatch => {
    axios
      .post('/user/entry/new', {
        text: entry,
        type: 'text-entry'
      })
      .then(oneEntry => {
        dispatch({
          type: GET_ONE_ENTRY,
          entries: oneEntry.data
        });
      });
  };
};

export const getEntries = () => {
  return dispatch => {
    axios.get('/user/entries/all').then(entries => {
      dispatch({
        type: LOAD_ENTRIES,
        entries: entries.data
      });
    });
  };
};
