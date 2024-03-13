const {Router} = require('express')
const {check} = require('express-validator')
const {getEvaluacion, newEvaluacion, actualizarEvaluacion, eliminarEvaluacion}= require('../controllers/evaluacion')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')

const router = Router()

router.get('/', getEvaluacion);

router.post('/',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('semana','La semana es obligatorio').not().isEmpty(),
    validarCampos
]
, newEvaluacion);

router.put('/:id',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('semana','La semana es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarEvaluacion);

router.delete('/:id', ValidarJWT, eliminarEvaluacion);

module.exports = router