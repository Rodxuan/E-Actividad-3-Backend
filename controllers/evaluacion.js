const Evaluacion = require('../models/evaluacion');
const Trimestre = require('../models/trimestre');
const Seccion = require('../models/seccion');
const Materia = require('../models/materia');

const {response} =require('express')

const getEvaluacion = async(req, resp)=>{
    const [evaluacion] =  await Promise.all([
        Evaluacion.find()
    ])

    await Promise.all(evaluacion.map(async (eva) => {
        let materia 
        let trimestre
        let seccion
        let secciones = []
       
        await Promise.all([
            trimestre = await Trimestre.findById(eva.trimestre),
            materia = await Materia.findById(eva.materia),
        ])

        await Promise.all(eva.secciones.map(async (sec) => {
            seccion = await Seccion.findById(sec)
            secciones.push(seccion.nombre)
        }))

        eva.secciones = secciones
        eva.trimestre = trimestre.nombre
        eva.materia = materia.nombre

           
        }))

    resp.json({
        ok: true,
        evaluacion
    })
}

const newEvaluacion = async (req, resp = response)=>{
    try {

    const evaluacion = new Evaluacion(req.body)
    await evaluacion.save()

    resp.json({
        ok: true,
        evaluacion
    })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const actualizarEvaluacion = async( req, resp) => {
    const uid = req.params.id

    try {
    const evaluacionDB = await Evaluacion.findById(uid)

    if(!evaluacionDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe una evaluacion con ese id'
        })
    }

     const evaluacion = await Evaluacion.findByIdAndUpdate(uid, req.body, {new: true})
        resp.json({
        ok:true,
        evaluacion
        })  

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const eliminarEvaluacion = async(req, resp = response)=> {
    const uid = req.params.id

    try {

        const evaluacionDB = await Evaluacion.findById(uid)
        
        if(!evaluacionDB){
            return  resp.status(404).json({
                ok:false,
                msg:'No existe una evaluacion con ese id'
            })
        }

        await Seccion.findByIdAndDelete(uid)

        resp.json({
            ok:true,
            msg: 'Seccion eliminado'
            })  

        
    } catch (error) {
        resp.json({
            ok:true,
            msg:'Error inesperado... reivsar logs'
            })      
    }
    
    
}

module.exports = {getEvaluacion, newEvaluacion, actualizarEvaluacion, eliminarEvaluacion}