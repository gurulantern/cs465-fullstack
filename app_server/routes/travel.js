/**
 * Name: travel.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for travel page. Used in app.js. Uses travel.js in ./controller to handle requests.
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/travel');

/* GET travel page */
router.get('/', controller.travelList);
/* POST add to wishlist */
router.post('/addtowishlist', controller.addToWishList);
/* DELETE remove from wishlist */
router.delete('/removefromwishlist', controller.removeFromWishList);

module.exports = router;