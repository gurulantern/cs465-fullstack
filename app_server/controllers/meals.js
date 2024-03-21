const meals = (req, res) => {
    pageTitle = 'Travlr Getaways - Meals';
    // Pass title for template and session token for login rendering
    res.render('meals', {title: pageTitle, session: req.cookies.userToken});

};

module.exports = {
    meals
}