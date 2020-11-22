const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');
const ensureNonStudent = require('../middleware/ensureNonStudent');
const ensureAuth = require('../middleware/ensureAuth');

//@desc Get all categories
//@route GET /api/categories
router.get('/', ensureAuth, (req, res, next) => {
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

router.get('/:id', ensureAuth, (req, res, next) => {
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

router.post('/', ensureAuth, ensureNonStudent, (req, res, next) => {
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

router.put('/:id', ensureAuth, ensureNonStudent, (req, res, next) => {
  const updatedCategory = {
    name: req.body.name,
    description: req.body.description,
  };
  Category.findByIdAndUpdate(
    req.params.id,
    updatedCategory,
    { new: true },
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

router.delete('/:id', ensureAuth, ensureNonStudent, (req, res, next) => {
  Category.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.send({ message: 'Category deleted' });
  });
});

module.exports = router;
