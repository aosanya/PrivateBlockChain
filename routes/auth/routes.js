var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.route('/requestValidation/:address').get(controller.requestValidation);
router.route('/requestValidation').get(controller.renderRequestValidation);
router.route('/requestValidation').post(controller.postRequestValidation);

router.route('/message-signature/:address/:signature(*)').post(controller.verifyMessage);

router.route('/verifyMessage').get(controller.renderVerifyMessage);
router.route('/verifyMessage').post(controller.postVerifyMessage);
module.exports = router;