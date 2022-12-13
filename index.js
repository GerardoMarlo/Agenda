const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const apiRoutes = require("./src/routes/api");
app.use(apiRoutes);
app.use(express.json());
const port = process.env.PORT;
app.get("", (req, res) => {
    res.send("api works");
})

const uri = process.env.MONGODB;
console.log(uri)

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
