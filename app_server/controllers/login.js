/**
 * Name: login.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Controller for login element. Used in ./routes/login.js. Holds the logic for making a 
 * login request to the API. Decided to use express res.cookie function to store userToken.
 */
const axios = require('axios');
const apiOptions = {
  server: 'http://localhost:3000'
};

// Used axios to save cookie to browser to save user session
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Use regular client login and not admin login api route
    const path = '/api/login';

    // Use axios to make POST request and store response
    const response = await axios.post(`${apiOptions.server}${path}`, {
      email,
      password
    });

    // Check response status and token presence
    if (response.status === 200 && response.data.token) {
      // Use express function for saving cookies without Memory store
      res.cookie('userToken', response.data.token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: false
      })  
      console.info('Login successful');

      // redirect user to the travel page to see wishlist buttons
      res.redirect('/travel');
    } else {
      console.info('Login failed');
      // Handle login failure
    }
  } catch (err) {
    console.error('Error in loginUser:', err);
    // Handle error
  }
};

module.exports = {
  loginUser
};
