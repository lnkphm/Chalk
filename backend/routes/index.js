const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc Login/Landing Page
// @route GET /
router.get("/", ensureGuest, (req, res) => {
})

// @decv Home
// @route GET /home
router.get("/home", ensureAuth, (req, res) => {
  console.log(req.user);
})

module.exports = router;
