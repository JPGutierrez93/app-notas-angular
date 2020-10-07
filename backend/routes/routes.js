'use strict'

var express = require('express');
var NoteController = require('../controllers/note');
var UserController = require('../controllers/user');
var auth = require('../middleware/auth');

var router = express.Router();

//rutas

router.post('/signup', UserController.signUp);

router.post('/login', UserController.signIn);

router.post('/new-note', auth, NoteController.saveNote);

router.get('/note/:id?', auth, NoteController.getNote);

router.get('/notes', auth, NoteController.getNotes);

router.put('/note/:id', auth, NoteController.updateNote);

router.delete('/note/:id', auth, NoteController.deleteNote);


module.exports = router;