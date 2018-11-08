const SimpleChain = require('./SimpleChain');
const Block = require('../Block/Block');
const Mempool = require('./Mempool');

let chain = new SimpleChain();
let mempool = new Mempool();

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

module.exports.addBlock = (newBlock) => {
    return new Promise(function(resolve, reject) {
        let response = chain.addBlock(newBlock);
        resolve(response);
    });
}

module.exports.requestValidation = (message) => {
    return new Promise(function(resolve, reject) {
        mempool.requestValidation(message);
        resolve();
    });
}

module.exports.verifyMessage = (address, signature) => {
    return new Promise(function(resolve, reject) {
        let response = mempool.verifyMessage(address, signature);
        resolve(response);
    });
}