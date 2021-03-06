//Acá se crea todo lo que tendrá conexion con el servidor, por ejemplo donde voy a enlazar las vistas y la configuracio
//Importar express
const express = require('express');  //esta es la forma en la que trabaja node, podemos tambien hacerlo con import pero tendremos que instalar babel
const path = require('path'); //Path es una libreria que viene integrada en node y que nos permite acceder al file system
const bodyParser = require('body-parser')
const routes = require('./routes');

const configs = require('./config'); //Establecemos configuraciones para diferenciar ambientes

require('dotenv').config({path: 'variables.env' })


// db.authenticate()
//     .then(() => console.log('DB conectada'))
//     .catch(error => console.log(error));

//Configurar express

const app = express();  

//Habilitar pug
app.set('view engine', 'pug');//Estas son configuraciones establecidad por express
//Añadir las vistas
app.set('views', path.join(__dirname, './views'))

//Cargar una carpeta esrtatica llamada public
app.use(express.static('public')); //Metodo de express para poder encontrar la carpeta

//Validar si estamos en desarrollo o en produccion 
const config = configs[app.get('env')]; //env es una palabra en node que no ayuda a saber en que ambiente estamos

//Creamos la variable para el sitio web
app.locals.titulo = config.nombreSitio;

//Muestra una fecha actual y genera la ruta
app.use((req, res, next) => {
    //Crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();//res.local no ayuda a generar variables que pueden leerse de forma interna ( seguardan como arreglo)
    res.locals.rutas = req.path
    return next();

})
//Ejecutar el bodyParser
app.use(bodyParser.urlencoded({extended: true}));


//Utilizamos Use para soportar a todos los metodos que vengan del router
app.use('/', routes())

// Puerto y Host para la app
const host = process.env.HOST || '0.0.0.0' //este puerto no existe pero Heroku lo asigna una al identificarla
const port = process.env.PORT || 3000
app.listen(port, host, () => {
    console.log('el servdor está funcionando')
}); 