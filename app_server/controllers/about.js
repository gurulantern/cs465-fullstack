/**
 * Name: about.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for about page. Used in ./routes/about.js. Passes userToken to confirm login status
 */

//GET About View
const about = (req, res) => {
    pageTitle = 'Travlr Getaways - About';
    // Pass title for template and session token for login rendering
    res.render('about', {title: pageTitle, session: req.cookies.userToken});
};

module.exports = {
    about
}