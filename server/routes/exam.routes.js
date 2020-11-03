const express = require('express');
const router = express.Router();
const Exam = require('../models/exam.model');

// @desc Get all exam
// @route GET /api/exams
router.get('/', (req, res, next) => {
  const query = {
    course: (req.query.course ? req.query.course : ""),
  }
  Exam.find(query)
    .select('-questions')
    .exec((err, exams) => {
      if (err) return next(err);
      if (!exams) return next();
      return res.send(exams);
    });
});

// @desc Get exam info
// @route GET /api/exams/:id
router.get('/:id', (req, res, next) => {
  Exam.findById(req.params.id)
    .select('-questions')
    .exec((err, exam) => {
      if (err) return next(err);
      if (!exam) return next();
      return res.send(exam);
    });
});

router.get('/:id/questions', (req, res, next) => {
  Exam.findById(req.params.id)
    .populate('questions')
    .exec((err, exam) => {
      if (err) return next(err);
      if (!exam) return next();
      return res.send(exam.questions);
    });
});

router.post('/', (req, res, next) => {
  const newExam = new Exam({
    title: req.body.title,
    description: req.body.description,
    dateOpen: Date.parse(req.body.dateOpen),
    dateClose: Date.parse(req.body.dateClose),
    duration: req.body.duration,
    shuffle: req.body.shuffle,
    gradingMethod: req.body.gradingMethod,
    public: req.body.public,
    course: req.body.course,
    questions: [],
  });
  newExam.save((err, exam) => {
    if (err) return next(err);
    if (!exam) return next();
    res.status(201).send(exam);
  });
});

router.put('/:id', (req, res, next) => {
  const updatedExam = {
    title: req.body.title,
    description: req.body.description,
    dateOpen: Date.parse(req.body.dateOpen),
    dateClose: Date.parse(req.body.dateClose),
    duration: req.body.duration,
    shuffle: req.body.shuffle,
    gradingMethod: req.body.gradingMethod,
    public: req.body.public,
    course: req.body.course,
    questions: [],
  };
  Exam.findByIdAndUpdate(req.params.id, updatedExam, (err, exam) => {
    if (err) return next(err);
    if (!exam) return next();
    return res.send(exam);
  });
});

router.delete('/:id', (req, res, next) => {
  Exam.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.send({ message: 'Exam deleted' });
  });
});

module.exports = router;
