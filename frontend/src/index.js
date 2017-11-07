import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-session';
import './index.css';
import reducers from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);
const options = {
  refreshOnCheckAuth: false,
  redirectPath: '/',
  driver: 'COOKIES'
};

sessionService.initSessionService(store, options);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
