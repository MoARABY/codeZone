const JWT=require('jsonwebtoken');
require('dotenv').config();



const verifyToken=(req, res, next)=>{
    const token = req.cookies.Token
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified=JWT.verify(token, process.env.SECRET_KEY ,(err,user)=>{
            if(err) return res.status(400).send('Invalid Token!');
            req.user=user
            next();
        });
    }catch(err){
        res.status(400).send('You are not authorized!');
    }
}

const verifyTokenAdmin=(req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin) {
            next();
        } else {
            return res.status(401).send("You are not authorized")
        }
    });
}

const verifyTokenUser=(req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else{
            return res.status(401).send("You are not authorized")
        }
    });
}


module.exports = {verifyToken, verifyTokenAdmin, verifyTokenUser}