const axios = require('axios');
const apiOptions = {
  server: 'http://localhost:3000'
};

// Used axios to save cookie to browser to save user session
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Use regular client login and not admin login
    const path = '/api/login';

    const response = await axios.post(`${apiOptions.server}${path}`, {
      email,
      password
    });

    if (response.status === 200 && response.data.token) {
      res.cookie('userToken', response.data.token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: false
      })  
      console.info('Login successful');
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
