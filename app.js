require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// Added for enhancement so app could save cookie
const session = require('cookie-session');

require('./app_api/models/db');
require('./app_api/config/passport')

// declare routers from app_server
const aboutRouter = require('./app_server/routes/about');
const contactRouter = require('./app_server/routes/contact');
const indexRouter = require('./app_server/routes/index');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const roomsRouter = require('./app_server/routes/rooms');
const travelRouter = require('./app_server/routes/travel');
const usersRouter = require('./app_server/routes/users');
const apiRouter = require('./app_api/routes/index');
// Added for enhancement
const profileRouter = require('./app_server/routes/profile');
const registrationRouter = require('./app_server/routes/registration');
const loginRouter = require('./app_server/routes/login');
const logoutRouter = require('./app_server/routes/logout');

// handlebars and passport
const hbs = require('hbs');
const passport = require('passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials')) 
app.set('view engine', 'hbs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(session({
  name: 'session',
  secret: [
    process.env.JWT_SECRET,
  ],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// set up api
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// routers
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/rooms', roomsRouter);
app.use('/travel', travelRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
// Added for enhancement
app.use('/profile', profileRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  if (err.name == 'UnauthorizedError') {
    res
      .status(401)
      .json({ "message": err.name + " : " + err.message});
  }
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
