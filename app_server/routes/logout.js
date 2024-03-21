var express = require('express');
var router = express.Router();
const controller = require('../controllers/logout');

/* POST Logout User */
router.post('/', controller.logoutUser);

module.exports = router;