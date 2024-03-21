var express = require('express');
var router = express.Router();
const controller = require('../controllers/login');

/* POST Login User */
router.post('/', controller.loginUser);

module.exports = router;