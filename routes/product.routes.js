const express = require('express');
const productsController = require('../controllers/product.controller')
const bodyOfValidation = require('../middlewares/validationBody');
const resOfValidation = require('../middlewares/resultValidation')
const router = express.Router();

router.get('/api/product'  ,productsController. getProducts)
router.get('/api/product/:id' , productsController.getProduct)
router.post('/api/product' ,bodyOfValidation,resOfValidation, productsController.postProduct)

module.exports = router;