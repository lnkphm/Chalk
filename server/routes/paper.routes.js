const express = require('express');
const router = express.Router();
const Paper = require('../models/paper.model');
const Exam = require('../models/exam.model');
const ensureAuth = require('../middleware/ensureAuth');
const ensureNonStudent = require('../middleware/ensureNonStudent');

router.get('/', ensureAuth, (req, res, next) => {
  Paper.find(req.query).populate('user').exec((err, papers) => {
    if (err) return next(err);
    if (!papers) return next();
    return res.send(papers);
  });
});

router.get('/:id', ensureAuth, (req, res, next) => {
  Paper.findById(req.params.id)
    .populate('user')
    .populate('exam')
    .populate({
      path: 'data',
      populate: {
        path: 'question',
      },
    })
    .exec((err, paper) => {
      if (err) return next(err);
      if (!paper) return next();
      return res.send(paper);
    });
});

router.post('/', ensureAuth, (req, res, next) => {
  const newPaper = new Paper({
    user: req.body.user,
    exam: req.body.exam,
    submitted: req.body.submitted,
    timeRemaining: req.body.timeRemaining,
    graded: false,
    data: req.body.data,
  });
  newPaper.save((err, paper) => {
    if (err) return next(err);
    if (!paper) return next();
    return res.status(201).send(paper);
  });
});

function GradePaper(paper, exam) {
  let newData = paper.data;
  let questions = exam.questions;
  for (let i = 0; i < newData.length; ++i) {
    if (newData[i].answer !== '') {
      questions.forEach((question) => {
        if (newData[i].question === question._id.toString()) {
          if (question.type === 'multiple_choice') {
            question.answers.forEach((answer) => {
              if (newData[i].answer === answer._id.toString()) {
                if (answer.correct) {
                  newData[i].points = question.points
                }
              }
            })
          }
          if (question.type === 'short_answer') {
            question.answers.forEach((answer) => {
              if (newData[i].answer === answer.text) {
                newData[i].points = question.points
              }
            })
          }
        }
      })
    }
  }

  let newPaper = {...paper, data: newData, graded: true};
  return newPaper;
}

router.put('/:id', ensureAuth, (req, res, next) => {
  let updatedPaper = {
    user: req.body.user,
    exam: req.body.exam,
    submitted: req.body.submitted,
    timeRemaining: req.body.timeRemaining,
    data: req.body.data,
    grade: false,
  };

  if (updatedPaper.submitted) {
    Exam.findById(req.body.exam)
    .populate('questions')
    .exec((err, exam) => {
      const newPaper = GradePaper(updatedPaper, exam);
      Paper.findByIdAndUpdate(
        req.params.id,
        newPaper,
        { new: true },
        (err, paper) => {
          if (err) return next(err);
          if (!paper) return next();
          return res.send(paper);
        }
      );
    })
  } else {
    Paper.findByIdAndUpdate(
      req.params.id,
      updatedPaper,
      { new: true },
      (err, paper) => {
        if (err) return next(err);
        if (!paper) return next();
        return res.send(paper);
      }
    );
  }
});

router.delete('/:id', ensureAuth, ensureNonStudent, (req, res, next) => {
  Paper.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.send({ message: 'Paper deleted!' });
  });
});

module.exports = router;
