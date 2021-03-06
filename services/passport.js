const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
    // Same as above, but with promises
    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleID: profile.id }).then(existingUser => {
    //     if (existingUser) {
    //       //already have a record with the ID
    //       done(null, existingUser);
    //       console.log('user already exists');
    //     } else {
    //       //dont have a user record, make a new one
    //       new User({ googleID: profile.id })
    //         .save()
    //         .then(user => done(null, user));
    //     }
    //   });
    // }
  )
);
