/**
 * Name: meals.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for meals page. Used in ./routes/meals.js. Passes userToken to session to 
 * keep logged in status
 */

/**
 * Render function for meals page
 * @param {*} req cookies.userToken
 * @param {*} res render call
 */
const meals = (req, res) => {
    pageTitle = 'Travlr Getaways - Meals';
    // Pass title for template and session token for login rendering
    res.render('meals', {title: pageTitle, session: req.cookies.userToken});

};

module.exports = {
    meals
}