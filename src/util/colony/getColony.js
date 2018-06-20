import store from '../../store'

// Import the prerequisites
const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');

export const COLONY_INITIALIZED = 'COLONY_INITIALIZED'
function colonyInitialized(results) {
  return {
    type: COLONY_INITIALIZED,
    payload: results
  }
}

let getColony =  new Promise(async (resolve, reject) => {
    window.addEventListener('load', async function(dispatch) {
        // Import the ColonyNetworkClient
        const { default: ColonyNetworkClient } = require('@colony/colony-js-client');

        // Create an instance of the Trufflepig contract loader
        const loader = new TrufflepigLoader();

        // Create a provider for local TestRPC (Ganache)
        const provider = new providers.JsonRpcProvider('http://159.65.139.58:8545/');

        // Get the private key from the first account from the ganache-accounts
        // through trufflepig 
        const { privateKey } = await loader.getAccount(0);

        // Create a wallet with the private key (so we have a balance we can use)
        const wallet = new Wallet(privateKey, provider);

        // Create an adapter (powered by ethers)
        const adapter = new EthersAdapter({
            loader,
            provider,
            wallet,
        });
        
        // Connect to ColonyNetwork with the adapter!
        const networkClient = new ColonyNetworkClient({ adapter });
        await networkClient.init();

        // Let's deploy a new ERC20 token for our Colony.
        // You could also skip this step and use a pre-existing/deployed contract.  
        const tokenAddress = await networkClient.createToken({
            name: 'Cool Colony Token',
            symbol: 'COLNY',
        }); 

        // Create a cool Colony!
        const {
            eventData: { colonyId, colonyAddress },
        } = await networkClient.createColony.send({ tokenAddress });        

        // For a colony that exists already, you just need its ID:
        const colony = await networkClient.getColonyClient(colonyId); 

        var results = {
            colonyInstance: colony
        } 
        resolve(store.dispatch(colonyInitialized(results)))

    });
});

export default getColony;