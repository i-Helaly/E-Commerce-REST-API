const Product = require('../models/product.model')
const appError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');
const jSend = require("../utils/Jsendvar")

const getProducts = asyncWrapper (
    async (req , res)=>{
    const data = await Product.find();
    res.status(200).json({status:"success" , data: {data}})
})

const getProduct = asyncWrapper (async (req , res , next)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product){
        const error = appError.create("Product Not Found" , 400 , jSend.ERROR);
        return next(error)
    }
    res.status(200).json({status:"success" , data: {product}})
})

const updateProduct = asyncWrapper (
    async (req , res , next)=>{
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId , req.body , {new : true});
    if(!product){
        const error = appError.create("Product Not Found" , 400 , jSend.ERROR);
        return next(error)
    }
    res.status(200).json({status:"success" , data: {product}})
})

const postProduct = asyncWrapper (
    async (req , res)=>{
    const createProduct = new Product(req.body);
    await createProduct.save()
    res.status(201).json({status: "success" , data: {msg : "User Created"}})
})

const deleteProduct = asyncWrapper (
    async (req , res , next)=>{
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if(!product){
        const error = appError.create("Product Not Found" , 400 , jSend.ERROR);
        return next(error)
    }
    res.status(200).json({status:"success" , data: null})
})




module.exports = {
    getProducts,
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct
}