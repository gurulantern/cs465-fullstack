const express = require('express');
const router = express.Router();   
const { expressjwt: Jwt } = require('express-jwt');
const auth = Jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/adminlogin')
    .post(authController.adminLogin);
router
    .route('/login')
    .post(authController.login);
router
    .route('/adminregister')
    .post(authController.adminRegister);
router
    .route('/register')
    .post(authController.register);
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);

module.exports = router;