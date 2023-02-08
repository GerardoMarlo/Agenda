const express =require("express");
const router = require("express").Router();
const multer = require("multer");
const contactosController = require("./../controllers/contactos");
const usuariosController = require("./../controllers/usuarios")
const authMiddleware = require("../middlewares/auth");

//definimos multer

const storage = {
    destination: (req, file, callback) => {

        
        callback(null, "uploads/images");

    },
    filename: (req, file, callback) => {
        const id = req.userIdDueño;
        const extension = file.originalname.split(".").pop();
       
        //let nombre = req.user._id + "-"+new Date().getTime() + "."+extension;
        const nombre = `${req.body.nombre}-${id}-${new Date().getTime()}.${extension}`;
        callback(null, nombre);
    }
};

function filter(req, file, callback){
    const isValid = file.mimetype.startsWith("image/"); //Podría usar == "image/jpeg" para discriminar tipos de imagens
        callback(null, isValid);
}

const multerStorage = multer.diskStorage(storage);
const upload = multer({storage :multerStorage, fileFilter: filter});


//CONTACTOS
router.use("/contactos", authMiddleware); //todas las rutas de /contactos pasan por middleware
router.get("/contactos/",  contactosController.getAll);
router.get("/contactos/filtrar/", contactosController.filter);
router.get("/contactos/eliminar/", contactosController.delete);
router.get("/contactos/editar/:user/:param", contactosController.edit);
router.get("/contactos/:id", contactosController.filterID);
router.post("/contactos", upload.single("foto"), contactosController.create); // en realidad ya no necesito el express.json porque en index ya tengo app.use express.json

//USUARIOS
router.post("/registro",usuariosController.registro);
router.post("/login", usuariosController.login);
router.post("/usuarios")
router.get("/registro", usuariosController.formRegistro);
/*router.get("/fotos/:nombre", (req, res) => {
    const path = req.params.nombre;
    console.log(path);
    res.sendFile(path);
}); */

module.exports = router;