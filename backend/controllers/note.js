'use strict'

var Note = require ('../models/note');

var controller = {
    
    saveNote: function(req,res){
        var note = new Note();

        var params = req.body;
        note.id_usuario = params.id_usuario;
        note.titulo = params.titulo;
        note.contenido = params.contenido;

        note.save((err, noteStored)=>{
            if(err) return res.status(500).send({message: 'Error al guardar la nota'});
            if (!noteStored) return res.status(404).send({message: 'Eror 404'});

            return res.status(200).send({note: noteStored})

        })
    },

    getNote: function(req,res){

        var noteId = req.params.id
        if (noteId == null) return res.status(404).send({message: 'Error 404'})

        Note.findById(noteId, (err, note) => {
            if(err) return res.status(500).send({message: 'Error al cargar la nota'});
            if(!note) return res.status(404).send({message: 'Eror 404: nota no encontrada'});

            return res.status(200).send({note})
        });


    },

    getNotes: function(req,res){

        var id_usuario = req.query.id_usuario
        Note.find({id_usuario}).exec((err, notes)=>{
            if(err) return res.status(500).send({message: 'Error al cargar las notas'});
            if(!notes) return res.status(404).send({message: 'Eror 404'});

            return res.status(200).send({notes})
        })
    },

    updateNote: function(req,res){
        var noteId = req.params.id;
        var update = req.body;

        Note.findByIdAndUpdate(noteId, update, {new:true}, (err, noteUpdated)=>{
            if(err) return res.status(500).send({message: 'Error al actualizar'})
            if(!noteUpdated) return res.status(404).send({message: 'Error 404'})

            return res.status(200).send({
                note: noteUpdated
            })
        })


    },

    deleteNote: function(req,res){
        var noteId = req.params.id;
        Note.findByIdAndDelete(noteId, (err, noteDeleted) => {
            if(err) return res.status(500).send({message: 'Error al eliminar'})
            if(!noteDeleted) return res.status(404).send({message: 'Error 404'})

            return res.status(200).send({
                message:'Nota eliminada',
                note: noteDeleted
            })
        })
    }
}

module.exports = controller;