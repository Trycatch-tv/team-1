const express = require('express');
const router = express.Router();
const pool = require('../database');
const {crearEmpleados} = require('../controles/empleados.controles');

router.get('/as', (req, res) => {
  res.render('empleados/prueba');
});

router.get('/registro', (req, res) => {
  res.render('empleados/registro');
});

// router.get('/', (req, res) => {
//   res.send('asas');
// });

router.post('/empleados', crearEmpleados)
// app.use('/', function (req, res, next) {
//   res.render('User')
//   next();
// });

module.exports = router;
