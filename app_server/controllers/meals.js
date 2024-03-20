const meals = (req, res) => {
    pageTitle = 'Travlr Getaways - Meals';
    res.render('meals', {title: pageTitle, session: req.cookies.userToken});

};

module.exports = {
    meals
}