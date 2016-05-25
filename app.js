'use strict';

//  Server with express
var express = require('express');
var path    = require('path');
var app     = express();

//  Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Logger
var logger = require('morgan');
app.use(logger('dev'));

//  Cookie parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// view engine setup
var exphbs = require('express-handlebars');

var stylus  = require('stylus');
var nib     = require('nib');

app.engine('handlebars', exphbs({
  extname:        '.handlebars', 
  defaultLayout:  'main', 
  layoutsDir:     __dirname + '/views/layouts', 
  partialsDir:    __dirname + '/views/partials'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

//  Routes
var home  = require('./routes/home');
var users   = require('./routes/users');
app.use('/', home);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//  Export or initialize server
if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(3000);
}
