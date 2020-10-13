const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get("/", (req, res) => {
  Course.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/:id", (req, res) => {
  Role.findById(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/", (req, res) => {
  
})

router.put("/:id", (req, res) => {

})

router.delete("/:id", (req, res) => {

})

module.exports = router;