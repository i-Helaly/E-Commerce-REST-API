
const asyncWrapper = require('../middlewares/asyncWrapper');
const jSend = require("../utils/Jsendvar")
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const appError = require('../utils/appError');
const JWT = require("../utils/generateJwt")

const register = asyncWrapper(
    async (req, res, next) => {
        const {name , password , email} = req.body;
        const hashPassword = await bcrypt.hash(password , 10)
        const user =   new User({name , password: hashPassword , email});
        const token = JWT({email: email , id: user._id})
        user.token = token;
        await user.save()
        res.status(200).json({status: jSend.SUCCESS , data :{user}})
    }
)
const logIn = asyncWrapper(
    async (req, res, next) => {
        const { password , email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            const error = appError.create("user not Found" , 400 , jSend.ERROR);
            next(error);
        }
        const comparePassword = await bcrypt.compare(password , user.password);
        if(!comparePassword){
            const error = appError.create("password not match" , 400 , jSend.ERROR);
            next(error);
        }
      
        const token = JWT({email: email , role : user.role ,id: user._id})
       
        res.status(200).json({status: jSend.SUCCESS , data:{token}})
    }
)
const logOut = asyncWrapper(
    async (req, res, next) => {
      req.session.destroy((err)=>{
        if(err){
            const error =   appError.create( "Logout failed" , 500 ,jSend.ERROR);
            next(error)
        }
      })
        res.status(200).json({status: jSend.SUCCESS , data:{msg : "logout successfully"}})
    }
)
module.exports = {
    register,
    logIn,
    logOut
}