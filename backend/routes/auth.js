const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureAuth = require("../middleware/ensureAuth");
const ensureGuest = require("../middleware/ensureGuest");

// @desc Get current user info
// @route GET /api/auth/
router.get("/", ensureAuth, (req, res) => {
  res.send(req.user);
});

// @desc Auth with local account
// @route POST /api/auth/local
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

// @desc Auth with Google
// @route GET /api/auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc Google auth callback
// @route GET /api/auth/google/callback
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.send(req.user);
});

// @desc Logout
// @route GET /api/auth/logout
router.get("/logout", ensureAuth, (req, res) => {
  req.logout();
  res.status(200).json("User logged out!");
});

module.exports = router;
