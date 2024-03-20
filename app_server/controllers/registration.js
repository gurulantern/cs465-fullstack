const axios = require('axios');
const apiOptions = {    
    server: 'http://localhost:3000' 
}; 

const registration = (req, res) => {
    pageTitle = 'Travlr Getaways - Registration';
    res.render('registration', {title: pageTitle, session: req.cookies.userToken});
};

const registerUser = async  (req, res) => {
    try {
        const { name, email, password } = req.body;
        const path = '/api/register';

        const response = await axios.post(`${apiOptions.server}${path}`, {
            name,
            email,
            password
        });

        console.info('>> register user calling ' + response.config.url);
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