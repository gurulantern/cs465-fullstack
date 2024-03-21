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

// Admin login for SPA
router
    .route('/adminlogin')
    .post(authController.adminLogin);
// User login for Express site
router
    .route('/login')
    .post(authController.login);
// Admin register for SPA
router
    .route('/adminregister')
    .post(authController.adminRegister);
// User register for Express site
router
    .route('/register')
    .post(authController.register);
// Getter for trips on SPA and Express 
// Add trip for Admin SPA
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);
// Admin trip Upadates for SPA
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);
// User wishlist getter for Express site
router
    .route('/wishlist')
    .get(auth, tripsController.getWishList)
// User wishlist add and delete for Express site
router
    .route('/wishlists/:tripCode')
    .post(auth, tripsController.addToWishList)
    .delete(auth, tripsController.removeFromWishList);


module.exports = router;