const { response } = require('express');



const getEventos = (request, res = response) =>{

    const { test } = request.body;

    return res.status(400).json({

        test: test,
        succesfull: true,
        msg: 'obtener eventos'

    });

}

const crearEvento = (request, res = response) =>{

    const { evento } = request.body;

    return res.status(400).json({

        succesfull: true,
        msg: 'Evento creado',
        evento: evento
        
    });

}

const actualizarEvento = (request, res = response) =>{

    return res.status(400).json({

        succesfull: true,
        msg: 'Evento Actualizado'
        
    });

}

const eliminarEvento = (request, res = response) =>{
    

    return res.status(400).json({

        succesfull: true,
        msg: 'Evento Eliminado'
        
    });

}



module.exports = {

    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

};