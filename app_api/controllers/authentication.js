/**
 * Name: authentication.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Defines the separate login/registration functions for admin and client users. 
 * Uses the passport strategies declared in ./config/passport.js to authenticate user login for each login.
 */

const passport = require('passport'); 
const mongoose = require('mongoose'); 
const User = mongoose.model('users');  

/**
 * Registers a client user
 * @param {*} req Name, Email, Password
 * @param {*} res Status, Token
 */
const register = (req, res) => {  
    // Check if all fields are filled
    if (!req.body.name || !req.body.email || !req.body.password) {    
        return res      
        .status(400)      
        .json({"message": "All fields required"});  
    }   

    // Create new user object with name and email
    const user = new User();  
    user.name = req.body.name;  
    user.email = req.body.email;   
    
    // Set password and save user. See ./models/user.js for more details
    user.setPassword(req.body.password);  
    user.save((err) => {    
        if (err) {      
            res        
            .status(400)        
            .json(err);    
        } else {      
            // generate JWT to userToken to be stored as cookie
            const token = user.generateJwt();      
            res        
            .status(200)        
            .json({token});    
        }  
    }) 
};  

/**
 * Logs in a client user
 * @param {*} req Email, password
 * @param {*} res token, status
 */
const login = (req, res) => {  
    // Check if all fields are filled
    if (!req.body.email || !req.body.password) {    
        return res      
        .status(400)      
        .json({"message": "All fields required"});  
    }  
    // Use passport to authenticate client user locally
    passport.authenticate('local', (err, user, info) => {    
        if (err) {      
            return res        
            .status(404)        
            .json(err);    
        }    
        if (user) {      
            // generate JWT for userToken to be stored as cookie if user exists
            const token = user.generateJwt();      
            res        
            .status(200)        
            .json({token});    
        } else {      
            res        
            .status(401)        
            .json(info);    
        }  
    })(req, res); 
};  

/**
 * Logs in an admin user
 * @param {*} req Email, password
 * @param {*} res Status, Token
 */
const adminLogin = (req, res) => {
    // Check if all fields are filled
    if (!req.body.email || !req.body.password) {
        return res
       .status(400)
       .json({"message": "All fields required"});
    }
    // Authenticate using admin strategy to check admin field of user
    passport.authenticate('admin-local', (err, user, info) => {
        if (err) {
            return res
           .status(404)
           .json(err);
        }
        if (user) {
            if (user.admin) {
                // generate JWT for userToken if user is admin.
                const token = user.generateJwt();
                res
               .status(200)
               .json({token});
            } else {
                res
               .status(401)
               .json(info);
            }
        } else {
            res
           .status(401)
           .json(info);
        }
    })(req, res);
}

/**
 * Registers an admin user
 * @param {*} req Name, email, password
 * @param {*} res Status, token
 */
const adminRegister = (req, res) => {  
    // Check if all fields are filled
    if (!req.body.name || !req.body.email || !req.body.password) {    
        return res      
        .status(400)      
        .json({"message": "All fields required"});  
    }   
    // Create user object. See ./models/user.js for more details
    const user = new User();  
    user.name = req.body.name;  
    user.email = req.body.email;
    // Set admin field to true
    user.admin = true;   
    
    // Set password and save
    user.setPassword(req.body.password);  
    user.save((err) => {    
        if (err) {      
            res        
            .status(400)        
            .json(err);    
        } else {      
            const token = user.generateJwt();      
            res        
            .status(200)        
            .json({token});    
        }  
    }) 
}; 

module.exports = {  register,  login, adminLogin, adminRegister }; 