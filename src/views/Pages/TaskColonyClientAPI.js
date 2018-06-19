
// Import the prerequisites
const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');

// Import the ColonyNetworkClient
const { default: ColonyNetworkClient } = require('@colony/colony-js-client');

// Create an instance of the Trufflepig contract loader
const loader = new TrufflepigLoader();

// Create a provider for local TestRPC (Ganache)
//const provider = new providers.JsonRpcProvider('http://localhost:8545/');
const provider = new providers.JsonRpcProvider('http://206.189.33.215:8545/');

// IPFS
const IPFS = require('ipfs');
const node = new IPFS();

// The following methods use Promises
export const colony_CreateTask = async (title, description) => {

  // Get the private key from the first account from the ganache-accounts
  // through trufflepig
  debugger;
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

  console.log('Token address: ' + tokenAddress);

  // Create a cool Colony!
  const {
    eventData: { colonyId, colonyAddress },
  } = await networkClient.createColony.send({ tokenAddress });

  // Congrats, you've created a Colony!
  console.log('Colony ID: ' + colonyId);
  console.log('Colony address: ' + colonyAddress);

  // For a colony that exists already, you just need its ID:
  const colonyClient = await networkClient.getColonyClient(colonyId);

  // Or alternatively, just its address:
  // const colonyClient = await networkClient.getColonyClientByAddress(colonyAddress);

  // You can also get the Meta Colony:
  const metaColonyClient = await networkClient.getMetaColonyClient();
  console.log('Meta Colony address: ' + metaColonyClient.contract.address);

  //Add JSON to IPFS
  await ipfs_add({
    title: title,
    description: description,
    status: 'NOT_STARTED'
  }, async function (error, filesAdded) {
    debugger;
    //Create Task
    const { eventData: { taskId } } = await colonyClient.createTask.send({ specificationHash: filesAdded[0].hash, domainId: 1, });

    console.log("New Task ID: " + taskId);
  });
};

export const colony_AcceptTask = () => {
  return null;
}

export const colony_CompleteTask = () => {
  return null;
}

export const ipfs_add = async (json_task, cb) => {
  debugger;

  json_task = json_task || {
    id: '1',
    title: 'test: create ui design',
    description: 'test: ask randy of sample template for the ui.',
    status: 'not-started'
  };
  

  node.on('ready', () => {
    console.log("ready");

    node.files.add({
      content: Buffer.from(JSON.stringify(json_task))
    }, (err, filesAdded) => {
      if (err) {
        return cb(err, null)
      }
      console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash);
      cb(err, filesAdded);
    })
  })
}