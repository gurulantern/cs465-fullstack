/**
 * Name: migration.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: This is a migration script for the database.
 * To run in terminal simple use node migration.js
 */
const mongoose = require('mongoose');
const User = require('./app_api/models/user');

// Migration script for enhancement to update user schema
async function migrate() {
    try {
        await mongoose.connect('mongodb://localhost:27017/travlr', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        // Fetch existing users
        const users = await User.find();

        // Update each user document
        for (const user of users) {
            // Update the user document according to the new schema
            user.admin = user.admin || true;
            user.wishlist = user.wishlist || [];

            await user.save();
        }

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
    }
}

// Run the migration script
migrate();
