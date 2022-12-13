const express =require("express");
const router = require("express").Router();
const contactosController = require("./../controllers/contactos");

router.get("/contactos/", contactosController.getAll);
router.get("/contactos/filtrar/", contactosController.filter);
router.get("/contactos/eliminar/", contactosController.delete);
router.get("/contactos/editar/", express.json(), contactosController.edit);
router.get("/contactos/:id", contactosController.filterID);



router.post("/contactos", express.json(), contactosController.create);


module.exports = router;