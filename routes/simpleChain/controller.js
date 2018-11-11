const utils = require('./utils')
const Block = require('../../Block/Block');

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