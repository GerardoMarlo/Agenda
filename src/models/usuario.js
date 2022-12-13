const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    
    nombre: {type: String},
    correo: {type: String},
    password: {type: String},
    status: {type: Number, default: 1}
});

module.exports = mongoose.model("usuarios", usuarioSchema);