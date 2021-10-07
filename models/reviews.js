const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  review: String,
  googleId: String,
  userName: String,
  photos: Object,
  brewery: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);