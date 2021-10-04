var express = require('express');
var router = express.Router();
const apiCtrl = require('../controllers/api');
const passport = require('passport');


router.get('/', apiCtrl.index);
router.get('/:id', apiCtrl.show);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/students',
    failureRedirect : '/students'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/students');
});

module.exports = router;
