const SimpleChain = require('../../SimpleChain/SimpleChain');
let chain = new SimpleChain();
const auth = require('../auth/utils')
const Block = require('../../Block/Block');

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

module.exports.postBlock = (req, res, data) => {
    if (auth.isValidated(req.body.address) == false){
        res.status = 403;
        res.end("Message is not validated!")
        return
    }

    if (data == undefined) {
        res.status = 412;
        res.end("412!");
        return
    }
    else{
        let newBlock = new Block(data);

        exports.addBlock(newBlock).then((response) => {
            tokens.removeValidationRequest(req.body.address);
            res.send(response)
            return
        })
    }
}
