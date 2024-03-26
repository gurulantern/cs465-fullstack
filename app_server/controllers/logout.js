/**
 * Name: logout.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for logout request. Used in ./routes/logout.js. Holds the logic for making a 
 * deleting the cookie from the browser to log user out.
 */

/**
 * Clears user cookie to log user out
 * @param {*} res clears cookie, redirects to home
 */
const logoutUser = async (req, res) => {
    res.clearCookie('userToken');
    res.redirect('/');
};

module.exports = {
  logoutUser
};
