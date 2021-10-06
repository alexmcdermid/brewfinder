var express = require('express');
var router = express.Router();
const apiCtrl = require('../controllers/api');
const passport = require('passport');


router.get('/', apiCtrl.index);
router.get('/:id', apiCtrl.show);

router.post('/:id/review', apiCtrl.createReview)

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));


// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'],prompt: 'select_account',}
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
