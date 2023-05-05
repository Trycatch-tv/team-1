const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/nuevo', (req, res) => {
  res.render('proyecto/nuevo');
});

router.get('/colaboradores', (req, res) => {
  const colaboradores = {
    colaboradores: [
      {
        id: 1,
        nombres: 'Fanny Tunjano',
        cargo: 'Desarrollador Frontend',
        descripcion:
          'Juan es un desarrollador full-stack con experiencia en JavaScript, Python y Java. Tiene un enfoque centrado en el usuario y se esfuerza por crear aplicaciones intuitivas y fáciles de usar.',
        imagen: '/img/fanny.jpeg',
        contacto: {
          email: 'fannytunjano25@hotmail.com',
          linkedin: 'http://www.linkedin.com/in/fanny-tunjano',
        },
      },
      {
        id: 2,
        nombres: 'Luis Carlos Pacheco',
        cargo: 'Desarrollador Backend',
        descripcion:
          'Desarrollador backend jr, capacidad de adaptacion y aprendizaje.',
        imagen: '/img/pacheco.jpeg',
        contacto: {
          email: 'pachecolanzziano@gmail.com',
          linkedin: 'https://www.linkedin.com/in/pachecolanzziano/',
        },
      },
      {
        id: 3,
        nombres: 'Leonel Omar Amaya',
        cargo: 'Ingeniero de software',
        descripcion:
          'Pedro es un ingeniero de software altamente cualificado con experiencia en el desarrollo de sistemas de gran escala en entornos empresariales. Tiene habilidades técnicas excepcionales y un enfoque riguroso para el desarrollo de software.',
        imagen: '/img/img03.jpg',
        contacto: {
          email: 'leo.amaya2099@gmail.com',
          linkedin: 'https://www.linkedin.com/in/leonelamaya/',
        },
      },
      {
        id: 4,
        nombres: 'Juan Sebastian Soto',
        cargo: 'Analista de datos',
        descripcion:
          'Estudiante de últimos semestres de ingeniería de sistemas, siempre buscando nuevos retos que hagan evolucionar mis habilidades.',
        imagen: '/img/img04.jpg',
        contacto: {
          email: 'ana.gutierrez@example.com',
          linkedin: 'https://www.linkedin.com/in/juan-sebastian-soto/',
        },
      },
      {
        id: 5,
        nombres: 'Camilo Andrés Charry',
        cargo: 'Team-Lead',
        descripcion:
          'Me gusta aprender a diario, soy una persona a la cual le gusta proponer ideas y estudiar nuevas tecnologias.',
        imagen: '/img/mispuri.png',
        contacto: {
          email: 'camiloandrescharry@outlook.es',
          linkedin: 'https://www.linkedin.com/in/camilo-charry/',
        },
      },
      {
        id: 6,
        nombres: 'Rossill Paucar',
        cargo: 'Desarrollador Frontend',
        descripcion:
          'Soy un desarrollador con experiencia en el desarrollo de software y conocimientos en lenguajes de programación como C, Java, JavaScript, Angular, Node.js, TypeScript y Python. Tengo gran capacidad de autoaprendizaje, trabajo en equipo y siempre estoy dispuesto a aportar mi conocimiento y habilidades para lograr resultados de alta calidad. También me interesa el campo de la ciencia de datos.',
        imagen: '/img/rossil.jpeg',
        contacto: {
          email: 'edison0ed13@gmail.com',
          linkedin: 'https://www.linkedin.com/in/edison-paucar2020a/',
        },
      },
      {
        id: 7,
        nombres: 'María García',
        cargo: 'Diseñadora Gráfica',
        descripcion:
          'María es una diseñadora altamente creativa con experiencia en diseño gráfico y web. Ha trabajado en proyectos para empresas en diversos sectores.',
        imagen: '/img/img07.jpg',
        contacto: {
          email: 'maria.garcia@example.com',
          linkedin: 'https://www.linkedin.com/in/maria-garcia',
        },
      },
      {
        id: 8,
        nombres: 'Laura Torres',
        cargo: 'Desarrollador de Software',
        descripcion:
          'Laura es un desarrollador de software altamente capacitado con experiencia en múltiples lenguajes de programación. Ha trabajado en proyectos de software en diferentes áreas.',
        imagen: '/img/img08.jpg',
        contacto: {
          email: 'Laura.Torres@example.com',
          linkedin: 'https://www.linkedin.com/in/Laura-Torres',
        },
      },
    ],
  };
  //console.log(colaboradores);
  res.render('proyecto/acerca', colaboradores);
});

/********************* PROYECTO ************************/
//Metodo para traer los proyectos de la base de datos
router.get('/listaProyecto', async (req, res) => {
  const listaProyecto = await pool.query(
    'SELECT id_proyecto, id_empleado, nombre, descripcion, DATE_FORMAT(fecha_inicio, "%d-%m-%Y") AS fechaInit, DATE_FORMAT(fecha_final, "%d-%m-%Y") AS fechaEnd from PROYECTO'
  );
  // console.log(listaProyecto);
  res.render('proyecto/listaProyecto', { listaProyecto });
});

//lista buscar
router.get('/listar', async (req, res) => {
  const nombre = req.query.name;
  console.log(nombre);
  await pool.query(
    "SELECT * FROM PROYECTO WHERE NOMBRE LIKE '%" + nombre + "%'",
    function (error, results) {
      if (!error) {
        if (!results.length == 0) {
          // res.send(results);
          res.render('proyecto/listaProyecto', { listaProyecto: results });
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

//Metodo para ingresar los proyectos
router.post('/ingresodatos', async (req, res) => {
  const { id_empleado, nombre, descripcion, fecha_inicio, fecha_final } =
    req.body;
  const id = parseInt(id_empleado);
  // console.log(newProyecto);
  await pool.query(
    'INSERT INTO PROYECTO (id_empleado, nombre, descripcion, fecha_inicio, fecha_final) VALUES (?, ?, ?, ?, ?)',
    [id, nombre, descripcion, fecha_inicio, fecha_final]
  );
  res.redirect('/proyecto/listaProyecto');
});

//Metodo para eliminar proyectos
router.get('/eliminarProyecto/:id_empleado', async (req, res) => {
  const { id_empleado } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM PROYECTO WHERE id_empleado = ?',
      [id_empleado]
    );
    res.redirect('/proyecto/listaProyecto');
    // console.log(result);
  } catch (error) {
    res.status(500).json({
      message: 'Algo ha ido mal',
    });
  }
});

//Metodo para actualizar los proyectos

router.get('/editProyecto/:id_empleado', async (req, res) => {
  const { id_empleado } = req.params;
  //
  const convertDate = function (dateStr) {
    if (dateStr == '' || dateStr == null) return '';
    var fecha = new Date(dateStr);
    var anio = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var dia = fecha.getDate().toString().padStart(2, '0');
    var fechaFormateada = anio + '-' + mes + '-' + dia;
    return fechaFormateada;
  };
  const id = parseInt(id_empleado);
  const proyecto = await pool.query(
    'SELECT * from PROYECTO WHERE id_empleado = ?',
    [id],
    function (error, results, fields) {
      if (!error) {
        if (!results.length == 0) {
          let proyecto = results.map((proyecto) => {
            let nuevoProyecto = proyecto;
            nuevoProyecto.fecha_inicio = convertDate(proyecto.fecha_inicio);
            nuevoProyecto.fecha_final = convertDate(proyecto.fecha_final);
            return nuevoProyecto;
          });
          // console.log('resultFormatDate', proyecto);

          res.render('proyecto/editProyecto', { empleado: proyecto[0] });
        } else {
          res.send(`El ID:${id} no existe   y estoy en update`);
        }
      } else {
        console.log('error en listar empleados');
        res.send(error);
      }
    }
  );

  // console.log(proyecto);
});

router.post('/actualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha_inicio, fecha_final } = req.body;
  try {
    const resultado = await pool.query(
      'UPDATE PROYECTO SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_final = ? WHERE id_empleado = ?',
      [nombre, descripcion, fecha_inicio, fecha_final, id]
    );
    res.redirect('/proyecto/listaProyecto');
    // console.log(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Algo ha ido mal',
    });
  }
});

module.exports = router;
