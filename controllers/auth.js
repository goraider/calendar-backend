const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
//const { validationResult } = require('express-validator');



const createUser = async(request, res = response) =>{

    //console.log(request.body);

    //const { name, email, password } = request.body;

    const { email, password } = request.body;
    
    try {

        let usuario = await Usuario.findOne({ email });
        //console.log(usuario);
        if( usuario ){
            return res.status(400).json({
                
                succesfull: false,
                msg: 'Un Usuario ya existe con ese correo!',

            });
        }

            
        usuario = new Usuario( request.body );

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({

            succesfull:true,
            uid: usuario.id,
            name: usuario.name,
            token
            // name,
            // email,
            // password
    
        });
        
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            succesfull: false,
            msg: 'Por favor hable con el administrador'
        });
    }



}

const loginUser = async(request, res = response) =>{
    
    const { email, password } = request.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                succesfull: false,
                msg: 'Un Usuario no existe con ese email!',
            });
        }

        //confirmar contraseñas
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                succesfull: false,
                msg: 'Password incorrecto'
            })

        }

        //Generar Token
        const token = await generarJWT( usuario.id, usuario.name );
        
        res.json({
            succesfull:true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: 'Por favor hable con el administrador'
        }); 
    }




}

const revalidateToken = async(request, res = response) =>{

    const { uid, name } = request;
    // const uid = request.uid;
    // const name = request.name;

    //Generar Token
    const token = await generarJWT( uid, name );

    res.json({
        succesfull:true,
        uid,
        name,
        token
    });

}

module.exports = {
    createUser,
    loginUser,
    revalidateToken

}