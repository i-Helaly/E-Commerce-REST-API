const Product = require('../models/product.model')
const appError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');
const jSend = require("../utils/Jsendvar");
const XLSX = require("xlsx");


const getProducts = asyncWrapper(
    async (req, res) => {
        const data = await Product.find();
        res.status(200).json({ status: "success", data: { data } })
    })

const getProduct = asyncWrapper(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("category");
    if (!product) {
        const error = appError.create("Product Not Found", 400, jSend.ERROR);
        return next(error)
    }
    res.status(200).json({ status: "success", data: { product } })
})

const updateProduct = asyncWrapper(
    async (req, res, next) => {
        const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!product) {
            const error = appError.create("Product Not Found", 400, jSend.ERROR);
            return next(error)
        }
        res.status(200).json({ status: "success", data: { product } })
    })

const postProduct = asyncWrapper(
    async (req, res) => {
        const createProduct = new Product(req.body);
        await createProduct.save()
        res.status(201).json({ status: "success", data: { msg: "User Created" } })
    })

const deleteProduct = asyncWrapper(
    async (req, res, next) => {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            const error = appError.create("Product Not Found", 400, jSend.ERROR);
            return next(error)
        }
        res.status(200).json({ status: "success", data: null })
    })

const uploadProductImage = asyncWrapper(
    async (req, res, next) => {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            const error = appError.create("Product not found", 404, jSend.ERROR); 
            return next(error); 
        }
        if (!req.file) {
    return next(
        appError.create(
            "Image is required",
            400,
            jSend.ERROR
        )
    );
}
        product.images.push(req.file.filename);
        await product.save();
        res.status(200).json({ status: jSend.SUCCESS, data: { product } });

    })

    const uploadProducts = asyncWrapper(
        async (req , res , next)=>{

            console.log(req.file);

            const workBook = XLSX.readFile(req.file.path);
            const sheetName = workBook.SheetNames[0];
            const sheet = workBook.Sheets[sheetName];
            const products = XLSX.utils.sheet_to_json(sheet);

            const result = await Product.insertMany(products);

            res.status(201).json({status: jSend.SUCCESS , data: {result}})
        }
    )


module.exports = {
    getProducts,
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    uploadProducts
}