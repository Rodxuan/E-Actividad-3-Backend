const Evento = require('../models/evento');
const Trimestre = require('../models/trimestre');
const {response} =require('express')

const getEvento = async(req, resp)=>{
    const [eventos] =  await Promise.all([
        Evento.find()
    ])

    await Promise.all(eventos.map(async (evento) => {

        let trimestre 
       
        await Promise.all([
            trimestre = await Trimestre.findById(evento.trimestre),
        ])

        evento.trimestre = trimestre.nombre
           
        }))


    resp.json({
        ok: true,
        eventos
    })
}

const newEvento = async (req, resp = response)=>{
    try {

    const evento = new Evento(req.body)
    await evento.save()

    resp.json({
        ok: true,
        evento
    })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const actualizarEvento = async( req, resp) => {
    const uid = req.params.id

    try {
    const eventoDB = await Evento.findById(uid)

    if(!eventoDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe un evento con ese id'
        })
    }

    const evento = await Evento.findByIdAndUpdate(uid, req.body, {new: true})
        resp.json({
        ok:true,
        evento
        })  
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const eliminarEvento = async(req, resp = response)=> {
    const uid = req.params.id

    try {

        const eventoDB = await Evento.findById(uid)
        
        if(!eventoDB){
            return  resp.status(404).json({
                ok:false,
                msg:'No existe un evento con ese id'
            })
        }

        await Evento.findByIdAndDelete(uid)

        resp.json({
            ok:true,
            msg: 'Evento eliminado'
            })  

        
    } catch (error) {
        resp.json({
            ok:true,
            msg:'Error inesperado... reivsar logs'
            })      
    }
    
    
}

module.exports = {getEvento, newEvento, actualizarEvento, eliminarEvento}