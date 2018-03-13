const express = require('express'); //common js module syntax, only module syntax node supports
//import express from 'express'; <- this wont work, this is ES2015 Modules and is not supported in Node (works in React)
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    //^the GoogleStrategy has this 'google' string internally
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000; //use env.PORT for heroku dynamic port binding
app.listen(PORT);
