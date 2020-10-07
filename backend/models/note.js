'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = Schema ({
    fecha_carga: {type: Date, default: Date.now},
    id_usuario: {type: String, required:true},
    titulo: {type: String, required:true},
    contenido: {type: String, required:true}
})

module.exports = mongoose.model('Note', NoteSchema)