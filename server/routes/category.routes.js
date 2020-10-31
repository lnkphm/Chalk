const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');

//@desc Get all categories
//@route GET /api/categories
router.get('/', (req, res, next) => {
  Category.find()
  .exec((err, categories) => {
    if (err) {
      return next(err);
    }
    if (!categories) {
      return next();
    }
    return res.send(categories);
  });
});


router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id)
  .exec((err, category) => {
    if (err) {
      return next(err);
    }
    if (!category) {
      return next();
    }
    return res.send(category);
  })
});


router.get('/courses', (req, res) => {
  const query = {
    type: 'course'
  }
  Category.find(query, (err, categories) => {
    if (err) {
      return next(err);
    }
  })
});

router.get('/exams', (req, res) => {});

router.get('/questions', (req, res) => {});

router.post('/', (req, res) => {});
router.put('/', (req, res) => {});
router.delete('/', (req, res) => {});

module.exports = router;
