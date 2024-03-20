//GET About View
const about = (req, res) => {
    pageTitle = 'Travlr Getaways - About';
    res.render('about', {title: pageTitle, session: req.cookies.userToken});
};

module.exports = {
    about
}