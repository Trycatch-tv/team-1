const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/as', (req, res) => {
  res.render('empleados/prueba');
});

router.get('/registro', (req, res) => {
  res.render('empleados/registro');
});

router.get('/datosingreso', (req, res) => {
  res.render('empleados/datosingreso');
});


// router.get('/', (req, res) => {
//   res.send('asas');
// });

// app.use('/', function (req, res, next) {
//   res.render('User')
//   next();
// });

module.exports = router;
