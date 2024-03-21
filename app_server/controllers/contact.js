const contact = (req, res) => {
    pageTitle = 'Travlr Getaways - Contact';
     // Pass title for template and session token for login rendering
    res.render('contact', {title: pageTitle, session: req.cookies.userToken});
};

module.exports = {
    contact
}