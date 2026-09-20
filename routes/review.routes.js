const express = require("express")
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');
const authenticate = require("../middlewares/authentication");
const role = require("../middlewares/role");

router.post("/api/products/:productId/reviews" ,authenticate, role("user"), reviewsController.createReview);

router.get("/api/products/:productId/reviews" ,authenticate, role("user"), reviewsController.showReview)

router.patch("/api/reviews/:id" ,authenticate, role("user"), reviewsController.updateReview)

router.delete("/api/reviews/:id" ,authenticate, role("user"), reviewsController.deleteReview)



module.exports = router