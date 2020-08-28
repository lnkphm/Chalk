const express = require("express");
const router = express.Router();
const passport = require("passport");
const CLIENT_HOME = "http://localhost:3000/";

// @desc Get Authentical User Info
// @route GET /auth/login
router.get("/user", (req, res) => {
  res.send(req.user);
})

// @desc Login failed
// @route GET /auth/login/failed
router.get("/failed", (req, res) => {
  res.status(401).json("Failed!");
});

// @desc Auth with Google
// @route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    successRedirect: CLIENT_HOME,
  })
);

// @desc Logout
// @route GET /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME);
});


module.exports = router;
