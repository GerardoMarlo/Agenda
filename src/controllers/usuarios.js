const model = require("./../models/usuario");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");

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
                console.log(response);
                //res.send("ok");
                const {_id, nombre} = response;
                
                const token = jwt.sign({_id, nombre}, process.env.SECRET);
                jwt.verify(token, "holamundo", (err, decoded) =>{
                    console.log(decoded);
                })
                res.send({token:token, nombre:nombre});
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

        const hashedPassword = hashPassword(datos.password);
        datos.password = hashedPassword;

        model.create(datos).then(response =>{
            
            res.send(response);
        }).catch(err => {
            res.sendStatus(400);
        });

    }
    
}