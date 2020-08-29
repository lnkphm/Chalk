const express = require("express");
const router = express.Router();
const CLIENT_HOME = "http://localhost:3000";

const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json("User Unauthorized");
    res.redirect(CLIENT_HOME);
  }
};

// @desc Get user info
// @route GET /
router.get("/", authCheck, (req, res) => {
  res.json("Back to client");
  res.redirect(CLIENT_HOME);
})

module.exports = router;
