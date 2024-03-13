const {Router} = require('express')
const {check} = require('express-validator')
const {getEvento, newEvento, actualizarEvento, eliminarEvento}= require('../controllers/evento')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')




const router = Router()

router.get('/', getEvento);

router.post('/',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('semana','La semana es obligatorio').not().isEmpty(),
    check('trimestre','El trimestre es obligatorio').not().isEmpty(),
    validarCampos
]
, newEvento);

router.put('/:id',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('semana','La semana es obligatorio').not().isEmpty(),
    check('trimestre','El trimestre es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarEvento);

router.delete('/:id',ValidarJWT, eliminarEvento);

module.exports = router