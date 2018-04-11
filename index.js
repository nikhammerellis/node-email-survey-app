const express = require('express'); //common js module syntax, only module syntax node supports
//import express from 'express'; <- this wont work, this is ES2015 Modules and is not supported in Node (works in React)
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//connect to the database
mongoose.connect(keys.mongoURI);

//initialize the app
const app = express();

//middleware
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000; //use env.PORT for heroku dynamic port binding
app.listen(PORT);
