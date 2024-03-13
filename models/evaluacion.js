const {Schema, model} = require('mongoose')

const EvaluacionSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    semana:{
      type:Number,
      required:true
  },
    materia:{
      type:String,
  },
    secciones:{
      type:Array,
      default:[]
  },
  trimestre:{
    type:String,
},
 
})

EvaluacionSchema.method('toJSON', function(){
  const {__v, password,  ...object} = this.toObject()
  return object
})

module.exports = model('Evaluacion', EvaluacionSchema)