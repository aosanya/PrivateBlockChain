const SimpleChain = require('../SimpleChain');
const Adapter = require('../../storageAdapters/LevelDb/Adapter');
const Block = require('../../Block/Block');

let storageAdapter = new Adapter();
let chain = new SimpleChain(storageAdapter);

(function theLoop (i) {
    setTimeout(function () {
        console.log(" ")
        console.log("--- Block Status ---")
        console.log(chain.status());
        let blockHeight = chain.getBlockHeight()
        if (blockHeight > -1){
            console.log("--- Newest Block ---")
            console.log(chain.getBlock(blockHeight))
        }
        let blockTest = new Block("Test Block");
        chain.addBlock(blockTest);
        i++;
        if (i < 10) theLoop(i);
    }, 1000);
  })(0);

setTimeout(function () {
    console.log("")
    console.log("--- Validating Block 0 ---")
    console.log(chain.validateBlock(0))

    console.log("")
    console.log("--- Validating Block 1 ---")
    console.log(chain.validateBlock(1))

    console.log("")
    console.log("--- Validating Chain ---")
    console.log(chain.validateChain())

    console.log("")
    console.log("--- Validating Mutated Block ---")
    chain.chain[0] = { key: '0', value: '{"hash":"hacked!!!!","height":0,"body":"First block in the chain - Genesis block","time":"1539920954","previousBlockHash":""}' }
    console.log(chain.validateBlock(0))

    console.log("")
    console.log("--- Validating Mutated Chain ---")
    console.log(chain.validateChain())
}, 15000);