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
        nombres: 'Juan Perez',
        cargo: 'Desarrollador Full-Stack',
        descripcion:
          'Juan es un desarrollador full-stack con experiencia en JavaScript, Python y Java. Tiene un enfoque centrado en el usuario y se esfuerza por crear aplicaciones intuitivas y fáciles de usar.',
        imagen: '/img/img01.jpg',
        contacto: {
          email: 'juan.perez@example.com',
          telefono: '+1 555-555-5555',
          linkedin: 'https://example.com/juan_perez',
        },
      },
      {
        id: 2,
        nombres: 'Maria Gomez',
        cargo: 'Diseñadora UX/UI',
        descripcion:
          'Maria es una diseñadora UX/UI con una sólida formación en diseño gráfico y una gran pasión por crear experiencias digitales atractivas y efectivas. Tiene una amplia experiencia en el diseño de aplicaciones móviles y web.',
        imagen: '/img/img02.jpg',
        contacto: {
          email: 'maria.gomez@example.com',
          telefono: '+1 555-555-5555',
          linkedin: 'https://example.com/maria_gomez',
        },
      },
      {
        id: 3,
        nombres: 'Pedro Rodriguez',
        cargo: 'Ingeniero de software',
        descripcion:
          'Pedro es un ingeniero de software altamente cualificado con experiencia en el desarrollo de sistemas de gran escala en entornos empresariales. Tiene habilidades técnicas excepcionales y un enfoque riguroso para el desarrollo de software.',
        imagen: '/img/img03.jpg',
        contacto: {
          email: 'pedro.rodriguez@example.com',
          telefono: '+1 555-555-5555',
          linkedin: 'https://example.com/pedro_rodriguez',
        },
      },
      {
        id: 4,
        nombres: 'Ana Gutierrez',
        cargo: 'Analista de datos',
        descripcion:
          'Ana es una analista de datos altamente motivada con una sólida formación en estadística y análisis de datos. Tiene experiencia en la manipulación de grandes conjuntos de datos y en la creación de modelos de predicción de alta precisión.',
        imagen: '/img/img04.jpg',
        contacto: {
          email: 'ana.gutierrez@example.com',
          telefono: '+1 555-555-5555',
          linkedin: 'https://example.com/ana_gutierrez',
        },
      },
      {
        id: 5,
        nombres: 'Carlos López',
        cargo: 'Ingeniero Industrial',
        descripcion:
          'Carlos es un ingeniero industrial con experiencia en la optimización de procesos y en la gestión de proyectos. Ha trabajado en empresas de diferentes sectores.',
        imagen: '/img/img05.jpg',
        contacto: {
          email: 'carlos.lopez@example.com',
          telefono: '555-6789',
          linkedin: 'https://www.linkedin.com/in/carlos-lopez',
        },
      },
      {
        id: 6,
        nombres: 'Jose Perez',
        cargo: 'Gerente de Marketing',
        descripcion:
          'Juan tiene más de 10 años de experiencia en el área de marketing y ha liderado exitosas campañas publicitarias para varias marcas reconocidas.',
        imagen: '/img/img06.jpg',
        contacto: {
          email: 'juan.perez@example.com',
          telefono: '555-1234',
          linkedin: 'https://www.linkedin.com/in/juan-perez',
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
          telefono: '555-5678',
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
          telefono: '555-9012',
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
  const id = parseInt(id_empleado);
  const proyecto = await pool.query(
    'SELECT * from PROYECTO WHERE id_empleado = ?',
    [id]
  );
  // console.log(proyecto);
  res.render('proyecto/editProyecto', { empleado: proyecto[0] });
});

router.post('/actualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha_inicio, fecha_final } = req.body;
  // const newProyecto = {
  //   nombre,
  //   descripcion,
  //   fecha_inicio,
  //   fecha_final,
  // };
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