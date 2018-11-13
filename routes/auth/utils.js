const Tokens = require('../../SimpleChain/auth/tokens');
global.tokens = new Tokens();

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

module.exports.isValidated = (address) => {
    console.log("Here 1")
    console.log("Here 2")
    let response = tokens.isValidated(address);
    return response;

}