
const express = require("express");
const router = express.Router();
const orderController = require('../controllers/order.controller')
const authenticate = require('../middlewares/authentication');


router.post('/api/orders' , authenticate , orderController.createOrder)
router.get('/api/orders/my-orders' , authenticate , orderController.getMyOrders);
router.get('/api/orders/:id' , authenticate , orderController.getMyOrder);
router.get('/api/orders' , authenticate , orderController.getAdminOrder);


module.exports = router;