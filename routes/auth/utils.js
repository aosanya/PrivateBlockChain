const Tokens = require('../../SimpleChain/auth/tokens');

let tokens = new Tokens();

module.exports.requestValidation = (message) => {
    return new Promise(function(resolve, reject) {
        tokens.requestValidation(message);
        resolve();
    });
}

module.exports.verifyMessage = (address, signature) => {
    return new Promise(function(resolve, reject) {
        let response = tokens.verifyMessage(address, signature);
        resolve(response);
    });
}