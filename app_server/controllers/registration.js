const request = require('request');
const apiOptions = {    
    server: 'http://localhost:3000' 
}; 

const registration = (req, res) => {
    pageTitle = 'Travlr Getaways - Registration';
    res.render('registration', {title: pageTitle});
};

const registerUser = async  (req, res) => {
    try {

        const { name, email, password } = req.body;

        const path = '/api/register';
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'POST',
            json: {
                name,
                email,
                password
            }
        };
        console.info('>> travelController.travelList calling ' + requestOptions.url);
        request(
            requestOptions,
            (err, { statusCode }, body) => {
                if (err) {
                    console.error(err);
                    res.render('registration', { error: 'An error occurred' });
                } else {
                    if (statusCode === 200) {
                        // Registration successful
                        req.session.email = email;
                        console.info(req.session.email);
                        res.redirect('/travel'); 
                    } else {
                        // Registration failed
                        console.info('Registration failed');
                        res.render('registration', { error: 'Registration failed' });
                    }
                }
            }
        );
    } catch (err) {
        console.error('Error in registerUser:', err);
        res.render('registration', {error: 'An error occurred'});
    }
}

module.exports = {
    registration, registerUser
}