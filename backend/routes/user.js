const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(err));
});

router.post("/add", (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const name = req.body.name;
        const newUser = new User({
          username: username,
          email: email,
          name: name,
          hash: "",
          salt: "",
        });
        newUser.setPassword(password);
        newUser
          .save()
          .then(() => res.json("User added"))
          .catch((err) => res.status(400).json(err));
      } else {
        res.json("User already exist!");
      }
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
