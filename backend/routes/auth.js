const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureAuth = require("../middleware/ensureAuth");
const ensureGuest = require("../middleware/ensureGuest");

// @desc Get current user info
// @route GET /auth/login
router.get("/user", ensureAuth, (req, res) => {
  res.json({
    username: req.user.username,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
  });
});

// @desc Auth with local account
// @route POST /auth/local
router.post(
  "/local",
  ensureGuest,
  passport.authenticate("local"),
  (req, res) => {
    res.redirect("/");
  }
);

// @desc Auth with Google
// @route GET /auth/google
router.get("/google", ensureGuest, passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

// @desc Logout
// @route GET /auth/logout
router.get("/logout", ensureAuth, (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
