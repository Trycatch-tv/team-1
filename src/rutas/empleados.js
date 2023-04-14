const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/as', (req, res) => {
  res.render('empleados/prueba');
});

// router.get('/', (req, res) => {
//   res.send('asas');
// });

// app.use('/', function (req, res, next) {
//   res.render('User')
//   next();
// });

module.exports = router;
