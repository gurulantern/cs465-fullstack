/**
 * Name: passport.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Defines the passport strategies. One strategy for local login and admin-local login
 * Issues: Currently feels repetitive
 */

// Import passport and local strategy
const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
// Import mongoose and set User model 
const mongoose = require('mongoose'); 
const User = mongoose.model('users');  

// Local strategy that checks username and password in DB
passport.use(new LocalStrategy({    
        usernameField: 'email'  
    },  
    (username, password, done) => {    
        User.findOne({ email: username }, (err, user) => {
            if (err) { return done(err); }      
            // Check for username
            if (!user) {        
                return done(null, false, {          
                    message: 'Incorrect username.'        
                });      
            }      
            // Check for password
            if (!user.validPassword(password)) {        
                return done(null, false, {          
                    message: 'Incorrect password.'        
                });      
            }      
            return done(null, user);    
        });  
    } 
));

// Added for enhancement to separate logins for admin and users
// Admin strategy that checks admin boolean field in DB
passport.use('admin-local', new LocalStrategy({    
    usernameField: 'email'  
},  
(username, password, done) => {    
    User.findOne({ email: username }, (err, user) => {
        if (err) { return done(err); }
        // Check if username/ email exists      
        if (!user) {        
            return done(null, false, {          
                message: 'Incorrect username.'        
            });      
        }      
        // Check for valid password
        if (!user.validPassword(password)) {        
            return done(null, false, {          
                message: 'Incorrect password.'        
            });      
        }      
        // Check for admin privilege
        if (!user.admin) {        
            return done(null, false, {          
                message: 'You do not have admin privileges.'        
            });      
        }
        return done(null, user);    
    });  
} 
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});