const rooms = (req, res) => {
    pageTitle = 'Travlr Getaways - Rooms';
    res.render('rooms', {title: pageTitle, session: req.cookies.userToken});

}

module.exports = {
    rooms
}