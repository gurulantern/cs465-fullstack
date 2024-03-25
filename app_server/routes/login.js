/**
 * Name: login.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for login element. Used in app.js. Uses login.js in ./controller to handle requests.
 */
var express = require('express');
var router = express.Router();
const controller = require('../controllers/login');

/* POST Login User */
router.post('/', controller.loginUser);

module.exports = router;