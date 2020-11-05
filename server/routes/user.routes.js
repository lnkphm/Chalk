const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Course = require('../models/course.model');
const Paper = require('../models/paper.model');
const Exam = require('../models/exam.model');

// @desc Get all users info
// @route GET /api/users
router.get('/', (req, res, next) => {
  User.find()
    .select('-hash -salt')
    .exec((err, users) => {
      if (err) {
        return next(err);
      }
      if (!users) {
        return next();
      }
      return res.send(users);
    });
});

// @desc Get user info with id
// @route GET /api/users/:id
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .select('-hash -salt')
    .populate('courses')
    .exec((err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next();
      }
      return res.send(user);
    });
});

// @desc Get all user's courses
// @route GET /api/users/:id/courses
router.get('/:id/courses', (req, res, next) => {
  User.findById(req.params.id)
    .select('-hash -salt')
    .populate('courses')
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next();
      return res.send(user.courses);
    })
});

// @desc Get all user's papers
// @route GET /api/users/:id/papers
router.get('/:id/papers', (req, res, next) => {
  Paper.find({ user: req.params.id }, (err, papers) => {
    if (err) {
      return next(err);
    }
    if (!papers) {
      return next();
    }
    return res.send(papers);
  });
});

// @desc Get all user's exams
// @route GET /api/users/:id/exams
router.get('/:id/exams', (req, res, next) => {

});

// @desc Create new user
// @route POST /api/users
router.post('/', (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(409).send({ message: 'User already exists!' });
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      avatar: req.body.avatar,
      role: req.body.role,
      courses: [],
    });
    newUser.setPassword(req.body.password);
    newUser.save((err, user) => {
      if (err) {
        return next(err);
      }
      return res.status(201).send(user);
    });
  });
});

// @desc Update user
// @route PUT /api/users/:id
router.put('/:id', (req, res, next) => {
  const updatedUser = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    avatar: req.body.avatar,
    role: req.body.role,
  };
  
  User.findByIdAndUpdate({ _id: req.params.id }, updatedUser, (err, user) => {
    if (err) {
      return next(err);
    }
    return res.send(user);
  });
});

// @desc Delete user
// @route DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      return next(err);
    }
    return res.send({ message: 'User deleted!' });
  });
});

module.exports = router;
