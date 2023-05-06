const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/registro', (req, res) => {
  res.render('empleados/registro');
});

router.get('/lista', async (req, res) => {
  const list = await pool.query('SELECT * FROM EMPLEADO');
  // console.log(list);
  res.render('empleados/lista', { list });
});

//buscar por id
router.get('/listar', async (req, res) => {
  const nombre = req.query.nombre;
  const apellido = req.query.apellido;
  // console.log(nombre);
  // console.log(apellido);
  await pool.query(
    "SELECT * FROM EMPLEADO WHERE NOMBRE LIKE '%" +
      nombre +
      "%'" +
      "OR APELLIDO LIKE '%" +
      apellido +
      "%'",
    function (error, results) {
      if (!error) {
        if (!results.length == 0) {
          // res.send(results);
          res.render('empleados/lista', { list: results });
        } else {
          res.send(`El Usuario no existe`);
        }
      } else {
        console.log('error en listar empleados');
        res.send(error);
      }
    }
  );
});

router.post('/registro', async (req, res) => {
  const Nombre = req.body.nombre;
  const Apellido = req.body.apellido;
  const idEmpleado = req.body.identificacion;
  const FechaNacimiento = req.body.birthday;
  const Direccion = req.body.direction;
  const Email = req.body.email;
  const Telefono = req.body.phone;
  const Departamento = req.body.department;
  const Cargo = req.body.cargo;
  const FechaIngreso = req.body.ingreso;
  const Sueldo = req.body.sueldo;

  await pool.query(
    'INSERT INTO `EMPLEADO` (`id_empleado`,`nombre`, `apellido`, `fecha_nacimiento`, `direccion`, `email`, `telefono`, `departamento`, `cargo`, `fecha_ingreso`, `sueldo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      idEmpleado,
      Nombre,
      Apellido,
      FechaNacimiento,
      Direccion,
      Email,
      Telefono,
      Departamento,
      Cargo,
      FechaIngreso,
      Sueldo,
    ],
    function (error, results, fields) {
      if (!error) {
        // res.send(`Usuario ${Nombre} Registrado con exito`);
        // res.render('empleados/registro');
        res.redirect('/empleados/lista');
      } else {
        console.log('error al Registrar empleado');
        res.send(error);
      }
    }
  );
});

//Carga los datos en el formulario de actualizar
router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  //convertDate: le da formato a la hora yyyy-mm-dd
  const convertDate = function (dateStr) {
    if (dateStr == '' || dateStr == null) return '';
    var fecha = new Date(dateStr);
    var anio = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var dia = fecha.getDate().toString().padStart(2, '0');
    var fechaFormateada = anio + '-' + mes + '-' + dia;
    return fechaFormateada;
  };
  await pool.query(
    'SELECT * FROM `EMPLEADO` WHERE `id_empleado`= ? ',
    [id],
    function (error, results, fields) {
      if (!error) {
        if (!results.length == 0) {
          let resultFormatDate = results.map((empleado) => {
            let nuevoEmpleado = empleado;
            nuevoEmpleado.fecha_nacimiento = convertDate(
              empleado.fecha_nacimiento
            );
            nuevoEmpleado.fecha_ingreso = convertDate(empleado.fecha_ingreso);
            return nuevoEmpleado;
          });
          // console.log('resultFormatDate', resultFormatDate);

          res.render(`empleados/update`, { data: resultFormatDate });
        } else {
          res.send(`El ID:${id} no existe   y estoy en update`);
        }
      } else {
        console.log('error en listar empleados');
        res.send(error);
      }
    }
  );
});

//Actualiza los datos enviados en el form
router.post('/update', async (req, res) => {
  const Nombre = req.body.nombre;
  const Apellido = req.body.apellido;
  const idEmpleado = req.body.identificacion;
  const FechaNacimiento = req.body.birthday;
  const Direccion = req.body.direction;
  const Email = req.body.email;
  const Telefono = req.body.phone;
  const Cargo = req.body.cargo;
  const Departamento = req.body.department;
  const FechaIngreso = req.body.ingreso;
  const Sueldo = req.body.sueldo;
  const old_id_empleado = req.body.old_id;

  await pool.query(
    'UPDATE `EMPLEADO` SET `id_empleado`= ?,`nombre`= ?,`apellido`= ?,`fecha_nacimiento`= ?,`direccion`= ?,`email`= ?,`telefono`= ?,`departamento`= ?,`cargo`= ?,`fecha_ingreso`= ?,`sueldo`= ? WHERE `id_empleado`= ? ',
    [
      idEmpleado,
      Nombre,
      Apellido,
      FechaNacimiento,
      Direccion,
      Email,
      Telefono,
      Departamento,
      Cargo,
      FechaIngreso,
      Sueldo,
      old_id_empleado,
    ],
    function (error, results, fields) {
      if (!error) {
        // res.send(`Usuario ${Nombre} actualizar con exito`);
        // res.render('empleados/listar', { data: results });
        res.redirect('/empleados/lista');
      } else {
        console.log('error al actualizar empleado');
        res.send(error);
      }
    }
  );
});

router.get('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      'DELETE FROM `EMPLEADO` WHERE `id_empleado`= ?',
      [id],
      function (error, results, fields) {
        // res.send(results);
        res.redirect('/empleados/lista');
      }
    );
  } catch (err) {
    res.send(err);
  }
});

//CODIGO VIEJO NO USADO
// se va a necesitar
//Metodo para traer los proyectos de la base de datos
router.get('/datos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proyecto');
    res.send(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Algo ha ido mal',
    });
  }
});

module.exports = router;
