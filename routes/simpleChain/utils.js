const SimpleChain = require('../../SimpleChain/SimpleChain');
let chain = new SimpleChain();

module.exports.getStatus = () => {
    return new Promise(function(resolve, reject) {
        resolve(chain.status());
    });
}

module.exports.getBlock = (blockheight) => {
    return new Promise(function(resolve, reject) {
        resolve(chain.getBlock(blockheight));
    });
}

module.exports.getBlocksForAddress = (address) => {
    console.log(address)
    return new Promise(function(resolve, reject) {
        resolve(chain.getBlocksForAddress(address));
    });
}

module.exports.getBlocksWithHash = (hash) => {
    return new Promise(function(resolve, reject) {
        resolve(chain.getBlocksWithHash(hash));
    });
}

module.exports.addBlock = (newBlock) => {
    return new Promise(function(resolve, reject) {
        let response = chain.addBlock(newBlock);
        resolve(response);
    });
}