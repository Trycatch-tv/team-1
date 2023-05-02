const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
  res.send('Hello world');
});
// router.get('/', (req, res) => {
//   res.render('main');
// });

module.exports = router;