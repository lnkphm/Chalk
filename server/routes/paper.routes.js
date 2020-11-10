const express = require('express');
const router = express.Router();
const Paper = require('../models/paper.model');

router.get('/', (req, res, next) => {
  Paper.find(req.query)
    .exec((err, papers) => {
      if (err) return next(err);
      if (!papers) return next();
      return res.send(papers);
    });
});

router.get('/:id', (req, res, next) => {
  Paper.findById(req.params.id)
    .exec((err, paper) => {
      if (err) return next(err);
      if (!paper) return next();
      return res.send(paper);
    });
});

router.get('/:id/details', (req, res, next) => {
  Paper.findById(req.params.id)
    .populate('user')
    .populate({
      path: 'exam',
      populate: {
        path: 'questions',
      },
    })
    .exec((err, paper) => {
      if (err) return next(err);
      if (!paper) return next();
      return res.send(paper);
    });
});


router.post('/', (req, res, next) => {
  const newPaper = new Paper({
    user: req.body.user,
    exam: req.body.exam,
    submitted: req.body.submitted,
    timeRemaining: req.body.timeRemaining,
    data: req.body.data,
  });
  newPaper.save((err, paper) => {
    if (err) return next(err);
    if (!paper) return next();
    return res.status(201).send(paper);
  });
});

router.put('/:id', (req, res, next) => {
  const updatedPaper = {
    user: req.body.user,
    exam: req.body.exam,
    submitted: req.body.submitted,
    timeRemaining: req.body.timeRemaining,
    data: req.body.data,
  };
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
});

router.delete('/:id', (req, res, next) => {
  Paper.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.send({ message: 'Paper deleted!' });
  });
});

module.exports = router;
