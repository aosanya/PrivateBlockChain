const SimpleChain = require('../../SimpleChain/SimpleChain');
let chain = new SimpleChain();
const auth = require('../auth/utils')
const Block = require('../../Block/Block');
const coder = require('../../utils/coder')

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
        res.end("412! Please provide valid data.");
        return
    }
    else{
        //Star specific chain code to be removed. /block route should be removed and only the domain specific routes like /Registar should access this with their specific curation
        if (data.star.dec.length > 250){
            res.status = 412;
            res.end("412! Declination data of the star is larger than 250.");
            return
        }

        if (data.star.dec.length > 250){
            res.status = 412;
            res.end("412! Right Ascension data of the star is larger than 250.");
            return
        }

        if (data.star.story.length > 250){
            res.status = 412;
            res.end("412! Story data of the star is larger than 250.");
            return
        }

        data.star.storyDecoded = data.star.story
        data.star.story = coder.utf8ToHex(data.star.story);
        //


        let newBlock = new Block(data);

        exports.addBlock(newBlock).then((response) => {
            tokens.removeValidationRequest(req.body.address);
            res.send(response)
            return
        })
    }
}
