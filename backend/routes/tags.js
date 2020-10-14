const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

router.get('/', (req, res) => {
  Tag.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;
