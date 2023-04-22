const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/nuevo', (req, res) => {
  res.render('proyecto/nuevo');
});


module.exports = router;