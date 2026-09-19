
const asyncWrapper = require('../middlewares/asyncWrapper');
const Order = require('../models/order.model');
const jSend = require('../utils/Jsendvar');

const createOrder = asyncWrapper(
    async(req , res , next)=>{
        
        const userId = req.session.userId;

       const order = await Order.create({
        user: userId,
        items : req.body.items
       });
       res.status(200).json({status: jSend.SUCCESS , data: {order}})
    }
)
const getMyOrders = asyncWrapper(
    async(req , res , next)=>{

        const userId = req.session.userId;

        const orders = await Order.find({user: userId} , {__v : 0}).populate("items.product", " name , description , price");

       res.status(200).json({status: jSend.SUCCESS , data: {orders}})
    }
)
const getMyOrder = asyncWrapper(
    async(req , res , next)=>{

        const orderId = req.params.id;

        const orders = await Order.findById(orderId , {__v : 0});

       res.status(200).json({status: jSend.SUCCESS , data: {orders}})
    }
)
const getAdminOrder = asyncWrapper(
    async(req , res , next)=>{

        const orderId = req.params.id;

        const orders = await Order.find();

       res.status(200).json({status: jSend.SUCCESS , data: {orders}})
    }
)

module.exports = {
    createOrder,
    getMyOrders,
    getMyOrder,
    getAdminOrder
}