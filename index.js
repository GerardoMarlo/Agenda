const express = require("express");
const mongoose = require("mongoose");

const app = express();

const apiRoutes = require("./src/routes/api");
app.use(apiRoutes);

const port = 4000;
app.get("", (req, res) => {
    res.send("api works");
})

const uri = "mongodb+srv://prueba:contraseña@clusteragenda.ybfrvcx.mongodb.net/Agenda?retryWrites=true&w=majority";

mongoose.connect(uri, (err)=>{
if(err){
    console.log("No se pudo conectar a la base de datos");
}
else{
    console.log("Conexión exitosa a base de datos");
    
    app.listen(port, () =>{
        console.log("app running in port " + port);
    });
}
});
