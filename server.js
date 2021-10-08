var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
require('dotenv').config();

require('./config/database.js')
require('./config/passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
  var cookie = req.cookies.cookieName;
  //this is logging the last last page in the form of a cookie
  //it is also making sure not to log the wrong things
  if (req.url.substring(0,2)!='/o'&&req.url.substring(0,2)!='/a'&&req.url.substring(0,3)!='/st'&&req.url.substring(0,2)!='/i'&&req.url.substring(0,2)!='/l') {
    var toGive = req.url;
    res.cookie('cookieName',toGive, { maxAge: 900000, httpOnly: true });
    req.cookies.cookieName=toGive
  }
  console.log("cookie"+cookie); 
  next(); // <-- important!
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
