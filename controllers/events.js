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

const actualizarEvento = async(request, res = response) =>{

    const eventoId = request.params.id;
    const uid      = request.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            res.status(404).json({
                succesfull: false,
                msg: 'El Evento no existe con este ID'
            });
        }

        if( evento.user.toString() !== uid ){

            return res.status(401).json({
                succesfull: false,
                msg: 'No tiene privilegios de editar este evento'
            });
        }

        const nuevoEvento = {
            ...request.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} );

        res.json({
            succesfull: true,
            evento: eventoActualizado
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: "Hable con el administrador"
        });
        
    }

    
    res.status(400).json({

        succesfull: true,
        eventoId
        
    });

}

const eliminarEvento = async(request, res = response) =>{

    const eventoId = request.params.id;
    const uid      = request.uid;

    console.log(uid);
    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ) {

            return res.status(404).json({
                succesfull: false,
                msg: 'El Evento no existe con este ID'
            });
        }

        if( evento.user.toString() !== uid ){

            return res.status(401).json({
                succesfull: false,
                msg: 'No tiene privilegios de Eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventoId );

        res.json({
            succesfull: true,
            msg: 'Evento Eliminado'
            //evento: eventoActualizado
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: "Hable con el administrador"
        });
        
    }
    

    // return res.status(400).json({

    //     succesfull: true,
    //     msg: 'Evento Eliminado'
        
    // });

}



module.exports = {

    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

};