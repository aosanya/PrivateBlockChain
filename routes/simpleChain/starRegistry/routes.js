var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.route('/block/:blockheight').get(controller.getBlock);;
router.route('/registar').get(controller.renderRegistar);
router.route('/registar').post(controller.postRegistar);
router.route('/stars/address::address').get(controller.getStarsForAddress);
router.route('/stars/hash::hash').get(controller.getBlocksWithHash);
module.exports = router;