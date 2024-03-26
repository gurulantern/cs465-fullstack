/**
 * Name: travel.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for travel page. Used in app.js. Makes API calls for adding and removing to wishlist, and getting trips
 * for rendering the travel list.
 * Issues: Possibly consider moving removeWishlist to profile as that is where the button is. 
 */
const request = require('request'); 
const apiOptions = {    
    server: 'http://localhost:3000' 
}; 

// Render the travel list
const renderTravelList = (req, res, responseBody) => {
    let message = null;
    console.info('>> travelController.renderTravelList');
    let pageTile =  process.env.npm_package_description + ' - Travel'; // used for rendering page
    if (!(responseBody instanceof Array)) { // checks if response is an array
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in our database';
        }
    }

    // Arguments for hbs template
    res.render('travel',
        {
            title: pageTile,
            session: req.cookies.userToken, // necessary for conditional rendering
            trips: responseBody, // trips to be rendered
            message
        }
    );
    console.info(req.cookies.userToken);
};

/**
 * Call API for trips
 * @param {*} req 
 * @param {*} res 
 */
const travelList = (req, res) => {
    const path = '/api/trips';
    // set options for api request
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    console.info('>> travelController.travelList calling ' + requestOptions.url);
    // send out request for the trip list
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            // Call renderTravel list as callback
            renderTravelList(req, res, body);
        }
    );
}

/**
 * Add trip to wishlist
 * @param {*} req cookies.userToken, body.tripCode
 * @param {*} res 
 * @returns 
 */
const addToWishList = (req, res) => {
    // Get the token from the cookie
    const token = req.cookies.userToken;

    // Ensure that the token exists
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    // Get the trip code from the request body
    const tripCode = req.body.tripCode;

    // Construct the request options
    const requestOptions = {
        url: `${apiOptions.server}/api/wishlists/${tripCode}`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json'
        },
        json: { item: tripCode } // Assuming trip code is used as the item to add to the wishlist
    };

    // Make the request to add
    request(requestOptions, (err, response, body) => {
        if (err) {
            // error handling for error in request
            console.error(err);
            res.status(500).send('Error adding item to wishlist');
        } else if (response.statusCode !== 200) {
            // error handling for error in response
            console.error(`Error: ${response.statusCode} - ${body}`);
            res.status(response.statusCode).send(body);
        } else {
            console.log('Item added to wishlist:', body);
            res.redirect('/profile');
        }
    });
};

/**
 * Removes a trip from wishlist
 * @param {*} req cookies.userToken, body.tripCode
 * @param {*} res 
 * @returns 
 */
const removeFromWishList = (req, res) => {
    // Get the token from the cookie
    const token = req.cookies.userToken;

    // Ensure that the token exists
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    // Get the trip code from the request body
    const tripCode = req.body.tripCode;

    // Construct the request options
    const requestOptions = {
        url: `${apiOptions.server}/api/wishlists/${tripCode}`,
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json'
        },
        json: { item: tripCode } // Assuming trip code is used as the item to add to the wishlist
    };

    // Make the request to delete
    request(requestOptions, (err, response, body) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting item from wishlist');
        } else if (response.statusCode !== 200) {
            console.error(`Error: ${response.statusCode} - ${body}`);
            res.status(response.statusCode).send(body);
        } else {
            console.log('Item deleted from wishlist:', body);
            res.status(response.statusCode).send(body);
        }
    });
};

module.exports = {
    travelList,
    addToWishList,
    removeFromWishList
};