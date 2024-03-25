/**
 * Name: contact.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for contact page. Used in app.js. 
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact');

/* GET contact page. */
router.get('/', controller.contact);

module.exports = router;