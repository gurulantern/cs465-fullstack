/**
 * Name: logout.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for logout element. Used in app.js. Uses logout.js in ./controller to handle requests.
 */
var express = require('express');
var router = express.Router();
const controller = require('../controllers/logout');

/* POST Logout User */
router.post('/', controller.logoutUser);

module.exports = router;