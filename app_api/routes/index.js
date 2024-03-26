/**
 * Name: index.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Index for the express API backend. Declares the routes for 
 * making API calls. These are implemented in the Express front end app and the Angular SPA.
*/

// Use Express router for the API routes. 
const express = require('express');
const router = express.Router();   
// Use express-jwt for authorization for special API routes
const { expressjwt: Jwt } = require('express-jwt');
const auth = Jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

// Import controllers for API routes
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/adminlogin')
    .post(authController.adminLogin); // Used in the SPA by admin
router
    .route('/login')
    .post(authController.login); // Used in Express frontend
router
    .route('/adminregister')
    .post(authController.adminRegister); // Used in the SPA by admin
router
    .route('/register')
    .post(authController.register); // Used in Express frontend
router
    .route('/trips')
    .get(tripsController.tripsList) // Used in Express frontend
    .post(auth, tripsController.tripsAddTrip); // Used in the SPA by admin
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode) // Used in the SPA by admin
    .put(auth, tripsController.tripsUpdateTrip) // Used in the SPA by admin
    .delete(auth, tripsController.tripsDeleteTrip); // Used in the SPA by admin
router
    .route('/wishlist')
    .get(auth, tripsController.getWishList) // Used in the Express frontend
router
    .route('/wishlists/:tripCode')
    .post(auth, tripsController.addToWishList) // Used in the Express frontend
    .delete(auth, tripsController.removeFromWishList); // Used in the Express frontend


module.exports = router;