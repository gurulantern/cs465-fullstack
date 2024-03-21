var express = require('express');
var router = express.Router();
const controller = require('../controllers/registration');

/* GET registration page. */
router.get('/', controller.registration);
/* POST user info. */
router.post('/registeruser', controller.registerUser);

module.exports = router;