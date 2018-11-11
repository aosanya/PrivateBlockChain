const simpleChainUtils = require('../utils')
const Block = require('../../../Block/Block');
const coder = require('../../../utils/coder')
module.exports = {

    getBlock : function(req, res) {
        //secure this from injection
        simpleChainUtils.getBlock(req.params.blockheight).then((block) => {
            if (block == undefined){
                res.send('Block ' +  req.params.blockheight + ' Does Not Exist')
            }
            else{
                block.body.star.storyDecoded = coder.hexToUtf8(block.body.star.story);
                res.send(block)
            }
        })
    },
    renderRegistar : function(req, res){
        res.render('registar');
    },

    postRegistar : function(req, res){
        fs = require('fs')
        var data = {}
        data.address = req.body.Address;
        data.star = {}

        const RAH = req.body.RAH;
        const RAM = req.body.RAM;
        const RASEC = req.body.RASEC;
        const DecDeg = req.body.DecDeg;
        const DecMin = req.body.DecMin;
        const DecSec = req.body.DecSec;
        const Conste = req.body.Conste;
        const MAG = req.body.MAG;
        const Story = coder.utf8ToHex(req.body.Story);

        data.star.dec =  RAH + '° ' + RAM +  "' " +  RASEC
        data.star.ra = DecDeg + 'h ' + DecMin + 'm ' + DecSec + 's'

        if (MAG != '' || MAG != undefined){
            data.star.mag = MAG
        }

        if (Conste != '' && Conste != undefined){
            data.star.const = Conste
        }

        data.star.story = Story

        if (data == undefined) {
            res.status = 412;
            res.end("412!");
        }
        else{
            let newBlock = new Block(data);
            simpleChainUtils.addBlock(newBlock).then((response) => {
                res.send(response)
            })
        }
        //res.status(204).send()
        // res.render('registar');
    },
    getStarsForAddress : function(req, res) {
        //secure this from injection
        simpleChainUtils.getBlocksForAddress(req.params.address).then((blocks) => {
            if (blocks == undefined){
                res.send('No block for ' +  req.params.address)
            }
            else{
                blocks.forEach(function(block){
                    block.body.star.storyDecoded = coder.hexToUtf8(block.body.star.story);
                })
                res.send(blocks)
            }
        })
    },
    getBlocksWithHash : function(req, res) {
        //secure this from injection
        simpleChainUtils.getBlocksWithHash(req.params.hash).then((block) => {
            if (block == undefined){
                res.send('No block with hash ' +  req.params.hash)
            }
            else{
                block.body.star.storyDecoded = coder.hexToUtf8(block.body.star.story);
                res.send(block)
            }
        })
    },
}