
const User = require('../models/user.model');
const jSend = require("../utils/Jsendvar")

const getUsers = async (req , res)=>{
  try{
      const users = await User.find();
     res.status(200).json({status: jSend.SUCCESS , data:{users}})
  }catch(err){
           console.error(err);
    res.status(500).json({status : jSend.ERROR , message : {msg : "internal Error"}})
  }
}

const getUser = async (req , res)=>{
  try{
    const userId = req.params.id;
      const user = await User.findOne(userId);
     res.status(200).json({status: jSend.SUCCESS , data:{user}})
  }catch(err){
           console.error(err);
    res.status(500).json({status : jSend.ERROR , message : {msg : "internal Error"}})
  }
}

const createUser = async (req , res)=>{
try{
        console.log(req.body);
  const user = await User.create(req.body);
   res.status(201).json({status: jSend.SUCCESS , data:{user}})
}catch(err){
        console.error(err);
    res.status(500).json({status : jSend.ERROR , message : {msg : "internal Error"}})
}

}
const updateUser = async (req , res)=>{
try{
    const userId = req.params.id;
    const editUser = await User.findByIdAndUpdate(userId, req.body , {new : true})
   res.status(200).json({status: jSend.SUCCESS , data:{editUser}})
}catch(err){
        console.error(err);
    res.status(500).json({status : jSend.ERROR , message : {msg : "internal Error"}})
}

}

const deleteUser = async (req , res)=>{
try{
    const userId = req.params.id;
     await User.findByIdAndDelete(userId)
   res.status(200).json({status: jSend.SUCCESS , data:{msg : "deleted"}})
}catch(err){
        console.error(err);
    res.status(500).json({status : jSend.ERROR , message : {msg : "internal Error"}})
}

}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}