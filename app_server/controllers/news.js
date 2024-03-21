const news = (req, res) => {
    pageTitle = 'Travlr Getaways - News';
    // Pass title for template and session token for login rendering
    res.render('news', {title: pageTitle, session: req.cookies.userToken});
};

module.exports = {
    news
}