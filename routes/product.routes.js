const express = require('express');
const productsController = require('../controllers/product.controller')
const bodyOfValidation = require('../middlewares/validationBody');
const resOfValidation = require('../middlewares/resultValidation');
const role = require('../middlewares/role');
const authenticate = require('../middlewares/authentication');
const uploadImage = require("../middlewares/uploadimage")
const router = express.Router();

router.get('/api/product'  ,authenticate,role("admin" , "user"),productsController. getProducts);

router.get('/api/product/:id' ,authenticate,role("admin" , "user"), productsController.getProduct);

router.post('/api/product' ,bodyOfValidation,resOfValidation, authenticate,role("admin" ),productsController.postProduct)

router.post('/api/products/:id/images' , authenticate,role("admin" ),uploadImage().single("image"),productsController.uploadProductImage);

router.patch('/api/product/:id' ,authenticate,role("admin"),productsController.updateProduct);

router.delete('/api/product/:id' , authenticate,role("admin"), productsController.deleteProduct)



module.exports = router;