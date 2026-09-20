const User = require("../models/user.model");
const appError = require("../utils/appError");
const jSend = require("../utils/Jsendvar");
const asyncWrapper = require("./asyncWrapper")

const role = (...allowRole)=>{
    return asyncWrapper(
        async(req , res , next)=>{
            const user = await User.findById(req.session.userId);
            if(!user){
                const error = appError.create("User not found",404,jSend.ERROR);
                return next(error);
            }
           if(!allowRole.includes(user.role)){
            return next( appError.create("Access denied",403,jSend.ERROR))
           }
           next();
        }
    )
}

module.exports = role