const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
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
        cargo: 'Desarrollador Backend',
        descripcion:
          'Desarrollador Backend junior apasionado por la tecnología y el desarrollo de software, con gran capacidad de adaptación y aprendizaje , enfocado a objetivos y un sólido entendido de buenas prácticas de programación.',
        imagen: '/img/leonel.jpeg',
        contacto: {
          email: 'leo.amaya2099@gmail.com',
          linkedin: 'https://www.linkedin.com/in/leonelamaya/',
        },
      },
      {
        id: 4,
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
        id: 5,
        nombres: 'Juan Sebastian Soto',
        cargo: 'Analista de datos',
        descripcion:
          'Estudiante de últimos semestres de ingeniería de sistemas, siempre buscando nuevos retos que hagan evolucionar mis habilidades.',
        imagen: '/img/sebastian.jpeg',
        contacto: {
          email: 'ana.gutierrez@example.com',
          linkedin: 'https://www.linkedin.com/in/juan-sebastian-soto/',
        },
      },
      {
        id: 6,
        nombres: 'Rossill Paucar',
        cargo: 'Desarrollador Frontend',
        descripcion:
          'Soy un desarrollador con experiencia en el desarrollo de software y conocimientos en lenguajes de programación como C, Java, JavaScript, Angular, Node.js, TypeScript y Python. Tengo gran capacidad de autoaprendizaje, trabajo en equipo y siempre estoy dispuesto a aportar mi conocimiento y habilidades para lograr resultados de alta calidad. También me interesa el campo de la ciencia de datos.',
        imagen: '/img/rossill.jpeg',
        contacto: {
          email: 'edison0ed13@gmail.com',
          linkedin: 'https://www.linkedin.com/in/edison-paucar2020a/',
        },
      },
      {
        id: 7,
        nombres: 'Juan Carlos Del Río',
        cargo: 'Desarrollador Frontend',
        descripcion:
          'María es una diseñadora altamente creativa con experiencia en diseño gráfico y web. Ha trabajado en proyectos para empresas en diversos sectores.',
        imagen: '/img/juanCarlos.jpeg',
        contacto: {
          email: 'data@delrioe.com',
          linkedin: 'https://www.linkedin.com/in/juan-carlos-del-rio-07455432/',
        },
      },
    ],
  };
  res.render('layouts/home', colaboradores);
});

module.exports = router;
