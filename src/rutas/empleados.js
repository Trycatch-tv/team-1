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

router.get('/lista', async (req, res) => {
  const list = await pool.query('SELECT * FROM EMPLEADO');
  // console.log(list);
  res.render('empleados/lista', { list });
});
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

//Metodo para ingresar los proyectos
router.post('/ingresodatos', async (req, res) => {
  const { cargo, proyecto, descripcion } = req.body;
  console.log(cargo, proyecto, descripcion);

  try {
    const rows = await pool.query(
      'INSERT INTO proyecto(cargo, proyecto, descripcion) VALUES (?, ?, ?, ?)',
      [cargo, proyecto, descripcion]
    );
    return res.send({
      idDato: rows.insertId,
      cargo,
      proyecto,
      departamento,
      descripcion,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Algo ha ido mal',
    });
  }
});

//Metodo para eliminar proyectos
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM datos_ingreso WHERE idDato = ?',
      [req.params.id]
    );
    console.log(result);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: 'No encontrado',
      });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: 'Algo ha ido mal',
    });
  }
});

//Metodo para actualizar los proyectos
router.patch('/actualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { cargo, departamento, proyecto, sueldo } = req.body;

  try {
    const result = await pool.query(
      'UPDATE datos_ingreso SET cargo = IFNULL(?, cargo), departamento = IFNULL(?, departamento), proyecto = IFNULL(?, proyecto), sueldo = IFNULL(?, sueldo) WHERE idDato = ?',
      [cargo, departamento, proyecto, sueldo, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'No encontrado' });

    const rows = await pool.query(
      'SELECT * FROM datos_ingreso WHERE idDato = ?',
      [id]
    );
    console.log(result);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Algo ha ido mal',
    });
  }
});

module.exports = router;
