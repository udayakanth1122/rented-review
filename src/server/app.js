var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var mongo = require('mongodb');

var monk = require('monk');
var db = monk('mongodb://83f191e7-401e-4a72-8745-5cfe84d56475:03a7640b10618b015922b51e325bad26@10.152.104.69:27017/4f6af140-2948-4125-9489-7eab3b63546b');

var routes = require('./routes/index');
var services = require('./routes/services');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});
app.use('/api/services', services);
app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

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


module.exports = app;
