const {Schema, model} = require('mongoose')

const SeccionSchema = Schema({
    nombre:{
        type:String,
        required:true
    }
})

SeccionSchema.method('toJSON', function(){
  const {__v, password,  ...object} = this.toObject()
  return object
})

module.exports = model('Seccion', SeccionSchema)