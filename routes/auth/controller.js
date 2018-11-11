const utils = require('./utils')

module.exports = {
    requestValidation : function(req, res) {
        let address=req.params.address;
        requestValidation(address, res)
    },
    renderRequestValidation : function(req, res){
        res.render('requestValidation');
    },
    postRequestValidation : function(req, res){
        requestValidation(req.body.Address, res)
    },
    verifyMessage : function(req, res) {
        let address=req.params.address;
        let signature=req.params.signature;
        verifyMessage(address, signature, res)
    },

    renderVerifyMessage : function(req, res){
        res.render('verifyMessage');
    },

    postVerifyMessage : (req, res) => {
        let address=req.body.Address;
        let signature=req.body.Signature;
        console.log("-- -- -- -- -- --")
        console.log(address)
        console.log(signature)
        verifyMessage(address, signature, res)
    }


}

var requestValidation = function(address,res){
    let response = {};
    response.address = address
    response.requestTimeStamp = new Date().getTime().toString().slice(0,-3);
    response.message = response.address + ":" + response.requestTimeStamp + ":starRegistry";
    response.validationWindow = 3000

    utils.requestValidation(response).then(() => {
        res.send(response)
    })
}

var verifyMessage = function(address, signature, res){
    utils.verifyMessage(address, signature).then((success) => {
        console.log(success)
        res.send(success)
    })
}