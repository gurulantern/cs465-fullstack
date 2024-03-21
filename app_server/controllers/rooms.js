const rooms = (req, res) => {
    pageTitle = 'Travlr Getaways - Rooms';
    // Pass title for template and session token for login rendering
    res.render('rooms', {title: pageTitle, session: req.cookies.userToken});
}

module.exports = {
    rooms
}