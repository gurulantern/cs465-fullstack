/**
 * Name: travlr.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Manages connection to MongoDB.
 * Requires MongoDB setup.
*/

const mongoose = require('mongoose');

// define the trip schema
const tripSchema = new mongoose.Schema({    
    code: {type: String, required: true, index: true }, // Necessary for most trip operations   
    name: {type: String, required: true, index: true},    
    length: {type: String, required: true},    
    start: {type: Date, required: true},      
    resort: {type: String, required: true},    
    perPerson: {type: String, required: true},    
    image: {type: String, required: true},    
    description: {type: String, required: true}
});

mongoose.model('trips', tripSchema);