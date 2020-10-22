const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  User.find()
    .select('_id username email name avatar')
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .select('_id username name email avatar')
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
});

router.post('/', (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          name: req.body.name,
        });
        newUser.setPassword(req.body.password);
        newUser
          .save()
          .then(() =>
            res.status(201).send({
              username: newUser.username,
              email: newUser.email,
              name: newUser.name,
            })
          )
          .catch((err) => res.status(400).send(err));
      } else {
        res.json('User already exist!');
      }
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
