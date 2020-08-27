const express = require("express");
const router = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json("User Unauthorized");
  } else {
    next();
  }
};

// @desc Get user info
// @route GET /
router.get("/", authCheck, (req, res) => {
  res.status(200).json(req.user)
})

module.exports = router;
