const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//correr los procesos que corren en el backend
//console.log(process.env);

//create express server
const app = express();

//Base de Datos
dbConnection();

app.use(cors());


//Directorio Publico
app.use( express.static('public') );

//Lectura y parseo del Body
app.use( express.json() );


//Routes
app.use('/api/auth', require('./routes/auth') );
// TODO: auth // crear, login, renew
// TODO: CRUD: Eventos



//listen to request
app.listen( process.env.PORT, () => {
    console.log(`Servidor Corriendo en puerto ${ process.env.PORT }`);
});