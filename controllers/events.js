const { response } = require('express');
const Evento = require('../models/Evento');



const getEventos = async(request, res = response) =>{

    //const { test } = request.body;
    const eventos = await Evento.find()
                                .populate('user');

    return res.status(400).json({

        succesfull: true,
        msg: 'Lista de Eventos',
        eventos

    });

}

const crearEvento = async(request, res = response) =>{

    //console.log( request.body );
    // const { evento } = request.body;
    const evento = new Evento( request.body );

    try {

        evento.user = request.uid;

       const eventoGuardado = await evento.save();

        res.status(400).json({

            succesfull: true,
            evento: eventoGuardado,
            msg: 'Evento Creado'
            
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: 'Hablar con el administrador',
        });
        
    }



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