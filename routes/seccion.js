const {Router} = require('express')
const {check} = require('express-validator')
const {getSeccion, newSeccion, actualizarSeccion, eliminarSeccion}= require('../controllers/seccion')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')




const router = Router()

router.get('/', getSeccion);

router.post('/',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
]
, newSeccion);

router.put('/:id',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarSeccion);

router.delete('/:id', ValidarJWT, eliminarSeccion);

module.exports = router