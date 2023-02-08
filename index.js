const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const {engine} = require("express-handlebars") // recordar también podría ser import {engine} from "express-handlebars"; 


const port = process.env.PORT || 3000;

const apiRoutes = require("./src/routes/api");
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/src/views");
app.use("/fotos", express.static(__dirname+ "/uploads/images"));
app.use("/assets", express.static(__dirname+ "/assets"));


app.use(express.urlencoded());
app.use(express.json());


app.use(apiRoutes);






app.get("", (req, res) => {
    //res.sendFile(__dirname+"/src/views/index.html");
    res.render("index");
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
