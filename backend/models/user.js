'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    fecha_carga: {type: Date, default: Date.now},
    nombre: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true}
});

UserSchema.pre('save', function(next){
    bcrypt.genSalt(10)
        .then(salts => {
            bcrypt.hash(this.password, salts)
            .then(hash =>{
                this.password = hash;
                next()
            })
            .catch(error => next(error));
        })
        .catch(error => next(error))
});

module.exports = mongoose.model('User', UserSchema);