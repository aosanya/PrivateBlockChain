const Tokens = require('../../SimpleChain/auth/tokens');
global.tokens = new Tokens();

module.exports.requestValidation = (message) => {
    return new Promise(function(resolve, reject) {
        const actualMessage = tokens.requestValidation(message);
        resolve(actualMessage);
    });
}

module.exports.verifyMessage = (address, signature) => {
    return new Promise(function(resolve, reject) {
        let response = tokens.verifyMessage(address, signature);
        resolve(response);
    });
}

module.exports.isValidated = (address) => {
    let response = tokens.isValidated(address);
    return response;

}