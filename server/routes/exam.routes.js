const express = require('express');
const router = express.Router();
const Exam = require('../models/exam.model');
const Question = require('../models/question.model');

// @desc Get all exam
// @route GET /api/exams
router.get('/', (req, res, next) => {
  Exam.find(req.query).exec((err, exams) => {
    if (err) return next(err);
    if (!exams) return next();
    return res.send(exams);
  });
});

// @desc Get exam info
// @route GET /api/exams/:id
router.get('/:id', (req, res, next) => {
  Exam.findById(req.params.id).exec((err, exam) => {
    if (err) return next(err);
    if (!exam) return next();
    return res.send(exam);
  });
});

router.get('/:id/details', (req, res, next) => {
  Exam.findById(req.params.id)
    .populate('questions')
    .exec((err, exam) => {
      if (err) return next(err);
      if (!exam) return next();
      return res.send(exam);
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
    password: req.body.password,
    course: req.body.course,
    questions: [],
  });
  newExam.save((err, exam) => {
    if (err) return next(err);
    if (!exam) return next();
    res.status(201).send(exam);
  });
});

router.post('/:id/questions', (req, res, next) => {
  const questions = req.body.questions;
  Exam.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { questions: { $each: questions } } },
    { new: true },
    (err, exam) => {
      if (err) return next(err);
      questions.forEach((item, index) => {
        Question.findByIdAndUpdate(
          item,
          { $addToSet: { exams: req.params.id } },
          (err) => {
            if (err) return next(err);
          }
        );
      });
      return res.send(exam);
    }
  );
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
    password: req.body.password,
    public: req.body.public,
    questions: req.body.questions,
    course: req.body.course,
  };
  Exam.findByIdAndUpdate(
    req.params.id,
    updatedExam,
    { new: true },
    (err, exam) => {
      if (err) return next(err);
      if (!exam) return next();
      return res.send(exam);
    }
  );
});

// @desc Delete exam
// @route DELETE /api/exams/:examId
router.delete('/:id', (req, res, next) => {
  Exam.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.send({ message: 'Exam deleted' });
  });
});

// @desc Remove question from exam
// @route DELETE /api/exams/:examId/questions/:questionId
router.delete('/:examId/questions/:questionId', (req, res, next) => {
  Exam.findByIdAndUpdate(
    req.params.examId,
    { $pull: { questions: req.params.questionId } },
    { new: true },
    (err, exam) => {
      if (err) return next(err);
      Question.findByIdAndUpdate(
        req.params.questionId,
        { $pull: { exams: req.params.examId } },
        (err) => {
          if (err) return next(err);
        }
      );
      return res.send(exam);
    }
  );
});

module.exports = router;
