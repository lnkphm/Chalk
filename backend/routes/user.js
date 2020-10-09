const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ensureAuth = require("../middleware/ensureAuth");

router.get("/", ensureAuth, (req, res) => {
  User.find().select("_id username email name avatar")
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
});

router.post("/add", (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const newUser = new User({
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
        });
        newUser.setPassword(password);
        newUser
          .save()
          .then(() => res.status(201).send({
            username: newUser.username,
            email: newUser.email,
            name: newUser.name
          }))
          .catch((err) => res.status(400).send(err));
      } else {
        res.json("User already exist!");
      }
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
