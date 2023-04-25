const express = require('express');
const router = express.Router();
const pool = require('../database');
const getDatos = require('c:/Users/Leonel Amaya/Documents/Dev/projects/proyecto-try-catch/team-1/src/controles/control');

router.get('/as', (req, res) => {
  res.render('empleados/prueba');
});

router.get('/registro', (req, res) => {
  res.render('empleados/registro');
});

router.get('/datosingreso', (req, res) => {
  res.render('empleados/datosingreso');
});

router.get('/datos', getDatos);

// router.get('/', (req, res) => {
//   res.send('asas');
// });

// app.use('/', function (req, res, next) {
//   res.render('User')
//   next();
// });

module.exports = router;
