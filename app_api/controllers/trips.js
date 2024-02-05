const mongoose = require('mongoose');
const model = mongoose.model('trips');

// GET :/trips - lists all trips
const tripsList = (req, res) => {
  model
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

// GET :/trips/:code - finds a trip by code
const tripsFindCode = async (req, res) => {
    model
        .findOne({ 'code': req.params.tripCode })
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


module.exports = {
    tripsList,
    tripsFindCode
};

