const {Schema, model} = require('mongoose')

const TrimestreSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    fechaInicio:{
        type:String,
        required:true
    },
    semanas:{
        type:Number,
        required:true,
    },
    evaluaciones:{
        type: Array,
        default:[],
    },
    eventos:{
        type: Array,
        default:[],
    }
})

TrimestreSchema.method('toJSON', function(){
  const {__v, password,  ...object} = this.toObject()
  return object
})

module.exports = model('Trimestre', TrimestreSchema)