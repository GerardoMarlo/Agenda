const model = require("./../models/contacto");

module.exports ={
    filter: (req, res) =>{
        const filter = req.query.filtro;
        
        model.find().or([{status:1, nombre:filter}, {status:1, correo:filter}])
        .then(data => {
            res.send(data); 
        })
        .catch(err =>{
            res.status(400).send("algo salio mal");
        });
    },
    getAll: (req, res) => {
        model.find({status:1})
        .then(data => {
            res.send(data);
        })
        .catch(err =>{
            res.status(400).send("algo salio mal");
        });
    },
    create: (req, res) =>{
        const data = req.body;
        
        model.create(data).then(response => {
            res.send(response);
        });
    },

    filterID: (req, res) =>{
        const id = req.params.id;
        model.findOne({status:1, _id:id})
        .then(data => {
            res.send(data);
        })
        .catch(err =>{
            res.status(400).send("algo salio mal");
        });
    },
    delete: (req, res) =>{
        //ie http://localhost:4000/contactos/eliminar?delete=Luis
        const where = req.query.delete;
        console.log("entra where")
        console.log(where)
        model.updateOne({nombre:where},{status:2})  
        .then(data => {
            res.send("Se ha eliminado a "+where +" de la base de datos");
        })
        .catch(err =>{
            res.status(400).send("algo salio mal");
        });
        },
        edit: (req, res) =>{
            //ie http://localhost:4000/contactos/editar/Luis/status?to=1
            //ie http://localhost:4000/contactos/editar/Luis/correo?to=luis@gmail.com
            const where = req.params.user;
            const what = req.params.param;
            let to = (req.query.to);
            console.log("entra edit")
            console.log(where)
            console.log(what)
            console.log(to)
            if(what == "status"){
                to = parseInt(to);
            model.findOneAndUpdate({nombre:where},{status:to})
             
            .then(data => {
                
                res.send("Se ha cambiado a "+ where + " "+what+" : "+to);
                
            })
            .catch(err =>{
                res.status(400).send("algo salio mal");
            });
            }
            else if(what == "correo"){
                model.findOneAndUpdate({nombre:where},{correo:to})
                 
                .then(data => {
                    
                    res.send("Se ha cambiado a "+ where + " "+what+" : "+to);
                    
                })
                .catch(err =>{
                    res.status(400).send("algo salio mal");
                });
                }}
    
}