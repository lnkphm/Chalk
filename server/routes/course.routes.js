const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');
const User = require('../models/user.model');

// @desc Get all courses
// @route GET /api/courses
router.get('/', (req, res, next) => {
  Course.find(req.query).exec((err, courses) => {
    if (err) return next(err);
    if (!courses) return next();
    return res.send(courses);
  });
});

// @desc Get course info
// @route GET /api/courses/:id
router.get('/:id', (req, res, next) => {
  Course.findById(req.params.id)
    .populate('category')
    .populate('users', '-courses -hash -salt')
    .exec((err, course) => {
      if (err) return next(err);
      if (!course) return next();
      return res.send(course);
    });
});

// @desc Get all user info from course
// @route GET /api/courses/:id/users
router.get('/:id/users', (req, res, next) => {
  Course.findById(req.params.id)
    .populate('users', '-courses -hash -salt')
    .exec((err, course) => {
      if (err) return next(err);
      if (!course) return next();
      return res.send(course.users);
    });
});

// @desc Create new course
// @route POST /api/courses
router.post('/', (req, res, next) => {
  const newCourse = new Course({
    name: req.body.name,
    description: req.body.description,
    dateStart: Date.parse(req.body.dateStart),
    dateEnd: Date.parse(req.body.dateEnd),
    public: req.body.public,
    password: req.body.password,
    category: req.body.category,
    users: [],
  });
  newCourse.save((err, course) => {
    if (err) return next(err);
    if (!course) return next();
    return res.status(201).send(course);
  });
});

// @desc Add user to course
// @route PUT /api/courses/:courseId/users
router.post('/:courseId/users', (req, res, next) => {
  const users = req.body.users;
  Course.findByIdAndUpdate(
    req.params.courseId,
    { $addToSet: { users: { $each: users } } },
    { new: true },
    (err, course) => {
      if (err) return next(err);
      users.forEach((user, index) => {
        User.findByIdAndUpdate(
          user,
          { $addToSet: { courses: req.params.courseId } },
          (err) => {
            if (err) return next(err);
          }
        );
      });
      return res.send(course);
    }
  );
});

// @desc Update course
// @route PUT /api/courses/:id
router.put('/:id', (req, res, next) => {
  const updatedCourse = {
    name: req.body.name,
    description: req.body.description,
    dateStart: Date.parse(req.body.dateStart),
    dateEnd: Date.parse(req.body.dateEnd),
    public: req.body.public,
    category: req.body.category,
    password: req.body.password,
  };
  Course.findByIdAndUpdate(
    req.params.id,
    updatedCourse,
    { new: true },
    (err, course) => {
      if (err) return next(err);
      if (!course) return next();
      return res.send(course);
    }
  );
});

// @desc Delete course
// @route DELETE /api/courses/:id
router.delete('/:id', (req, res, next) => {
  Course.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.send({ message: 'Course deleted' });
  });
});

// @desc Remove user from course
// @route DELETE /api/courses/:courseId/users/:userId
router.delete('/:courseId/users/:userId', (req, res, next) => {
  Course.findByIdAndUpdate(
    req.params.courseId,
    { $pull: { users: req.params.userId } },
    { new: true },
    (err, course) => {
      if (err) return next(err);
      User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { courses: req.params.courseId } },
        (err) => {
          if (err) return next(err);
        }
      );
      return res.send(course);
    }
  );
});

module.exports = router;
