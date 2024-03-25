/**
 * Name: .seedgooserc.js
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: This is the seedgooserc file that holds options for seedgoose to seed the database.
 */
module.exports = {
    modelBaseDirectory: 'app_api/models',
    models: ['*.js', '!db.js'],
    data: 'data',
    db: 'mongodb://localhost:27017/travlr'
  };
  