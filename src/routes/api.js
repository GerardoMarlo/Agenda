const express =require("express");
const router = require("express").Router();
const contactosController = require("./../controllers/contactos");
const usuariosController = require("./../controllers/usuarios")
const authMiddleware = require("../middlewares/auth");

//CONTACTOS
router.use("/contactos", authMiddleware); //todas las rutas de /contactos pasan por middleware
router.get("/contactos/",  contactosController.getAll);
router.get("/contactos/filtrar/", contactosController.filter);
router.get("/contactos/eliminar/", contactosController.delete);
router.get("/contactos/editar/:user/:param", contactosController.edit);
router.get("/contactos/:id", contactosController.filterID);
router.post("/contactos", express.json(),  contactosController.create); // en realidad ya no necesito el express.json porque en index ya tengo app.use express.json

//USUARIOS
router.post("/registro",usuariosController.registro);
router.post("/login", usuariosController.login);
router.post("/usuarios")

module.exports = router;