const contact = (req, res) => {
    pageTitle = 'Travlr Getaways - Contact';
    console.info(req.session.token);
    res.render('contact', {title: pageTitle, session: req.cookies.userToken});
};

module.exports = {
    contact
}