const profile = (req, res) => {
    pageTitle = 'Travlr Getaways - Your Profile';
    res.render('profile', {title: pageTitle});

};

const renderWishlist = (req, res, responseBody) => {
    let message = null;
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
            trips: responseBody,
            message
        }
    );
};

module.exports = {
    profile
}