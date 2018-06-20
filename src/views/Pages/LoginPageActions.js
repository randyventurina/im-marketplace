import AuthenticationContract from 'build/contracts/Authentication.json'
//import { browserHistory } from 'react-router'
// import { createBrowserHistory } from "history"; 
import store from 'store'

const contract = require('truffle-contract')

// const  browserHistory = createBrowserHistory(); 

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser(history) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      debugger;
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract);
      authentication.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance;

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
         
        authentication.deployed().then(function(instance) {
          authenticationInstance = instance;

          // Attempt to login user.
          authenticationInstance
          .login({from: coinbase})
          .then(function(result) {
            
            // If no error, login user.
            var userName = web3.toUtf8(result)
            debugger;
            //get my current metamask address 
            dispatch(userLoggedIn({name: userName, user_address: my_address}));

            return history.push('/dashboard');
          })
          .catch(function(result) {
            // If error, go to signup page. 
            debugger;
            console.error(result);
            return history.push('/signup');
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
 