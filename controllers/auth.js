const { response } = require('express');
//const { validationResult } = require('express-validator');



const createUser = (request, res = response) =>{

    //console.log(request.body);

    const { name, email, password } = request.body;

    res.status(201).json({

        succesfull:true,
        msg: 'register',
        name,
        email,
        password

    });

}

const loginUser = (request, res = response) =>{
    
    const { email, password } = request.body;


    res.json({
        succesfull:true,
        msg: 'login',
        email,
        password
    });

}

const revalidateToken = (request, res = response) =>{

    res.json({
        succesfull:true,
        msg: 'Revalidate Token'
    });

}

module.exports = {
    createUser,
    loginUser,
    revalidateToken

}