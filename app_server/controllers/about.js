//GET About View
const about = (req, res) => {
    pageTitle = 'Travlr Getaways - About';
    // Pass title for template and session token for login rendering
    res.render('about', {title: pageTitle, session: req.cookies.userToken});
};

module.exports = {
    about
}