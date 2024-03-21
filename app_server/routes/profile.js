var express = require('express');
var router = express.Router();
var controller = require('../controllers/profile');

/* GET user profile. */
router.get('/', controller.profile);

module.exports = router;