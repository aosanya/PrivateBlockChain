const Blockchain = require('../Blockchain/Blockchain');
const Adapter = require('../storageAdapters/inMemory/Adapter');
const Block = require('../Block/Block');

let storageAdapter = new Adapter();
let chain = new Blockchain(storageAdapter);

(function theLoop (i) {
    setTimeout(function () {
        let blockTest = new Block("Test Block - " + (i + 1));
        Promise.all([chain.addBlock(blockTest)]).then(() => {
            i++;
            if (i < 10) theLoop(i);
        });
    }, 1000);
})(10);

