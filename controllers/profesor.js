const Profesor = require('../models/profesor');
const {response} =require('express')
const jwt = require('jsonwebtoken');

const getProfesor = async(req, resp)=>{
    const [profesor] =  await Promise.all([
        Profesor.find()
    ])

    resp.json({
        ok: true,
        profesor
    })
}

const newProfesor = async (req, resp = response)=>{
    try {
        const token = req.header('x-token');
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        if(decoded.role != 'DIRECTOR'){
            resp.status(401).json({
                ok:false,
                msg: 'No puedes realizar esta acción, no eres un director'
            })
        }

    const profesor = new Profesor(req.body)
    await profesor.save()

    resp.json({
        ok: true,
        profesor
    })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const actualizarProfesor = async( req, resp) => {
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
        
    const profesorDB = await Profesor.findById(uid)

    if(!profesorDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe un profesor con ese id'
        })
    }

     const profesor = await Profesor.findByIdAndUpdate(uid, req.body, {new: true})
        resp.json({
        ok:true,
        profesor
        })  

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const eliminarProfesor = async(req, resp = response)=> {
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


        const profesorDB = await Profesor.findById(uid)
        
        if(!profesorDB){
            return  resp.status(404).json({
                ok:false,
                msg:'No existe una profesor con ese id'
            })
        }

        await Profesor.findByIdAndDelete(uid)

        resp.json({
            ok:true,
            msg: 'Profesor eliminado'
            })  

        
    } catch (error) {
        resp.json({
            ok:true,
            msg:'Error inesperado... reivsar logs'
            })      
    }
    
    
}

module.exports = {getProfesor, newProfesor, actualizarProfesor, eliminarProfesor}