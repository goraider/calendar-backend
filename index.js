const express = require('express');
require('dotenv').config();

//correr los procesos que corren en el backend
//console.log(process.env);

//create express server
const app = express();


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