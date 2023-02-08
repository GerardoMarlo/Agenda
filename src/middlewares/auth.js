const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) =>{
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err){
            res.sendStatus(401);
            return;
        }
        console.log("Pasamos por middleware auth token");
        req.userIdDueño = decoded._id;
        console.log(req.userIdDueño);
        next();
    });
    
    
}

module.exports = authMiddleware;