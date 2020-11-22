const express = require('express');
const router = express.Router();
const Tag = require('../models/tag.model');
const ensureAuth = require('../middleware/ensureAuth');
const ensureNonStudent = require('../middleware/ensureNonStudent');


//@desc Get all tags
//@route GET /api/tags
router.get('/', ensureAuth, (req, res, next) => {
  Tag.find(req.query).exec((err, tags) => {
    if (err) {
      return next(err);
    }
    if (!categories) {
      return next();
    }
    return res.send(tags);
  });
});

//@desc Get tag info
//@route GET /api/tags/:id
router.get('/:id', ensureAuth, (req, res, next) => {
  Tag.findById(req.params.id).exec((err, tag) => {
    if (err) {
      return next(err);
    }
    if (!tag) {
      return next();
    }
    return res.send(tag);
  });
});

router.post('/', ensureAuth, ensureNonStudent, (req, res, next) => {
  const newTag = new Tag({
    name: req.body.name,
    description: req.body.description,
  });
  newTag.save((err, tag) => {
    if (err) {
      return next(err);
    }
    if (!tag) {
      return next();
    }
    return res.status(201).send(tag);
  });
});

router.put('/:id', ensureAuth, ensureNonStudent, (req, res, next) => {
  const updatedTag = {
    name: req.body.name,
    description: req.body.description,
  };
  Tag.findByIdAndUpdate(
    req.params.id,
    updatedTag,
    { new: true },
    (err, tag) => {
      if (err) {
        return next(err);
      }
      if (!tag) {
        return next();
      }
      return res.send(tag);
    }
  );
});

router.delete('/:id', ensureAuth, ensureNonStudent, (req, res, next) => {
  Tag.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    return res.send({ message: 'Tag deleted' });
  });
});

module.exports = router;
