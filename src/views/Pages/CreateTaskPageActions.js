import store from 'store'; 
 
export  function createTask(history, title, description) {
 
  let web3 = store.getState().web3.web3Instance;
  let colonyClient = store.getState().colony.colonyInstance;
 
  if (typeof web3 !== null && typeof colonyClient !== null) {

    return async function(dispatch) {
      
      //refers to task.json content: QmRiywCKRBHD4nu4As1NgVfTRNPJVUGNpsVsCrRXY4pdLz
      var task_hash = "QmRiywCKRBHD4nu4As1NgVfTRNPJVUGNpsVsCrRXY4pdLz";
      const { eventData: { taskId } } = await colonyClient.createTask.send({ specificationHash: task_hash, domainId: 1, });
      console.log("taskid" + taskId);
      debugger;
       
    }
  } else {
    console.error('Web3 or colony is not initialized.');
  }
}

