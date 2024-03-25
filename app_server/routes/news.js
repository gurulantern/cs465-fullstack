/**
 * Name: news.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for news page. Used in app.js. 
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/news');

/* GET news page. */
router.get('/', controller.news);

module.exports = router;