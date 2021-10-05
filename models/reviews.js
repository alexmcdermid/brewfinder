var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  text: String,
  googleId: String,
  Brewery: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);