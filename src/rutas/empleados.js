const express = require('express');
const router = express.Router();
const pool = require('../database');

//Menu (opcional - solo por mirar)
router.get("/", async(req, res) => {
  res.render('./empleados/menu')
});

//listar Empleados
router.get("/listar", async(req, res) => {
  const lista_Empleados = await pool.query('SELECT * FROM `empleados`',function (error, results, fields){
    if(!error){
      // res.render('./empleados/listarEmpleados', {data:results});
      res.send(results);
    }else{ 
      console.log('error en listar empleados');
      res.send(error)
    }
  });
});

//Buscar empleado por id
router.get("/listar/:id", async(req, res) => {
  const { id } = req.params;
  await pool.query('SELECT * FROM `empleados` WHERE `id`=? ', [id], function (error, results, fields){
    if(!error){
      // res.render('./empleados/listarEmpleados', {data:results});
      if(!results.length==0){
        res.send(results);
      }else{ 
        res.send(`El ID:${id} no existe`);
      }
    }else{ 
      console.log('error en listar empleados');
      res.send(error);
    }
  });
});

//Registrar un Empleado
router.post('/add', async (req, res) => {
  const name  = req.body.name;
  await pool.query('INSERT INTO `empleados` (`id`, `nombre`) VALUES (NULL, ?)', [name], function (error, results, fields){
    if(!error){
        res.send(`Usuario ${name} Registrado con exito`);
    }else{ 
      console.log('error al Registrar empleado');
      res.send(error);
    }
  });
}); 

// //delete
// router.post('/delete', async (req, res) => {
//   const id  = req.body.id;
//   await pool.query('DELETE FROM empleados WHERE id= ?', [id], function (error, results, fields){
//     if(!error){
//         res.send(`Usuario Eliminado con exito`);
//     }else{ 
//       console.log('error al Eliminar empleado');
//       res.send(error);
//     }
//   });
// }); 

// Eliminar un Empleado
router.delete('/delete/:id', async (req, res) => {
  const { id }  = req.params;
  await pool.query('DELETE FROM `empleados` WHERE `id`= ?)', [id], function (error, results, fields){
    res.send()
  });
//   try {
//     const { id } = req.params;
//     // await pool.query('DELETE FROM empleados WHERE id = ?', id);
//     res.send({status: 'deleted'});
// } catch(err) {
//     res.json({status: 'error'});
// }
res.send('estoy en delete')
}); 


module.exports = router;
