/**
 * Name: profile.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for user profile page. Used in ./routes/profile.js. Passes userToken to session to 
 * keep logged in status. Uses cookie to make authorized request to get user wishlist for rendering.
 */

const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

// Exported profile function
const profile = (req, res) => {
    // Use the api for getting all trips in user's wishlist
    const path = '/api/wishlist';

    // Set request options and authorization header with cookie in storage
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        headers: {
            'Authorization': `Bearer ${req.cookies.userToken}` 
        }
    };

    console.info('>> profileController.profile calling ' + requestOptions.url);
    // Make request with options
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
                // Handle error here
            }
            // Render wishlist with response
            renderWishlist(req, res, body);
        }
    );
};

// Render wishlist with response
const renderWishlist = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Wishlist';
    if (!(responseBody instanceof Array)) { // checks if response is an array
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in the wishlist';
        }
    }

    // Pass title for template, trips for rendering and session token for login rendering
    res.render('profile', {
        title: pageTitle,
        trips: responseBody, // trips from the wishlist array
        session: req.cookies.userToken, // store user token for logged in profile rendering
        message
    });
};

module.exports = {
    profile
}