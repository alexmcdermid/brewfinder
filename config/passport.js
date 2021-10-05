const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Review = require('../models/reviews');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in with OAuth...
  }
));

passport.serializeUser(function(Review, done) {
    done(null);
});

// passport.deserializeUser(function(id, done) {
//     Student.findById(id, function(err, student) {
//       done(err, student);
//     });
//   });