const {Router} = require('express')
const {check} = require('express-validator')
const {getProfesor, newProfesor, actualizarProfesor, eliminarProfesor}= require('../controllers/profesor')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')




const router = Router()

router.get('/', getProfesor);

router.post('/',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
]
, newProfesor);

router.put('/:id',
[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarProfesor);

router.delete('/:id', ValidarJWT, eliminarProfesor);

module.exports = router