
const asyncWrapper = require('../middlewares/asyncWrapper');
const Order = require('../models/order.model');
const jSend = require('../utils/Jsendvar');
const Product = require("../models/product.model");
const appError = require('../utils/appError');

const createOrder = asyncWrapper(
    async (req, res, next) => {

        const userId = req.user.userId;
        const { items } = req.body;

        for (let item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                const error = appError.create("product Not Found", 404, jSend.ERROR);
                return next(error);
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    status: jSend.FAIL,
                    data: { msg: `Not enough stock for ${product.name}` }
                })
            }
        }

        for (let item of items) {
            await Product.findByIdAndUpdate(
                item.product, {
                $inc: {
                    stock: -item.quantity
                }
            })

        }


        const order = new Order({
            user: userId,
            items: req.body.items
        })
        await order.save();
        res.status(201).json({ status: jSend.SUCCESS, data: { order } })
    }
)
const getMyOrders = asyncWrapper(
    async (req, res, next) => {

        const userId = req.user.userId ;

        const orders = await Order.find({ user: userId }, { __v: 0 }).populate("items.product", " name , description , price");

        res.status(200).json({ status: jSend.SUCCESS, data: { orders } })
    }
)
const getMyOrder = asyncWrapper(
    async (req, res, next) => {

        const orderId = req.params.id;

        const orders = await Order.findById(orderId, { __v: 0 });

        res.status(200).json({ status: jSend.SUCCESS, data: { orders } })
    }
)
const getAdminOrder = asyncWrapper(
    async (req, res, next) => {

        const orderId = req.params.id;

        const orders = await Order.find();

        res.status(200).json({ status: jSend.SUCCESS, data: { orders } })
    }
)

module.exports = {
    createOrder,
    getMyOrders,
    getMyOrder,
    getAdminOrder
}