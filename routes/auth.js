/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser, revalidateToken, loginUser } = require('../controllers/auth');
//const router =  express.Router;


router.post(
    '/new',
    [
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        check('password', 'El password debe de 6 a 8 caracteres').isLength( { min:6 } )

    ],
    createUser
);
router.post('/', loginUser);
router.get('/renew', revalidateToken);



module.exports = router;