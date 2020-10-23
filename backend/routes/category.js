const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', (req, res) => {});
router.get('/:id', (req, res) => {});
router.get('/courses', (req, res) => {});
router.get('/quizzes', (req, res) => {});
router.get('/questions', (req, res) => {});
router.post('/', (req, res) => {});
router.put('/', (req, res) => {});
router.delete('/', (req, res) => {});

module.exports = router;
