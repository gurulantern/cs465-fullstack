const passport = require('passport');

function isAuthenticated(req, res, next) {
    // Passport's isAuthenticated function checks if the user is authenticated
    if (req.isAuthenticated()) {
        return next();
    } else {
        // If not authenticated, return an error
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = isAuthenticated;
