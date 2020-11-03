const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureAuth = require('../middleware/ensureAuth');

// @desc Get current user info
// @route GET /api/auth/
router.get('/', ensureAuth, (req, res, next) => {
  res.redirect(`/api/users/${req.user._id}`);
});

// @desc Auth with local account
// @route POST /api/auth/local
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({ message: 'Wrong username/password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
});

// @desc Auth with Google
// @route GET /api/auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc Google auth callback
// @route GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google'),
  (req, res) => {}
);

// @desc Logout
// @route GET /api/auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send({ message: 'User logged out' });
});

module.exports = router;
