const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const ensureAuth = require('../middleware/ensureAuth');
const ensureAdmin = require('../middleware/ensureAdmin');

// @desc Get all users info
// @route GET /api/users
router.get('/', ensureAuth, (req, res, next) => {
  User.find(req.query)
    .select('-username -hash -salt')
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
router.get('/:id', ensureAuth, (req, res, next) => {
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
router.get('/:id/courses', ensureAuth, (req, res, next) => {
  User.findById(req.params.id)
    .select('-hash -salt')
    .populate('courses')
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next();
      return res.send(user.courses);
    });
});

// @desc Create new user
// @route POST /api/users
router.post('/', ensureAuth, ensureAdmin, (req, res, next) => {
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
router.put('/:id', ensureAuth, (req, res, next) => {
  const updatedUser = new User({
    email: req.body.email,
    name: req.body.name,
    role: req.body.role,
  });
  User.findByIdAndUpdate(
    { _id: req.params.id },
    updatedUser,
    { new: true },
    (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next();
      }
      return res.send(user);
    }
  );
});

router.put('/:id/password', ensureAuth, (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user) return next();
    if (user.validPassword(req.body.currentPassword)) {
      user.setPassword(req.body.newPassword);
      user.save((err) => {
        if (err) return next(err);
        return res.send({ message: 'Password updated' });
      });
    } else {
      return res.send({ message: 'Wrong Password!' });
    }
  });
});

router.put('/:id/reset-password', ensureAuth, ensureAdmin, (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user) return next();
    user.setPassword(req.body.newPassword);
    user.save((err) => {
      if (err) return next(err);
      return res.send({ message: 'Password reset!' });
    });
  });
});

// @desc Delete user
// @route DELETE /api/users/:id
router.delete('/:id', ensureAuth, ensureAdmin, (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      return next(err);
    }
    return res.send({ message: 'User deleted!' });
  });
});

module.exports = router;
