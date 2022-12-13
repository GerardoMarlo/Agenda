const express =require("express");
const router = require("express").Router();
const contactosController = require("./../controllers/contactos");
const usuariosController = require("./../controllers/usuarios")

//CONTACTOS
router.get("/contactos/", contactosController.getAll);
router.get("/contactos/filtrar/", contactosController.filter);
router.get("/contactos/eliminar/", contactosController.delete);
router.get("/contactos/editar/:user/:param", contactosController.edit);
router.get("/contactos/:id", contactosController.filterID);
router.post("/contactos", express.json(), contactosController.create);

//USUARIOS
router.post("/registro",express.json(),usuariosController.registro);
router.post("/usuarios")

module.exports = router;