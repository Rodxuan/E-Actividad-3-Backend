const {Router} = require('express')
const {check} = require('express-validator')
const {getTrimestre, newTrimestre, actualizarTrimestre, eliminarTrimestre}= require('../controllers/trimestre')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')


const router = Router()

router.get('/', getTrimestre);

router.post('/',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('semanas','Las semanas son obligatoria').not().isEmpty(),
    check('fechaInicio','La fecha de inicio es obligatoria').not().isEmpty(),
    validarCampos
]
, newTrimestre);

router.put('/:id',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('semanas','Las semanas son obligatoria').not().isEmpty(),
    check('fechaInicio','La fecha de inicio es obligatoria').not().isEmpty(),
    validarCampos
]
, actualizarTrimestre);

router.delete('/:id', ValidarJWT, eliminarTrimestre);

module.exports = router