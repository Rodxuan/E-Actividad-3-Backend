const {Schema, model} = require('mongoose')

const ProfesorSchema = Schema({
    nombre:{
        type:String,
        required:true
    }
})

ProfesorSchema.method('toJSON', function(){
  const {__v, password,  ...object} = this.toObject()
  return object
})

module.exports = model('Profesor', ProfesorSchema)