/**
 * Name: rooms.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for rooms page. Used in app.js. Passes userToken to confirm login status
 */

const rooms = (req, res) => {
    pageTitle = 'Travlr Getaways - Rooms';
    // Pass title for template and session token for login rendering
    res.render('rooms', {title: pageTitle, session: req.cookies.userToken});
}

module.exports = {
    rooms
}