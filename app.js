var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var connectdb = require('./config/db');
const dotenv = require("dotenv");
const cookieSession = require('cookie-session');
var passport = require("passport")
var fs = require('fs');

var todoRouter = require('./routes/todo');
var projectRouter = require('./routes/project');
var userRouter = require('./routes/users');

var app = express();

app.use(
  cookieSession({
    secret: process.env.client_secret
  })
);
//configure env
dotenv.config()
//connecting to database
connectdb();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());





app.use('/api/todo', todoRouter);
app.use('/api/project', projectRouter);
app.use('/', userRouter);

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
  res.send(error);
});

module.exports = app;
