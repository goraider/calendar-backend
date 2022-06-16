const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } =  require('../helpers/isDate');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

//para validar el token en todas las rutas
router.use( validarJWT );


router.get( '/lista-eventos', getEventos );

router.post(
    '/crear-evento',
    [
        check('title', 'El titulo es Obligatorio').not().isEmpty(),
        check('start', 'La Fecha de inicio es Obligatorio').custom( isDate ),
        check('end', 'La Fecha de finalización es Obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

router.put( '/actualizar-evento:id', actualizarEvento );

router.delete( '/eliminar-evento:id', eliminarEvento );



module.exports = router;