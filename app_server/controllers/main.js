/* GET homepage */
const index = (req, res) => {
    // Pass title for template and session token for login rendering
    res.render('index', { title: 'Travlr Getaways', session: req.cookies.userToken });
};

module.exports = {
    index
};