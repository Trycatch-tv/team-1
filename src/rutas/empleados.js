const express = require("express");
const router = express.Router();
const pool = require("../database");

//listar Empleados - http://localhost:3000/empleados/listar
router.get("/listar", async (req, res) => {
  const lista_Empleados = await pool.query(
    "SELECT * FROM `empleado`",
    function (error, results, fields) {
      if (!error) {
        res.render("./empleados/listar", { data: results });
      } else {
        console.log("error en listar empleados");
        res.send(error);
      }
    }
  );
});

//Buscar empleado por id - http://localhost:3000/empleados/listar/1
router.get("/listar/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(
    "SELECT * FROM `empleados` WHERE `id`=? ",
    [id],
    function (error, results, fields) {
      if (!error) {
        if (!results.length == 0) {
          res.send(results);
        } else {
          res.send(`El ID:${id} no existe`);
        }
      } else {
        console.log("error en listar empleados");
        res.send(error);
      }
    }
  );
});

//Registrar un Empleado - http://localhost:3000/empleados/add json: {"id":""}
//ingresar la DNI como PK
router.post("/registro", async (req, res) => {
  const Nombre = req.body.name;
  const Apellido = req.body.apellido;
  const idEmpleado = req.body.identificacion;
  const FechaNacimiento = req.body.birthday;
  const Direccion = req.body.direction;
  const Email = req.body.email;
  const Telefono = req.body.phone;
  const Cargo = req.body.cargo;
  const Departamento = req.body.departament;
  const Proyecto = req.body.project;
  const FechaIngreso = req.body.ingreso;
  const Sueldo = req.body.sueldo;
  await pool.query(
    "INSERT INTO `empleado` (`nombre`, `apellido`, `id_empleado`, `fecha_nacimiento`, `direccion`, `email`, `telefono`, `cargo`, `departamento`, `proyecto`, `fecha_ingreso`, `sueldo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      Nombre,
      Apellido,
      idEmpleado,
      FechaNacimiento,
      Direccion,
      Email,
      Telefono,
      Cargo,
      Departamento,
      Proyecto,
      FechaIngreso,
      Sueldo,
    ],
    function (error, results, fields) {
      if (!error) {
        res.send(`Usuario ${Nombre} Registrado con exito`);
        // res.render('empleados/registro');
      } else {
        console.log("error al Registrar empleado");
        res.send(error);
      }
    }
  );
});

// opcional//delete
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

// Eliminar un Empleado - http://localhost:3000/empleados/9
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // INSERT INTO `empleado` (`nombre`, `apellido`, `id_empleado`, `fecha_nacimiento`, `direccion`, `email`, `telefono`, `cargo`, `departamento`, `proyecto`, `fecha_ingreso`, `sueldo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    await pool.query(
      "DELETE FROM `empleados` WHERE `id`= ?",
      [id],
      function (error, results, fields) {
        res.send(results);
      }
    );
  } catch (err) {
    res.send(err);
  }
});

// actualizar un Empleado - http://localhost:3000/empleados/ json: {id, name}
router.put("/", async (req, res) => {
    console.log('estoy en PUT');
    const data  = req.body
    console.log(data);
    
    // console.log(req.headers);
 

  // const Nombre = req.body.name;
  // const Apellido = req.body.apellido;
  // const idEmpleado = req.body.identificacion;
  // const FechaNacimiento = req.body.birthday;
  // const Direccion = req.body.direction;
  // const Email = req.body.email;
  // const Telefono = req.body.phone;
  // const Cargo = req.body.cargo;
  // const Departamento = req.body.departament;
  // const Proyecto = req.body.project;
  // const FechaIngreso = req.body.ingreso;
  // const Sueldo = req.body.sueldo;
  // await pool.query(
  //   "UPDATE `empleados` SET `nombre`= ?,`apellido`= ?,`id_empleado`= ?,`fecha_nacimiento`= ?,`direccion`= ?,`email`= ?,`telefono`= ?,`cargo`= ?,`departamento`= ?,`proyecto`= ?,`fecha_ingreso`= ?,`sueldo`= ? WHERE `id_empleado`= ?",
  //   [
  //     Nombre,
  //     Apellido,
  //     idEmpleado,
  //     FechaNacimiento,
  //     Direccion,
  //     Email,
  //     Telefono,
  //     Cargo,
  //     Departamento,
  //     Proyecto,
  //     FechaIngreso,
  //     Sueldo,
  //   ],
  //   function (error, results, fields) {
  //     var rows = JSON.parse(JSON.stringify(results));
  //     if (!error) {
  //       if (rows.affectedRows == 0) {
  //         res.send("no se hizo ningun cambio en la DB");
  //       } else {
  //         res.send(`Usuario ${Nombre} actualizado con exito`);
  //       }
  //     } else {
  //       console.log(`error al Actualzar empleado ${Nombre}`);
  //       res.send(error);
  //     }
  //   }
  // );
});

router.get("/registro", (req, res) => {
  res.render("empleados/registro");
});

router.get("/login", (req, res) => {
  res.render("empleados/login");
});

//llenar el formulario para actualizar datos del empleado.
router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const convertDate = function (dateStr) {
    if (dateStr == "" || dateStr == null) return "";
    var fecha = new Date(dateStr);
    var anio = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    var dia = fecha.getDate().toString().padStart(2, "0");
    var fechaFormateada = anio + "-" + mes + "-" + dia;
    return fechaFormateada;
  };
  await pool.query(
    "SELECT * FROM `empleado` WHERE `id_empleado`=? ",
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
          // console.log("resultFormatDate", resultFormatDate);
          res.render("empleados/update", { data: resultFormatDate });
        } else {
          res.send(`El ID:${id} no existe`);
        }
      } else {
        console.log("error en listar empleados");
        res.send(error);
      }
    }
  );
});

module.exports = router;
