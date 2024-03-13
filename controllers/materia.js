const Materia = require('../models/materia');
const Profesor = require('../models/profesor');
const Seccion = require('../models/seccion');
const {response} =require('express')
const jwt = require('jsonwebtoken');

const getMateria = async(req, resp)=>{
    const [materia] =  await Promise.all([
        Materia.find()
    ])

    await Promise.all(materia.map(async (mat) => {

        let profesor 
        let seccion
        let secciones = []
        await Promise.all([
            profesor = await Profesor.findById(mat.profesor),
        ])

        await Promise.all(mat.secciones.map(async (sec) => {
            seccion = await Seccion.findById(sec)
            secciones.push(seccion.nombre)
        }))

         mat.profesor = profesor.nombre
         mat.secciones = secciones
           
        }))


    resp.json({
        ok: true,
        materia
    })
}

const newMateria = async (req, resp = response)=>{
    try {
        const token = req.header('x-token');
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        if(decoded.role != 'DIRECTOR'){
            resp.status(401).json({
                ok:false,
                msg: 'No puedes realizar esta acción, no eres un director'
            })
        }
    const materia = new Materia(req.body)
    await materia.save()

    resp.json({
        ok: true,
        materia
    })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const actualizarMateria = async( req, resp) => {
    const uid = req.params.id

    try {
        const token = req.header('x-token');
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        if(decoded.role != 'DIRECTOR'){
            resp.status(401).json({
                ok:false,
                msg: 'No puedes realizar esta acción, no eres un director'
            })
        }
    const materiaDB = await Materia.findById(uid)

    if(!materiaDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe una materia con ese id'
        })
    }

     const materia = await Materia.findByIdAndUpdate(uid, req.body, {new: true})
        resp.json({
        ok:true,
        materia
        })  

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const eliminarMateria = async(req, resp = response)=> {
    const uid = req.params.id

    try {

        const token = req.header('x-token');
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        if(decoded.role != 'DIRECTOR'){
            resp.status(401).json({
                ok:false,
                msg: 'No puedes realizar esta acción, no eres un director'
            })
        }


        const materiaDB = await Materia.findById(uid)
        
        if(!materiaDB){
            return  resp.status(404).json({
                ok:false,
                msg:'No existe una materia con ese id'
            })
        }

        await Seccion.findByIdAndDelete(uid)

        resp.json({
            ok:true,
            msg: 'Materia eliminado'
            })  

        
    } catch (error) {
        resp.json({
            ok:true,
            msg:'Error inesperado... reivsar logs'
            })      
    }
    
    
}

module.exports = {getMateria, newMateria, actualizarMateria, eliminarMateria}