/**
 * Name: main.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for homepage. Used in ./routes/index.js. Passes userToken to session to 
 * keep logged in status
 */

/* GET homepage */
const index = (req, res) => {
    // Pass title for template and session token for login rendering
    res.render('index', { title: 'Travlr Getaways', session: req.cookies.userToken });
};

module.exports = {
    index
};