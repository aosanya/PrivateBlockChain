const simpleChainUtils = require('../utils')


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
        res.render('registar', {title: 'Registar'});
    },

    renderStarSearch : function(req, res){
        res.render('starSearch', {title: 'Search'});
    },

    searchStars : function(req, res){
        //console.log(req.body)
    },

    postRegistar : function(req, res){
        fs = require('fs')
        var data = {}
        data.address = req.body.address;
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
        data.star.storyDecoded = req.body.Story
        //console.log(data)
        simpleChainUtils.postBlock(req, res, data)
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

