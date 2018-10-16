const SimpleChain = require('../SimpleChain');
const Adapter = require('../../storageAdapters/inMemory/Adapter');
const Block = require('../../Block/Block');

let storageAdapter = new Adapter();
let chain = new SimpleChain(storageAdapter);

(function theLoop (i) {
    setTimeout(function () {
        console.log(" ")
        console.log("-- -- --")
        console.log(chain.status());
        let blockHeight = chain.getBlockHeight()
        console.log("******")
        console.log(chain.getBlock(blockHeight))
        console.log("******")
        let blockTest = new Block("Test Block - " + (i + 1));
        chain.addBlock(blockTest);
        i++;
        if (i < 10) theLoop(i);
    }, 1000);
  })(0);

  setTimeout(function () {
    console.log(chain.validateBlock(0))
    console.log(chain.validateBlock(1))
    console.log(chain.validateChain())

    let inducedErrorBlocks = [0];
    for (var i = 0; i < inducedErrorBlocks.length; i++) {
        chain.chain[inducedErrorBlocks[i]].data='induced chain error';
    }
    console.log(chain.validateChain())
}, 15000);