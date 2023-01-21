const mongoose = require("mongoose");
// Status 1: Activo

//Status 2: Bloqueado/eliminado

const contactoSchema = new mongoose.Schema({
    nombre: {type: String},
    telefono: {type: String},
    correo: {type: String},
    status: {type: Number, default: 1},
    idUsuarioDueño: {type: String}
});

module.exports = mongoose.model("contactos", contactoSchema);