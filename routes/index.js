var express = require('express');
var router = express.Router();
const apiCtrl = require('../controllers/api');
const passport = require('passport');

//this needs to be placed at the top or some times our index get breaks this
router.get('/oauth2callback', function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

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

router.get('', apiCtrl.index)
router.get('/', apiCtrl.index);
router.get('/:id', apiCtrl.show);

router.post('/:id/review', apiCtrl.createReview)

router.get('/:id/delete/:id', apiCtrl.deleteReview)




module.exports = router;
