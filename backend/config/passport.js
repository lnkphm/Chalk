const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        const currentUser = await User.findOne({
          googleId: profile.id,
        });
        if (!currentUser) {
          const newUser = await new User({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImageUrl: profile.photos[0].value,
          }).save();
          if (newUser) {
            cb(null, newUser);
          }
        }
        cb(null, currentUser);
      }
    )
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

