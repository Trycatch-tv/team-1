const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//INICIALIZACIONES
const app = express();

//CONFIGURACIONES
app.set('puerto', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
  })
);

app.set('view engine', '.hbs');

//MIDDLEWARS
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//VARIABLES GLOBALES

app.use((req, res, next) => {
  next();
});

//RUTAS
app.use(require('./rutas/'));
app.use('/empleados', require('./rutas/empleados'));

//PUBLIC
let projectPath = __dirname
projectPath = projectPath.slice(0, projectPath.length - 3)
app.use(express.static(projectPath + '/public'))
// console.log(__dirname)
// app.use(express.static(__dirname, '/public'))


//STARTING THE SERVER
app.listen(app.get('puerto'), () => {
  console.log('Servidor escuchando en el puerto', app.get('puerto'));
});
