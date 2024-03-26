/**
 * Name: registration.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for registration page. Used in ./routes/index.js. Passes userToken to session to 
 * keep logged in status
 */

// Use axios for requests
const axios = require('axios');
const apiOptions = {    
    server: 'http://localhost:3000' 
}; 

/**
 * Render function for registration page
 * @param {*} req cookies.userToken
 * @param {*} res render call
 */
const registration = (req, res) => {
    pageTitle = 'Travlr Getaways - Registration';
    // Pass title for template and session token for login rendering
    res.render('registration', {title: pageTitle, session: req.cookies.userToken});
};

/**
 * Registers user as a client user
 * @param {*} req name, email, password
 * @param {*} res render with error message if failed
 */
const registerUser = async  (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Use client registration process instead of admin registration process
        const path = '/api/register';

        // Send axios POST request and store response
        const response = await axios.post(`${apiOptions.server}${path}`, {
            name,
            email,
            password
        });

        console.info('>> register user calling ' + response.config.url);
        // Check response status and store userToken if available
        // Automatic login
        if (response.status === 200 && response.data.token) {
            res.cookie('userToken', response.data.token, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
              httpOnly: true,
              secure: false
            })  
            console.info('Registration successful');
            res.redirect('/travel');
          } else {
            console.info('Registration failed');
            // Handle login failure
          }
    } catch (err) {
        console.error('Error in registerUser:', err);
        res.render('registration', {error: 'An error occurred'});
    }
}

module.exports = {
    registration, 
    registerUser
}