const Seccion = require('../models/seccion');
const {response} =require('express')

const getSeccion = async(req, resp)=>{
    const [seccion] =  await Promise.all([
        Seccion.find()
    ])

    resp.json({
        ok: true,
        seccion
    })
}

const newSeccion = async (req, resp = response)=>{
    try {

    const seccion = new Seccion(req.body)
    await seccion.save()

    resp.json({
        ok: true,
        seccion
    })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const actualizarSeccion = async( req, resp) => {
    const uid = req.params.id

    try {
    const seccionDB = await Seccion.findById(uid)

    if(!seccionDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe un evento con ese id'
        })
    }

     const seccion = await Seccion.findByIdAndUpdate(uid, req.body, {new: true})
        resp.json({
        ok:true,
        seccion
        })  

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const eliminarSeccion = async(req, resp = response)=> {
    const uid = req.params.id

    try {

        const seccionDB = await Seccion.findById(uid)
        
        if(!seccionDB){
            return  resp.status(404).json({
                ok:false,
                msg:'No existe una seccion con ese id'
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

module.exports = {getSeccion, newSeccion, actualizarSeccion, eliminarSeccion}