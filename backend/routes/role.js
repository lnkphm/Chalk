const express = require("express");
const router = express.Router();
const Role = require("../models/Role");

router.get("/", (req, res) => {
  Role.find()
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