const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRoutes = require("./src/routes/api");
const app = express();


app.use(express.json());
app.use(apiRoutes);

const port = process.env.PORT || 3000;

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
