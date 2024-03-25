/**
 * Name: registration.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for registration page. Used in app.js. Uses registration.js in ./controller to handle requests.
 */
var express = require('express');
var router = express.Router();
const controller = require('../controllers/registration');

/* GET registration page. */
router.get('/', controller.registration);
/* POST user info. */
router.post('/registeruser', controller.registerUser);

module.exports = router;