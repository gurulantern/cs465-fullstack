const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

const profile = (req, res) => {
    const path = '/api/wishlist';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        headers: {
            'Authorization': `Bearer ${req.cookies.userToken}` 
        }
    };

    console.info('>> profileController.profile calling ' + requestOptions.url);
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
                // Handle error here
            }
            // Render wishlist
            renderWishlist(req, res, body);
        }
    );
};

const renderWishlist = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Wishlist';
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in the wishlist';
        }
    }
    res.render('profile', {
        title: pageTitle,
        trips: responseBody,
        session: req.cookies.userToken,
        message
    });
};

module.exports = {
    profile
}