const utils = require('./utils')

module.exports = {
    requestValidation : function(req, res) {
        let address=req.params.address;
        requestValidation(address, res)
    },
    renderRequestValidation : function(req, res){
        res.render('requestValidation', {title: 'Request Validation'});
    },
    postRequestValidation : function(req, res){
        requestValidation(req.body.address, res)
    },
    verifyMessage : function(req, res) {
        let address=req.params.address;
        let signature=req.params.signature;
        verifyMessage(address, signature, res)
    },

    renderVerifyMessage : function(req, res){
        res.render('verifyMessage', {title: 'Verify Message'});
    },

    postVerifyMessage : (req, res) => {
        let address=req.body.address;
        let signature=req.body.signature;
        verifyMessage(address, signature, res)
    }
}

var requestValidation = function(address,res){
    let response = {};
    response.address = address
    response.requestTimeStamp = new Date().getTime().toString().slice(0,-3);
    response.message = response.address + ":" + response.requestTimeStamp + ":starRegistry";

    utils.requestValidation(response).then((message) => {
        res.send(message)
    })
}

var verifyMessage = function(address, signature, res){
    utils.verifyMessage(address, signature).then((success) => {
        console.log(success)
        res.send(success)
    })
}