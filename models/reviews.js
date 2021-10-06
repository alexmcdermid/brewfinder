const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  text: String,
  googleId: String,
  Brewery: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);