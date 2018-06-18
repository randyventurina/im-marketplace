//import AuthenticationContract from 'build/contracts/Authentication.json' 
import store from 'store';
import  { colony_CompleteTask }  from 'views/Pages/TaskColonyClientAPI';

//const contract = require('truffle-contract');

// export const   = 'USER_LOGGED_IN';
// function userLoggedIn(user) {
//   return {
//     type: USER_LOGGED_IN,
//     payload: user
//   }
// }



export function completeTask(history) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      //const authentication = contract(AuthenticationContract)
      //authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      //var authenticationInstance

      // Get current ethereum wallet.
      // web3.eth.getCoinbase((error, coinbase) => {
      //   // Log errors, if any.
      //   if (error) {
      //     console.error(error);
      //   }

      //   authentication.deployed().then(function(instance) {
      //     authenticationInstance = instance

      //     // Attempt to login user.
      //     authenticationInstance.login({from: coinbase})
      //     .then(function(result) {
            
      //       // If no error, login user.
      //       var userName = web3.toUtf8(result)

      //       dispatch(userLoggedIn({"name": userName}))
             
      //       return history.push('/dashboard');
      //     })
      //     .catch(function(result) {
      //       // If error, go to signup page.
      //       console.error('Wallet ' + coinbase + ' does not have an account!')
      //       console.error(result);
      //       return history.push('/signup')
      //     })
      //   })
      // })
      colony_CompleteTask()
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
