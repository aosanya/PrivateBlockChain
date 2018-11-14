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
        let data=req.body;
        utils.postBlock(req, res, data)
    }
}