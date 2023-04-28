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

router.get('/lista', (req, res) => {
  const list = [  {    "id": 1,    "nombres": "Juan Carlos",    "apellidos": "García Pérez",    "cargo": "Programador",    "estado": 1  },  
                  {    "id": 2,    "nombres": "María Fernanda",    "apellidos": "González Ortiz",    "cargo": "Diseñadora",    "estado": 0  },  
                  {    "id": 3,    "nombres": "Carlos Andrés",    "apellidos": "Martínez Suárez",    "cargo": "Gerente",    "estado": 1  },  
                  {    "id": 4,    "nombres": "Laura Andrea",    "apellidos": "Castro Sánchez",    "cargo": "Contadora",    "estado": 0  },  
                  {    "id": 5,    "nombres": "Santiago Alejandro",    "apellidos": "Rojas Ramírez",    "cargo": "Ingeniero",    "estado": 1  },  
                  {    "id": 6,    "nombres": "Ana Sofía",    "apellidos": "Hernández González",    "cargo": "Marketing",    "estado": 0  },  
                  {    "id": 7,    "nombres": "Juan David",    "apellidos": "Herrera Gutiérrez",    "cargo": "Programador",    "estado": 1  },  
                  {    "id": 8,    "nombres": "Paola Alejandra",    "apellidos": "Ortiz Pérez",    "cargo": "Diseñadora",    "estado": 0  },  
                  {    "id": 9,    "nombres": "Jorge Alberto",    "apellidos": "Ramírez Castro",    "cargo": "Gerente",    "estado": 1  },  
                  {    "id": 10,    "nombres": "Isabela Sofía",    "apellidos": "López Hernández",    "cargo": "Contadora",    "estado": 0  }];


  res.render('empleados/lista',{list});
});

// router.get('/', (req, res) => {
//   res.send('asas');
// });

// app.use('/', function (req, res, next) {
//   res.render('User')
//   next();
// });

module.exports = router;
