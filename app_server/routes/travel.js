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