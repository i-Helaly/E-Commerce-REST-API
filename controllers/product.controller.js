const Product = require('../models/product.model')

const getProducts = async (req , res)=>{
    const data = await Product.find();
    res.status(200).json({status:"success" , data: {data}})
}

const getProduct = async (req , res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.status(200).json({status:"success" , data: {product}})
}

const postProduct = async (req , res)=>{
    console.log(req.body)
    const createProduct = new Product(req.body);
    await createProduct.save()
    res.status(201).json({status: "success" , data: {msg : "User Created"}})
}

module.exports = {
    getProducts,
    getProduct,
    postProduct,
}