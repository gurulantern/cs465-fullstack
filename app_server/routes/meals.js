/**
 * Name: meals.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for meals page. Used in app.js. 
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/meals');

/* GET meals page. */
router.get('/', controller.meals);

module.exports = router;