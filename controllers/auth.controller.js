
const asyncWrapper = require('../middlewares/asyncWrapper');
const jSend = require("../utils/Jsendvar")
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const appError = require('../utils/appError');
const JWT = require("../utils/generateJwt");
const transporter = require("../config/email")


const register = asyncWrapper(
    async (req, res, next) => {
        const {name , password , email} = req.body;
        const hashPassword = await bcrypt.hash(password , 10)
        const user =   new User({name , password: hashPassword , email});
        const token = JWT({email: email , id: user._id})
        user.token = token;
        await user.save();

        await transporter.sendMail({
            from : process.env.EMAIL,
            to: user.email,
            subject: "Welcome to our E-Commerce!",
            html:` <h1>Welcome ${user.name}! 🎉</h1>
            <p>Your account has been created successfully.</p>
            <p>We're happy to have you with us.</p>`
        })
        res.status(200).json({status: jSend.SUCCESS , data :{user}})
    }
)
const logIn = asyncWrapper(
    async (req, res, next) => {
        // const { password , email} = req.body;
        // const user = await User.findOne({email});
        // if(!user){
        //     const error = appError.create("user not Found" , 400 , jSend.ERROR);
        //     next(error);
        // }
        // const comparePassword = await bcrypt.compare(password , user.password);
        // if(!comparePassword){
        //     const error = appError.create("password not match" , 400 , jSend.ERROR);
        //     next(error);
        // }
    

        const user = req.user;
        const token = JWT({email: user.email , role : user.role ,id: user._id})
       
        res.status(200).json({status: jSend.SUCCESS , data:{token}})
    }
)
 const googleLogin = asyncWrapper(
    async(req , res , next)=>{

          const user = req.user;

          const token = JWT({
                            id: user._id,
                email: user.email,
                role: user.role
          } , process.env.JWT_SECRET_KEY , {
            expiresIn : "10m"
          })

          res.status(200).json({

            status: "success",

            data: {
                token
            }

        });

    }

 )

 const githubLogin = asyncWrapper(
    async(req , res , next)=>{

          const user = req.user;

          const token = JWT({
                            id: user._id,
                email: user.email,
                role: user.role
          } , process.env.JWT_SECRET_KEY , {
            expiresIn : "10m"
          })

          res.status(200).json({

            status: "success",

            data: {
                token
            }

        });

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
    logOut,
    googleLogin,
    githubLogin
    
}