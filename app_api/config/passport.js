const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const mongoose = require('mongoose'); 
const User = mongoose.model('users');  

// Local strategy that checks username and password in DB
passport.use(new LocalStrategy({    
        usernameField: 'email'  
    },  
    (username, password, done) => {    
        User.findOne({ email: username }, (err, user) => {
            if (err) { return done(err); }      
            if (!user) {        
                return done(null, false, {          
                    message: 'Incorrect username.'        
                });      
            }      
            if (!user.validPassword(password)) {        
                return done(null, false, {          
                    message: 'Incorrect password.'        
                });      
            }      
            return done(null, user);    
        });  
    } 
));

// Admin strategy that checks admin boolean field in DB
passport.use('admin-local', new LocalStrategy({    
    usernameField: 'email'  
},  
(username, password, done) => {    
    User.findOne({ email: username }, (err, user) => {
        if (err) { return done(err); }      
        if (!user) {        
            return done(null, false, {          
                message: 'Incorrect username.'        
            });      
        }      
        if (!user.validPassword(password)) {        
            return done(null, false, {          
                message: 'Incorrect password.'        
            });      
        }      
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