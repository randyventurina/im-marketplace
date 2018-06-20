import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import indexRoutes from "routes/index.jsx"; 

import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";

import getWeb3 from 'util/web3/getWeb3';
import getColony from 'util/colony/getColony';

// Redux Store
import store from 'store';

const  browserHistory = createBrowserHistory();


getWeb3.then(results => {
  console.log('Web3 initialized!')
}).catch(() => {
  console.log('Error in web3 initialization.')
});

getColony.then(results =>{
  console.log("Colony Client initialized!");
}).catch(() => { 
  console.log('Error in Colony Client initialization.')  
})


ReactDOM.render(
  <Provider store={store}>  
    <Router history={browserHistory}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
