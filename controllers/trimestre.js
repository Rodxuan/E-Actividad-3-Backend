const Trimestre = require('../models/trimestre');
const Evaluacion = require('../models/evaluacion');
const Evento = require('../models/evento');
const Materia = require('../models/materia');
const jwt = require('jsonwebtoken');

const {response} =require('express')

const getTrimestre = async(req, resp)=>{
    const [trimestre] =  await Promise.all([
        Trimestre.find()
    ])

    await Promise.all(trimestre.map(async (tri) => {
        let evaluaciones 
        let eventos 
        let evaluacionesFinales = []
        let eventosFinales = []

        await Promise.all([
            evaluaciones = await Evaluacion.find({trimestre: tri._id}),
            eventos = await Evento.find({trimestre: tri._id}),
        ])

        await Promise.all(evaluaciones.map(async (eva) => {
            let materia = await Materia.findById(eva.materia)
            let evaluacion = {
                "nombre" : eva.nombre,
                "semana": eva.semana,
                "materia": materia.nombre
            }
            evaluacionesFinales.push(evaluacion)
        }
        ))

        
        await Promise.all(eventos.map(async (eve) => {
            let evento = await {
                "nombre" : eve.nombre,
                "semana": eve.semana,
            }
            eventosFinales.push(evento)
        }
        ))

        tri.evaluaciones = evaluacionesFinales
        tri.eventos = eventosFinales
        }))

    resp.json({
        ok: true,
        trimestre
    })
}

const newTrimestre = async (req, resp = response)=>{
    try {
        const token = req.header('x-token');
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        if(decoded.role != 'DIRECTOR'){
            resp.status(401).json({
                ok:false,
                msg: 'No puedes realizar esta acción, no eres un director'
            })
        }

    const trimestre = new Trimestre(req.body)
    await trimestre.save()

    resp.json({
        ok: true,
        trimestre
    })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const actualizarTrimestre = async( req, resp) => {
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

    const trimestreDB = await Trimestre.findById(uid)

    if(!trimestreDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe un trimestre con ese id'
        })
    }

     const trimestre = await Trimestre.findByIdAndUpdate(uid, req.body, {new: true})
        resp.json({
        ok:true,
        trimestre
        })  

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const eliminarTrimestre = async(req, resp = response)=> {
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


        const trimestreDB = await Trimestre.findById(uid)
        
        if(!trimestreDB){
            return  resp.status(404).json({
                ok:false,
                msg:'No existe un trimestre con ese id'
            })
        }

        await Trimestre.findByIdAndDelete(uid)

        resp.json({
            ok:true,
            msg: 'Trimestre eliminado'
            })  

        
    } catch (error) {
        resp.json({
            ok:true,
            msg:'Error inesperado... reivsar logs'
            })      
    }
    
    
}

module.exports = {getTrimestre, newTrimestre, actualizarTrimestre, eliminarTrimestre}