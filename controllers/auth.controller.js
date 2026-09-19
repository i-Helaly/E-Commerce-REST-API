
const asyncWrapper = require('../middlewares/asyncWrapper');
const jSend = require("../utils/Jsendvar")
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const appError = require('../utils/appError');

const register = asyncWrapper(
    async (req, res, next) => {
        const {name , password , email} = req.body;
        const hashPassword = await bcrypt.hash(password , 10)
        const user =  await User.create({name , password: hashPassword , email});
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
        res.status(200).json({status: jSend.SUCCESS , data:{msg : "login successfully"}})
    }
)
module.exports = {
    register,
    logIn
}