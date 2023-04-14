const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/listar', (req, res) => {
   const data =  pool.query('select * from empleados');
   console.log(data);
   res.send('resultados',data)
  //  res.render('./empleados/listarEmpleados', { data: filas });
   
});



module.exports = router;
