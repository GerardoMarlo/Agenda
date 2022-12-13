const model = require("./../models/usuario");

module.exports ={
    
    login:(req, res)=>{},
    registro:(req, res)=>{
        const datos = req.body;
        model.create(datos).then(response =>{
            res.send(response);
        }).catch(err => {
            res.sendStatus(400);
        });

    }
}