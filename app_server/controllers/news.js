/**
 * Name: news.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for news page. Used in ./routes/news.js. Passes userToken to session to 
 * keep logged in status
 */

const news = (req, res) => {
    pageTitle = 'Travlr Getaways - News';
    // Pass title for template and session token for login rendering
    res.render('news', {title: pageTitle, session: req.cookies.userToken});
};

module.exports = {
    news
}