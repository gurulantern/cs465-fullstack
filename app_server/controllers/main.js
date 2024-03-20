/* GET homepage */
const index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways', session: req.cookies.userToken });
};

module.exports = {
    index
};