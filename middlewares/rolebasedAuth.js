const appError = require("../utils/appError")
const jSend = require("../utils/Jsendvar")


const roleBasedAuth = (...role)=>{

    return (req , res , next)=>{
        if(!role.includes(req.user.role)){
            const error = appError.create("not perimission" , 401 , jSend.ERROR);
            return next(error);
        }
        next();
    }
}

module.exports = roleBasedAuth