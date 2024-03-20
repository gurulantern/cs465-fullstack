const news = (req, res) => {
    pageTitle = 'Travlr Getaways - News';
    res.render('news', {title: pageTitle, session: req.cookies.userToken});

};

module.exports = {
    news
}