var express = require('express');
var router = express.Router();
var controller = require('../controllers/profile');

/* GET users listing. */
router.get('/', controller.profile);

module.exports = router;