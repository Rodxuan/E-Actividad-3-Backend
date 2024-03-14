const {Schema, model} = require('mongoose')

const MateriaSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    secciones:{
      type:Array,
      default:[]
  },
  profesor:{
    type:String,
  }
})

MateriaSchema.method('toJSON', function(){
  const {__v, password,  ...object} = this.toObject()
  return object
})

module.exports = model('Materia', MateriaSchema)