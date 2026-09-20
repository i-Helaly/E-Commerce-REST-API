
const express = require("express");
const categoryController = require("../controllers/category.controller");
const authenticate = require("../middlewares/authentication");
const role = require("../middlewares/role");
const router = express.Router();

router.post('/api/categories' ,authenticate , role("admin"),categoryController.createCategory)
router.get('/api/categories' ,categoryController.showCategories)
router.get('/api/categories/:id' ,categoryController.showCategory)
router.patch('/api/categories/:id' ,authenticate , role("admin"),categoryController.updateCategory)
router.delete('/api/categories/:id' ,authenticate , role("admin"),categoryController.deleteCategory)



module.exports = router