/**
 * Name: index.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for home page. Used in app.js. 
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/main');

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
