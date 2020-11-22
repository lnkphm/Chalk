const express = require('express');
const router = express.Router();
const Question = require('../models/question.model');
const ensureAuth = require('../middleware/ensureAuth');
const ensureNonStudent = require('../middleware/ensureNonStudent');

router.get('/', ensureAuth, ensureNonStudent, (req, res, next) => {
  Question.find(req.query).exec((err, questions) => {
    if (err) return next(err);
    if (!questions) return next();
    return res.send(questions);
  });
});

router.get('/:id', ensureAuth, ensureNonStudent, (req, res, next) => {
  Question.findById(req.params.id)
    .populate('tags')
    .exec((err, question) => {
      if (err) return next(err);
      if (!question) return next();
      return res.send(question);
    });
});

router.post('/', ensureAuth, ensureNonStudent, (req, res, next) => {
  const newQuestion = new Question({
    text: req.body.text,
    type: req.body.type,
    feedback: req.body.feedback,
    answers: req.body.answers,
    points: req.body.points,
    tags: req.body.tags
  });
  newQuestion.save((err, question) => {
    if (err) return next(err);
    if (!question) return next();
    return res.status(201).send(question);
  });
});

router.post('/:id/tags', ensureAuth, ensureNonStudent, (req, res, next) => {
  const tags = req.body.tags;
  Question.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { tags: { $each: tags } } },
    (err, question) => {
      if (err) return next(err);
      return res.send(question);
    }
  );
});

router.put('/:id', ensureAuth, ensureNonStudent, (req, res, next) => {
  const updatedQuestion = {
    text: req.body.text,
    type: req.body.type,
    feedback: req.body.feedback,
    points: req.body.points,
    answers: req.body.answers,
  };
  Question.findByIdAndUpdate(
    req.params.id,
    updatedQuestion,
    (err, question) => {
      if (err) return next(err);
      return res.send(question);
    }
  );
});

router.delete('/:id', ensureAuth, ensureNonStudent, (req, res, next) => {
  Question.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.send({ message: 'Question deleted!' });
  });
});

router.delete('/:questionId/tags/:tagId', ensureAuth, ensureNonStudent, (req, res, next) => {
  Question.findByIdAndUpdate(
    req.params.questionId,
    { $pull: { tags: req.params.tagId } },
    { new: true},
    (err, question) => {
      if (err) return next(err);
      return res.send(question);
    }
  );
});

module.exports = router;
