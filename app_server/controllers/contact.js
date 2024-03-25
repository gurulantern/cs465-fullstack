/**
 * Name: contact.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for contact page. Used in ./routes/contact.js. Passes userToken to confirm login status
 */
const contact = (req, res) => {
    pageTitle = 'Travlr Getaways - Contact';
     // Pass title for template and session token for login rendering
    res.render('contact', {title: pageTitle, session: req.cookies.userToken});
};

module.exports = {
    contact
}