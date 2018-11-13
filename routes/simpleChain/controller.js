const utils = require('./utils')
const Block = require('../../Block/Block');
const auth = require('../auth/utils')

module.exports = {
    getStatus : function(req, res) {
        //secure this from injection
        utils.getStatus().then((status) => {
            res.send(status)
        })
    },
    getBlock : function(req, res) {
        //secure this from injection
        utils.getBlock(req.params.blockheight).then((block) => {
            if (block == undefined){
                res.send('Block ' +  req.params.blockheight + ' Does Not Exist')
            }
            else{
                res.send(block)
            }
        })
    },
    postBlock: function(req,res){
        console.log("--- --- 1 --- ---")
        console.log(req)
        console.log("--- --- 2 --- ---")
        if (auth.isValidated(req.body.Address) == false){
            res.status = 403;
            res.end("Message is not validate!")
        }
        let data=req.body;
        if (data == undefined) {
            res.status = 412;
            res.end("412!");
        }
        else{
            let newBlock = new Block(data);
            utils.addBlock(newBlock).then((response) => {
                res.send(response)
            })
        }
    }
}