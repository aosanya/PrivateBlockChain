/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');

const Block = require('../Block/Block')
const events = require('events');


/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain{
  constructor(storageAdapter){
    this.storageAdapter = storageAdapter
    this.wireEvents()
    this.storageAdapter.loadData()
  }

  wireEvents(){
    this.storageAdapter.eventEmitter.on('chainLoaded', () => {
      this.chainLoaded()
    })

    this.storageAdapter.eventEmitter.on('chainUpdated', () => {
      this.chainUpdated()
    })
  }

  chain(){
    return this.storageAdapter.data[0]
  }

  chainLoaded(){
    console.log('chain Loaded')
    console.log(this.getBlockHeight())

    if (this.chain().length == 0){
      this.addBlock(new Block("First block in the chain - Genesis block"));
    }
    console.log('- - - - - - - -')
  }

  chainUpdated(){
    console.log('chain updated')
    console.log(this.getBlockHeight())
    console.log('- - - - - - - -')
  }

  // Add new block
  addBlock(newBlock){
    if (this.storageAdapter.isLoaded === false){
      throw 'Chain is not yet loaded'
    }
    // Block height
    newBlock.height = this.chain.length;
    // UTC timestamp
    newBlock.time = new Date().getTime().toString().slice(0,-3);
    // previous block hash
    if(this.chain.length>0){
      newBlock.previousBlockHash = this.chain[this.chain.length-1].hash;
    }
    // Block hash with SHA256 using newBlock and converting to a string
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    // Adding block object to chain
  	this.storageAdapter.addData(newBlock);
  }

  // Get block height
    getBlockHeight(){
      return this.chain().length-1;
    }

    // get block
    getBlock(blockHeight){
      // return object as a single string
      return JSON.parse(JSON.stringify(this.chain[blockHeight]));
    }

    // to move certain components to block
    // validate block
    validateBlock(blockHeight){
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
}

module.exports = Blockchain