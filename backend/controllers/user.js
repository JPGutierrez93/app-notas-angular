'use strict'

var User = require ('../models/user');
var jwt = require ('jsonwebtoken');
var bcrypt = require ('bcrypt');


var controller = {
    signUp: function(req, res){
        var user = new User()

        var params = req.body;
        user.email = params.email;
        user.password = params.password;
        user.nombre = params.nombre;
        
        //En "models/user" se define el "pre save"
        //este ejecuta una funcion previo al save, en la que encrypta la contraseña.

        user.save((err, userStored)=> {
            if(err) return res.status(500).send({message:'Error al guardar'});
            if(!userStored) return res.status(404).send({message: 'Error 404: no se ha podido guardar'})

            return res.status(200).send({user: userStored});
        })
    },

    signIn: function (req,res){
        var mail = req.body.email
        var password = req.body.password

        //se comprueba que el email no sea nulo

        if (mail==null) return res.status(404).send({message: 'Email no puede ser nulo'});
        
        //se busca el mail
        //find one puede tener un callback o una promesa.

        User.findOne({email:mail})
            .then(user => {
                //si no encuentra el usuario, porque no coincide con ninguno de la base de datos, retorna un 404
                if(!user) return res.status(404).send({message: 'Usuario no encontrado'})
                //si lo encuentra, entonces bcrypt compara las contraseñas
                bcrypt.compare(password,user.password)
                    .then(match =>{
                        //match (o sea, si son iguales, es un boolean. Si es true, da acceso, si no, no.)
                        if(match){
                            //son iguales, acceso
                            var id = user._id
                            var nombre = user.nombre
                            jwt.sign({user:user}, 'secretkey', {expiresIn: '1d'},(err, token) =>{
                                if(err) return res.json({err})
                                res.json({
                                    //Se comprobo que el usuario exista
                                    //se encryptó la nueva contraseña
                                    //se comparó la contraseña encryptada con la de la base de datos
                                    //entonces, se retorna el id y el token. 
                                    id,
                                    nombre,
                                    token
                                    
                                })
                            });
                        }else{
                            //no son iguales, acceso DENEGADO
                            res.status(200).send({message: 'CONTRASEÑA INCORRECTA'})
                        }
                    })

                    .catch(error => {
                        console.log(error);
                        res.status(500).send({error});
                    })
            })
            .catch(error => {
                console.log(error);
                res.status(500).send({error});
            })      
    }    
}

module.exports = controller;