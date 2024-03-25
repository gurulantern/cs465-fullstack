/**
 * Name: about.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for about page. Used in app.js. 
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/about');

/* GET about page. */
router.get('/', controller.about);

module.exports = router;