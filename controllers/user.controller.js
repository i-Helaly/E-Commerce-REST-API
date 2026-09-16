
const User = require('../models/user.model');
const asyncWrapper = require('../middlewares/asyncWrapper')
const jSend = require("../utils/Jsendvar")
const appError = require('../utils/appError')

const getUsers = asyncWrapper (
    async (req , res , next)=>{

      const users = await User.find();
     res.status(200).json({status: jSend.SUCCESS , data:{users}})

})

const getUser = asyncWrapper(
    async (req , res , next )=>{
  
    const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user){
         const error = appError.create( "user Not Found" ,404 , jSend.FAIL )
        return next(error);

      }
     return res.status(200).json({status: jSend.SUCCESS , data:{user}})
}
)

const createUser = asyncWrapper( 
    async (req , res , next)=>{

        
  const user = await User.create(req.body);
   res.status(201).json({status: jSend.SUCCESS , data:{user}})


})
const updateUser = asyncWrapper( 
    async (req , res , next)=>{

    const userId = req.params.id;
    const editUser = await User.findByIdAndUpdate(userId, req.body , {new : true})
          if (!editUser){
         const error = appError.create( "user Not Found" ,404 , jSend.FAIL )
        return next(error);
      }
   res.status(200).json({status: jSend.SUCCESS , data:{editUser}})
})

const deleteUser = asyncWrapper( 
    async (req , res, next)=>{

    const userId = req.params.id;
     const user = await User.findByIdAndDelete(userId);
           if (!user){
        const error = appError.create( "user Not Found" ,404 , jSend.FAIL )
        return next(error);
      }
   res.status(200).json({status: jSend.SUCCESS , data:{msg : "deleted"}})

})

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}