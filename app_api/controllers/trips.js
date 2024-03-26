/**
 * Name: trips.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Manages trip and wishlist API calls. 
 */

const mongoose = require('mongoose');
const { get } = require('request');
// Use mongoose models to interact with the DB
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

/**
 * Gets trips in DB
 * @param {*} req 
 * @param {*} res trips, status
 */
const tripsList = (req, res) => {
  Trip
    .find({}) // empty object means no filter
    .exec((err, trips) => {
      if (!trips) {
        return res.status(404).json({ "message": "trip not found" });
      } else if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json(trips);
      }
    });
};

/**
 * Finds specific trip based on code in params
 * @param {*} req params.tripCode
 * @param {*} res trip, status
 */
const tripsFindCode = async (req, res) => {
    // Get the trip code from the URL
    Trip
        .findOne({ 'code': req.params.tripCode }) // Parameter needs the trip code
        .exec((err, trip) => {
            if (!trip) {
                return res.status(404).json({ "message": "trip not found" });
            } else if (err) {
                return res.status(404).json(err);
            } else {
                return res.status(200).json(trip);
            }
        });
}

/**
 * Adds trip to DB
 * @param {*} req trip info
 * @param {*} res status
 */
const tripsAddTrip = async (req, res) => {
  // Get the trip code from the URL
  getUser(req, res,
    (req, res) => {
    Trip
      .create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description     
      },
      (err, trip) => {
        if (err) {
          return res
            .status(400) // bad request
            .json(err);
        } else {
          return res
            .status(201) // created
            .json(trip)
        }
      });
    }
  );
}

/**
 * Deletes trip in DB based on code
 * @param {*} req params.tripCode
 * @param {*} res status
 */
const tripsDeleteTrip = async (req, res) => {
  // Call getUser for auth
  getUser(req, res,
    (req, res) => {
      console.log("inside trips.js on server #tripsDeleteTrip");
      Trip.findOneAndDelete({'code': req.params.tripCode})
        .then(trip => {
          if (!trip) {
            return res
              .status(404)
              .send({
                message: "Trip not found with code " + req.params.tripCode
            });
          }
            return res
        }).catch(err => {
          if (err.kind === 'ObjectId') {
            return res
              .status(404)
              .send({
                message: "Trip not found with code " + req.params.tripCode
              });
          }
          return res
            .status(500) // server error
            .json(err);
        })
        console.log("return from delete trip");
    });
}

/**
 * Update trip with values from form
 * @param {*} req params.tripcode, trip values in body
 * @param {*} res status
 */
const tripsUpdateTrip = async (req, res) => {    
  console.log(req.body);    
  getUser(req, res,
    (req, res) => {
    Trip         
      .findOneAndUpdate({ 'code': req.params.tripCode }, {            
        code: req.body.code,            
        name: req.body.name,            
        length: req.body.length,            
        start: req.body.start,            
        resort: req.body.resort,            
        perPerson: req.body.perPerson,            
        image: req.body.image,            
        description: req.body.description        
      }, { new: true })        
      .then(trip => {            
        if (!trip) {                
          return res                    
              .status(404)                    
              .send({                        
                message: "Trip not found with code " + req.params.tripCode                    
              });            
        }            
        res.send(trip);        
      }).catch(err => {            
        if (err.kind === 'ObjectId') {                
          return res                    
              .status(404)                    
              .send({                        
                message: "Trip not found with code " + req.params.tripCode                    
              });            
        }            
        return res                
          .status(500) // server error                
          .json(err);        
      }); 
    }
  );
} 

/**
 * Get User function to initiate callback functions
 * Mainly for authorization
 * @param {*} req auth.email
 * @param {*} res 
 * @param {*} callback Insert callback function
 */
const getUser = (req, res, callback) => {
  console.log('in getUser');
  if (req.auth && req.auth.email) {
    User
      .findOne({ email: req.auth.email })
      .exec((err, user) => {
        if (!user) {
          return res
            .status(404)
            .json({ "message": "User not found. Can't find email"});
        } else if (err) {
          console.log(err);
          return res
            .status(404)
            .json(err);
        }
        console.log("user found");
        console.log(user);
        callback(req, res, user);
      });
  } else {
    return res
      .status(404)
      .json({ "message": "User not found. In API, needs email" });
  }
};

/**
 * Grabs wishlist for user on frontend
 * @param {*} req auth, email
 * @param {*} res status
 * @param {*} callback 
 * @returns 
 */
const getWishList = (req, res, callback) => {
  if (!req.auth || !req.auth.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Find the user based on the email in the authentication token
  User.findOne({ email: req.auth.email })
    .populate('wishlist') // Populate the 'wishlist' array with trip objects
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user.wishlist);
  });
}

/**
 * Adds a trip to wishlist
 * @param {*} req auth, auth.email, params.tripCode
 * @param {*} res 
 * @returns 
 */
const addToWishList = (req, res) => {
  if (!req.auth || !req.auth.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const tripCode = req.params.tripCode; 

  getUser(req, res, (req, res, user) => {
      console.log("in addToWishList");
      Trip
        .findOne({ code: tripCode }, (err, trip) => {
          if (err) {
              return res.status(500).json({ message: "Error finding trip" });
          }
          if (!trip) {
              return res.status(404).json({ message: "Wishlisting Trip not found" });
          }
          // Check if the trip already exists in the wishlist
          if (user.wishlist.includes(trip._id)) {
              return res.status(400).json({ message: "Trip already exists in the wishlist" });
          }
          // Add the trip's ObjectId reference to the wishlist
          user.wishlist.push(trip);
          user.save((err, updatedUser) => {
              if (err) {
                  return res.status(500).json({ message: "Error adding item to wishlist" });
              }
              res.status(200).json({ message: "Item added to wishlist", wishlist: updatedUser.wishlist });
          });
      });
  });
};

/**
 * Deletes trip from wishlist
 * @param {*} req auth, auth.email, params.tripCode
 * @param {*} res 
 * @returns 
 */
const removeFromWishList = (req, res) => {
  if (!req.auth || !req.auth.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Use trip code in params
  const tripCode = req.params.tripCode;

  User.findOne({ email: req.auth.email })
    .populate('wishlist') // Populate wishlist as the array holds references and not actual trip data
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the trip with the provided tripCode exists in the wishlist
      const index = user.wishlist.findIndex(trip => trip.code === tripCode);
      if (index === -1) {
        return res.status(400).json({ message: "Trip doesn't exist in the wishlist" });
      }

      // Remove the trip from the wishlist array
      user.wishlist.splice(index, 1);
      user.save((err, updatedUser) => {
        if (err) {
          return res.status(500).json({ message: "Error removing trip from wishlist" });
        }
        res.status(200).json({ message: "Trip removed from wishlist", wishlist: updatedUser.wishlist });
      });
    });
};

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip,
    getUser,
    // Added for enhancement
    getWishList,
    addToWishList,
    removeFromWishList
};

