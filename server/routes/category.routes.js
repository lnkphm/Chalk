const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');

//@desc Get all categories
//@route GET /api/categories
router.get('/', (req, res, next) => {
  Category.find(req.query).exec((err, categories) => {
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
  Category.findById(req.params.id).exec((err, category) => {
    if (err) {
      return next(err);
    }
    if (!category) {
      return next();
    }
    return res.send(category);
  });
});

router.post('/', (req, res, next) => {
  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description,
  });
  newCategory.save((err, category) => {
    if (err) {
      return next(err);
    }
    if (!category) {
      return next();
    }
    return res.status(201).send(category);
  });
});

router.put('/:id', (req, res, next) => {
  const updatedCategory = {
    name: req.body.name,
    description: req.body.description,
  };
  Category.findByIdAndUpdate(
    req.params.id,
    updatedCategory,
    (err, category) => {
      if (err) {
        return next(err);
      }
      if (!category) {
        return next();
      }
      return res.send(category);
    }
  );
});

router.delete('/:id', (req, res, next) => {
  Category.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.send({ message: 'Category deleted' });
  });
});

module.exports = router;
