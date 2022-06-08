const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

//para validar el token en todas las rutas
router.use( validarJWT );


router.get( '/lista-eventos', getEventos );

router.post( '/crear-evento', crearEvento );

router.put( '/actualizar-evento:id', actualizarEvento );

router.delete( '/eliminar-evento:id', eliminarEvento );



module.exports = router;