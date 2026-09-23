
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const jSend = require("../utils/Jsendvar")

const verifyToken = (req , res , next)=>{

    const authHeaders = req.headers["Authorization"] ||  req.headers["authorization"] ;

    if(!authHeaders){
       const error = appError.create("token is required" ,401 , jSend.FAIL )
       return next(error);
    }
    
    try{

        const token = authHeaders.split(" ")[1];
        const payload = jwt.verify(token , process.env.JWT_SECRET_KEY);
        req.user = payload;
        
        next();
    }catch(err){
        const error = appError.create(" invalid token" ,401 , jSend.FAIL )
       return next(error);
    }

}

module.exports = verifyToken;