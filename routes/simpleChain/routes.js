var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.route('/').get(controller.getStatus);
//use star blocks as default. In future, /stars/block should be created and this reactivated to provide default for all block types
//router.route('/block/:blockheight').get(controller.getBlock);
router.route('/block').post(controller.postBlock);

module.exports = router;