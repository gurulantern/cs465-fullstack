
const request = require('request'); 
const apiOptions = {    
    server: 'http://localhost:3000' 
}; 

const renderTravelList = (req, res, responseBody) => {
    let message = null;
    console.info('>> travelController.renderTravelList');
    let pageTile =  process.env.npm_package_description + ' - Travel';
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in our database';
        }
    }
    res.render('travel',
        {
            title: pageTile,
            session: req.cookies.userToken,
            trips: responseBody,
            message
        }
    );
    console.info(req.cookies.userToken);
};

/* GET Travel view*/
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    console.info('>> travelController.travelList calling ' + requestOptions.url);
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    );
}

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

    // Make the request
    request(requestOptions, (err, response, body) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding item to wishlist');
        } else if (response.statusCode !== 200) {
            console.error(`Error: ${response.statusCode} - ${body}`);
            res.status(response.statusCode).send(body);
        } else {
            console.log('Item added to wishlist:', body);
            res.redirect('/profile');
        }
    });
};

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

    // Make the request
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