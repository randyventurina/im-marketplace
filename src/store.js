//import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from 'reducer';
//import { createBrowserHistory } from "history";
//import { createBrowserHistory } from "history";
import createHistory from 'history/createBrowserHistory';

//const  browserHistory = createBrowserHistory();

const history = createHistory();

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const routingMiddleware = routerMiddleware(browserHistory)
const routingMiddleware = routerMiddleware(history);

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware
    )
  )
)

export default store
