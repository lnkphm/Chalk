const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        const currentUser = await User.findOne({
          googleId: profile.id,
        });
        if (!currentUser) {
          const newUser = await new User({
            googleId: profile.id,
            username: '',
            name: profile.displayName,
            avatar: profile.photos[0].value,
            email: profile.emails[0].value,
            courses: [],
          }).save();
          if (newUser) {
            cb(null, newUser);
          }
        }
        cb(null, currentUser);
      }
    )
  );

  passport.use(
    new LocalStrategy(function (username, password, cb) {
      User.findOne({ username: username })
        .then((user) => {
          if (!user) return cb(null, false);
          const isValid = user.validPassword(password);
          if (isValid) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        })
        .catch((err) => {
          return cb(err);
        });
    })
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
      if (err) {
        cb(err);
      }
      cb(null, user);
    });
  });
};
