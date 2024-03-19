var express = require('express');
var router = express.Router();
const controller = require('../controllers/registration');

/* post users listing. */
router.get('/', controller.registration);
router.post('/registeruser', controller.registerUser);

module.exports = router;