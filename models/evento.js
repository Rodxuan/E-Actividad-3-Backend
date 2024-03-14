const {Schema, model} = require('mongoose')

const EventoSchema = Schema({
    nombre:{
      type:String,
      required:true
    },
    trimestre:{
      type:String,
      required:true
  },
    semana:{
      type:Number,
      required:true
  }
})

EventoSchema.method('toJSON', function(){
  const {__v, password,  ...object} = this.toObject()
  return object
})

module.exports = model('Evento', EventoSchema)