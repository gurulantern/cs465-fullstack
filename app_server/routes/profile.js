var express = require('express');
var router = express.Router();
var controller = require('../controllers/profile');

/* GET users listing. */
router.get('/profile', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;