const express = require('express');
const router = express.Router();
const UserPaper = require('../models/UserPaper');

router.get('/', (req, res) => {
  UserPaper.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
  UserPaper.findById(req.params.id)
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
