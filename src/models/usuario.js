const mongoose = require("mongoose");
// Status 1: Activo

//Status 2: Bloqueado

const usuarioSchema = new mongoose.Schema({
    
    nombre: {type: String, required: true},
    correo: {type: String, required: true },
    password: {type: String, required: true },
    status: {type: Number, default: 1}
});

module.exports = mongoose.model("usuarios", usuarioSchema);