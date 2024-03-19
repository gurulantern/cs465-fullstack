const mongoose = require('mongoose');
const User = require('./app_api/models/user');

async function migrate() {
    try {
        // Connect to MongoDB
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

            // Save the updated user document
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
