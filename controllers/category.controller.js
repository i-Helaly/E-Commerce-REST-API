const asyncWrapper = require("../middlewares/asyncWrapper")
const Category = require("../models/category.model");
const appError = require("../utils/appError");
const jSend = require("../utils/Jsendvar");
const Product = require("../models/product.model")


const createCategory = asyncWrapper(
    async (req, res, next) => {
        const category = await Category.create(req.body);
        res.status(201).json({ status: jSend.SUCCESS, data: { category } });
    }
)

const showCategories = asyncWrapper(
    async (req, res, next) => {
        const categories = await Category.find();
        res.status(200).json({ status: jSend.SUCCESS, data: { categories } });
    }
)

const showCategory = asyncWrapper(
    async (req, res, next) => {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) {
            const error = appError("category not found", 404, jSend.ERROR);
            return next(error);
        }
        res.status(200).json({ status: jSend.SUCCESS, data: { category } });
    }
)

const updateCategory = asyncWrapper(
    async (req, res, next) => {
        const categoryId = req.params.id;
        const category = await Category.findByIdAndUpdate(categoryId , req.body , {new : true});

        if (!category) {
            const error = appError("category not found", 404, jSend.ERROR);
            return next(error);
        }

        res.status(200).json({ status: jSend.SUCCESS, data: { category } });
    }
)

const deleteCategory = asyncWrapper(
    async (req, res, next) => {
        const categoryId = req.params.id;
        
           const category = await Category.findById(categoryId);

        if (!category) {
            const error = appError.create("category not found", 400, jSend.ERROR);
            return next(error);
        }
        
        const products = await Product.countDocuments({
            category : categoryId
        })
        
        if (products > 0) {
            const error = appError.create("Cannot delete category because it has products",  400,  jSend.ERROR
            );
            
            return next(error);
        }
         await Category.findByIdAndDelete(categoryId );
        res.status(200).json({ status: jSend.SUCCESS, data: null });
    }
)


module.exports = {
    createCategory,
    showCategories,
    showCategory,
    updateCategory,
    deleteCategory
}