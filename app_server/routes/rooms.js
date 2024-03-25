/**
 * Name: rooms.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for roomss page. Used in app.js. 
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/rooms');

/* GET rooms page. */
router.get('/', controller.rooms);

module.exports = router;