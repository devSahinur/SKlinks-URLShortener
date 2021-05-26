var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();

var indexRouter = require('./routes/index');
var urlRouter = require('./routes/urlRouter');
const mongoURL = process.env.MONGOLAB_URI;
const connect = mongoose.connect(mongoURL);

connect.then((db) => {
  console.log('Connected Correctly to server');
}, (err) => console.log(err));

var app = express();
app.use(express.static('./client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build'))
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/url', urlRouter);

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
