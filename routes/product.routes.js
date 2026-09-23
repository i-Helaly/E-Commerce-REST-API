const express = require('express');
const productsController = require('../controllers/product.controller')
const bodyOfValidation = require('../middlewares/validationBody');
const resOfValidation = require('../middlewares/resultValidation');
const role = require('../middlewares/role');
const authenticate = require('../middlewares/authentication');
const uploadImage = require("../middlewares/uploadimage")
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/upload");
const roleBasedAuth = require("../middlewares/rolebasedAuth")


router.get('/api/product'  ,verifyToken,roleBasedAuth("admin" , "user"),productsController. getProducts);

router.get('/api/product/:id' ,verifyToken,roleBasedAuth("admin" , "user"), productsController.getProduct);

router.post('/api/product' ,bodyOfValidation,resOfValidation, verifyToken,roleBasedAuth("admin" ),productsController.postProduct)

router.post('/api/product/upload-excel' , verifyToken,roleBasedAuth("admin" ),upload.single("file"),productsController.uploadProducts)

router.post('/api/products/:id/images' , verifyToken,roleBasedAuth("admin" ),uploadImage().single("image"),productsController.uploadProductImage);

router.patch('/api/product/:id' ,verifyToken,roleBasedAuth("admin"),productsController.updateProduct);

router.delete('/api/product/:id' , verifyToken,roleBasedAuth("admin"), productsController.deleteProduct)



module.exports = router;