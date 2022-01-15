const jwt = require("jsonwebtoken");
const config = require('../config.json');

module.exports = (req, res, next)=>{
    try{ 
        const auth = req.headers.authorization;
    if(!auth) res.json({error: 1});
    const enc_token = auth.split(' ')[1];
    if(enc_token){
        const token = jwt.verify(enc_token, config.secret);
        req.token = token;
        console.log(req.token)
        next();
    }else{
        res.json({error: 1})
    }
    }catch(err){
        next(err)
    }
}