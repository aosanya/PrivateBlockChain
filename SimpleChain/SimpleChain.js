/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');

const Block = require('../Block/Block')
const events = require('events');


/* ===== SimpleChain Class ==========================
|  Class with a constructor for new SimpleChain 		|
|  ================================================*/

class SimpleChain{
  constructor(storageAdapter){
    this.storageAdapter = storageAdapter
    this.wireEvents()
    this.storageAdapter.loadData() // This is done here so that the class can recieve events
    this.chain = this.storageAdapter.data
    this.isAddingBlock = false
    this.mempool = []
  }

  wireEvents(){
    this.storageAdapter.eventEmitter.on('chainLoaded', () => {
      this.chainLoaded()
    })

    this.storageAdapter.eventEmitter.on('chainUpdated', () => {
      this.chainUpdated()
    })

    this.storageAdapter.eventEmitter.on('blockAdded', () => {
      this.blockAdded()
    })
  }

  // Triggered when the chain is initially loaded
  chainLoaded(){
    this.chain = this.storageAdapter.data
    if (this.chain == undefined || this.chain.length == 0){
      this.addBlock(new Block("First block in the chain - Genesis block"));
    }
  }

  // Triggered when the chain is updated
  chainUpdated(){
    this.chain = this.storageAdapter.data
    console.log("block updated")
  }

  // checks if BlockChain is loaded
  checkIfChainIsLoaded(){
    if (this.storageAdapter.isLoaded == false){
      throw 'Chain is not yet loaded'
    }
  }

  // Triggered when a new block is 'mined'
  blockAdded(){
    console.log("block added!")
    this.isAddingBlock = false
    //TO DO : CHeck if there are new blocks to process in mempool
  }

  // Add new block
  addBlock(newBlock){
      if (this.isAddingBlock == true){
        this.mempool.push(newBlock)
        return
      }
      if (this.storageAdapter.isLoaded == false){
        throw 'Chain is not yet loaded' // A loaded chain will always have a genesis block
      }
      this.isAddingBlock = true
      // Block height
      newBlock.height = this.getBlockHeight() + 1;
      // UTC timestamp
      newBlock.time = new Date().getTime().toString().slice(0,-3);
      // previous block hash
      if(this.getBlockHeight() > -1){
        newBlock.previousBlockHash = this.chain[this.getBlockHeight()].hash;
      }
      // Block hash with SHA256 using newBlock and converting to a string
      newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
      // Adding block object to chain
      this.storageAdapter.addData(newBlock);
  }

  // Get block height
    getBlockHeight(){
      return this.chain !== undefined ? this.chain.length-1 : -1;
    }

    // get block
    getBlock(blockHeight){
      // return object as a single string
      return this.storageAdapter.getBlock(blockHeight)
    }

    // to move certain components to block
    // validate block
    validateBlock(blockHeight){
      this.checkIfChainIsLoaded()
      // get block object
      let block = this.getBlock(blockHeight);
      // get block hash
      let blockHash = block.hash;
      // remove block hash to test block integrity
      block.hash = '';
      // generate block hash
      let validBlockHash = SHA256(JSON.stringify(block)).toString();
      // Compare
      if (blockHash===validBlockHash) {
          return true;
        } else {
          console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
          return false;
        }
    }



   // Validate blockchain
    validateChain(){
      this.checkIfChainIsLoaded()
      let errorLog = [];
      for (var i = 0; i < this.chain.length-1; i++) {
        // validate block
        if (!this.validateBlock(i))errorLog.push(i);
        // compare blocks hash link
        let blockHash = this.chain[i].hash;
        let previousHash = this.chain[i+1].previousBlockHash;
        if (blockHash!==previousHash) {
          errorLog.push(i);
        }
      }
      if (errorLog.length>0) {
        console.log('Block errors = ' + errorLog.length);
        console.log('Blocks: '+errorLog);
      } else {
        console.log('No errors detected');
      }
    }

  // Describe
  status(){
    return {"block height":this.getBlockHeight(), "mempool count" : this.mempool.length}
  }
}

module.exports = SimpleChain