
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
const provider = new providers.JsonRpcProvider('http://159.65.139.58:8545/');

// IPFS
// const IPFS = require('ipfs');

// const node = new IPFS();
//var ipfs = require('ipfs-api')();

var IPFS = require('ipfs-api');

function ipfs_add(json_task, cb) {
    const ipfsApi = IPFS('159.65.139.58', '5001', {protocol: 'http'})
  
    const buffer = Buffer.from(JSON.stringify(json_task));
  
    
    //ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
    ipfsApi.add([{path:'task.json', content: buffer}], { progress: (prog) => console.log(`received: ${prog}`) })    
      .then((response) => {

        debugger;

        console.log(response);

        console.log(response[0].hash);        

      }).catch((err) => {
        console.error(err)
      })
}


// The following methods use Promises
export const colony_CreateTask = async (title, description) => {

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
  }, async function (filesAdded) {
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

// export const ipfs_add = async (json_task, cb) => {
//   debugger;
//   node.on('ready', () => {
//     debugger;
//     console.log("ready");

//     node.files.add({
//       content: Buffer.from(JSON.stringify(json_task))
//     }, (err, filesAdded) => {
//       if (err) {
//         return cb(err, null)
//       }
//       console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash);
//       cb(err, filesAdded);
//     })
//   })
// }



// function ipfs_add(json_task, cb) { 
  //debugger;

  //1
  // ipfs.files.add([new Buffer(JSON.stringify(json_task))]).then((res) => {    
  //   debugger;
  //   cb(res[0]); 
  // }).catch((err) => { console.error(err) });


  //2
  // ipfs.files.add([new Buffer('hello world')], (err, res) => {
  //   debugger;
  //   cb(err, res[0]); 
  // })

  //3
  //TODO un-break this call:
  // ipfs.files.add(new Buffer(JSON.stringify(json_task)), function (err, res){
  //   if(err || !res) return console.error("ipfs add error", err, res);

  //   debugger;
  //   cb(err, res[0]);

  //   // res.forEach(function(file) {
  //   //   console.log('successfully stored', file.Hash);
  //   //   display(file.Hash); 
  //   // });
  // });
//}