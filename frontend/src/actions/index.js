import axios from "axios";
import querystring from "querystring";
import { sessionService } from "redux-react-session";
export const ADD_ENTRY = "ADD_ENTRY";
export const GET_WEEK_ENTRIES = "GET_WEEK_ENTRIES";
export const LOAD_AUTH = "LOAD_AUTH";
export const LOGIN_USER = "LOGIN_USER";
export const GET_MONTH_ENTRIES = "GET_MONTH_ENTRIES";
export const USER_DATA = "USER_DATA";

export const loadUser = user => {
  return dispatch => {
    axios.get("/profile").then(user => {
      console.log("hitting user", user);
      dispatch({
        type: USER_DATA,
        userData: user.data
      });
    });
  };
};

export const addEntry = entry => {
  return dispatch => {
    axios
      .post("/user/entry/new", {
        text: entry,
        type: "text-entry"
      })
      .then(entries => {
        dispatch({
          type: GET_WEEK_ENTRIES,
          weekEntries: entries.data
        });
      });
  };
};

export const getWeekEntries = () => {
  return dispatch => {
    axios.get("/user/entries/weekly").then(entries => {
      dispatch({
        type: GET_WEEK_ENTRIES,
        weekEntries: entries.data
      });
    });
  };
};

export const getMonthEntries = () => {
  return dispatch => {
    axios.get("/user/entries/monthly").then(entries => {
      dispatch({
        type: GET_WEEK_ENTRIES,
        weekEntries: entries.data
      });
    });
  };
};

export const loginUser = user => {
  return dispatch => {
    axios.post("/login", querystring.stringify(user)).then(res => {
      const { token } = res;
      sessionService.saveSession({ token }).then(() => {
        sessionService.saveUser(res.data);
      });
      dispatch({
        type: LOGIN_USER,
        auth: res.data
      });
    });
  };
};
