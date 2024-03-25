/**
 * Name: profile.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for profile page. Used in app.js. Uses profile.js in ./controller to handle requests.
 * Issues: Need to make sure that users that are not logged in cannot access this page.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controllers/profile');

/* GET user profile. */
router.get('/', controller.profile);

module.exports = router;