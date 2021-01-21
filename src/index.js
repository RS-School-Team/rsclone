import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initialState} from './assets/initialState '
import { Provider } from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from "redux-thunk";
import rootReducer from "./redux/rootReducer";

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(
        thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/*<App />*/}
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
