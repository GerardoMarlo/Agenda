const model = require("./../models/usuario");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const { response } = require("express");

function hashPassword(pwd) {

    return crypto.scryptSync(pwd, "secretssecrets", 24);
}

module.exports ={
    
    login:(req, res)=>{
        const data = req.body;

        const credenciales = {
            correo: data.correo,
            password: hashPassword(data.password)
        }

        if (credenciales.correo && credenciales.password){
        model.findOne(credenciales).then(response => {
            if(response){
                //console.log(response); Esto me manda en consola usuario, correo y contraseña hasheada
                console.log("Logueado");
                const {_id, nombre, correo} = response;
                
                const token = jwt.sign({_id, nombre, correo}, process.env.SECRET);
                jwt.verify(token, "holamundo", (err, decoded) =>{
                    console.log(decoded);
                })
                res.send({token:token, nombre:nombre, correo:correo});
            }else{
                //res.sendStatus(401);
                res.send("Usuario no registrado o contraseña incorrecta");

            }
        }).catch(err => {
            res.sendStatus(400);
        });
    } else{
        res.sendStatus(400);
        console.log("pw o usuario vacio");
    }
    },

    registro:(req, res)=>{
        const datos = req.body;
        console.log("datos: ", datos)
        if(!datos.password || !datos.nombre || !datos.correo){
            res.status(400).send("faltan datos");
            return;
        }

        const hashedPassword = hashPassword(datos.password);
        datos.password = hashedPassword;

        model.create(datos).then(response =>{
            
            res.render("confirmacion",{
                nombre:response.nombre,
                correo:response.correo
            });
        }).catch(err => {
            console.log(err);
            res.render("confirmacion",{
                error: true,
                correo:datos.correo
            });
        });

    },

    formRegistro:(req, res) => {
        res.render("registro")
    }
    
}