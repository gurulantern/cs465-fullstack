/**
 * Name: user.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Sets up the user schema and methods to interact with the user documents in 
 * MongoDB.
 * Requires MongoDB setup and connection to DB. See ./models/db.js
*/

const mongoose = require('mongoose'); 
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken');  

// User schema for mongoose
const userSchema = new mongoose.Schema({  
    email: {    
        type: String,    
        unique: true,    
        required: true  
    },  
    name: {    
        type: String,    
        required: true  
    },
    admin: {
        type: Boolean,
        default: false
    },
    // Added wishlist to schema
    wishlist: [{
        // Wishlist array stores ObjectIds that reference documents in the trips collection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trips'
    }],
    hash: String,  
    salt: String 
});  

// Method used to set password for user. See ./controllers/authentication.js
// Hashes password and stores it in the database.
userSchema.methods.setPassword = function(password){  
    this.salt = crypto.randomBytes(16).toString('hex');  
    this.hash = crypto.pbkdf2Sync(password, this.salt,    
        1000, 64, 'sha512').toString('hex'); 
};  

// Method used to check password for user. See./config/passport.js
userSchema.methods.validPassword = function(password) {  
    var hash = crypto.pbkdf2Sync(password,    
        this.salt, 1000, 64, 'sha512').toString('hex');  
    return this.hash === hash; 
};  

// Method to generate JWT for cookie usage. See./controllers/authentication.js
userSchema.methods.generateJwt = function() {  
    const expiry = new Date();  
    // Expiration time for the cookie and for logging user out
    expiry.setDate(expiry.getDate() + 7);   
    
    // Sign JWT with the user email and name
    return jwt.sign({    
        _id: this._id,    
        email: this.email,    
        name: this.name,    
        exp: parseInt(expiry.getTime() / 1000, 10),  
    }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE! 
};  
        
module.exports = mongoose.model('users', userSchema); 