const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Paper = require('../models/paper');
const Exam = require('../models/exam');

router.get('/', (req, res) => {
  User.find()
    .select('-hash -salt')
    .exec(function (err, users) {
      if (err) res.status(400).send(err);
      if (!users) {
        res.status(404).send('Not Found!');
      } else {
        res.status(200).send(users);
      }
    });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .select('-hash -salt')
    .exec(function (err, user) {
      if (err) res.status(400).send(err);
      if (!user) {
        res.status(404).send('Not Found!');
      } else {
        res.status(200).send(user);
      }
    });
});

router.get('/:id/courses', (req, res) => {
  Course.find({ 'users.id': req.params.id }, (err, courses) => {
    if (err) res.status(400).send(err);
    if (!courses) {
      res.status(404).send('Not Found!');
    } else {
      res.status(200).send(courses);
    }
  });
});

router.get('/:id/papers', (req, res) => {
  Paper.find({ user: req.params.id }, (err, papers) => {
    if (err) res.status(400).send(err);
    if (!papers) {
      res.status(404).send('Not Found!');
    } else {
      res.status(200).send(papers);
    }
  });
});

router.get('/:id/exams', (req, res) => {
  Quiz.find({ user: req.params.id }, (err, exams) => {
    if (err) res.status(400).send(err);
    if (!exams) {
      res.status(404).send('Not Found');
    } else {
      res.status(200).send(exams);
    }
  });
});

router.post('/', (req, res) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) res.status(400).send(err);
    if (user) {
      res.send('User already exist!');
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        avatar: req.body.avatar,
      });
      newUser.setPassword(req.body.password);
      newUser.save((err) => {
        if (err) res.status(400).send(err);
        res.status(201).send(`User created!`);
      });
    }
  });
});

router.put('/:id', (req, res) => {
  const updatedUser = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    avatar: req.body.avatar,
  };
  User.setPassword(req.body.password);
  User.findByIdAndUpdate({ _id: req.params.id }, updatedUser, (err, user) => {
    if (err) res.status(400).send(err);
    if (!user) {
      res.status(404).send('Not Found!');
    } else {
      res.status(200).send('User updated!');
    }
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) res.status(400).send(err);
    res.status(200).send('User deleted!');
  });
});

module.exports = router;
