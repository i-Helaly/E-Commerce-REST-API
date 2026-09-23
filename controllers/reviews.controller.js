const asyncWrapper = require("../middlewares/asyncWrapper");
const Review = require("../models/reviews");
const appError = require("../utils/appError");
const jSend = require("../utils/Jsendvar");



const createReview = asyncWrapper(
    async (req, res) => {

        const product = req.params.productId;
        const userId = req.user.userId
            ;
        const review = await Review.create({
            rate: req.body.rate,
            comment: req.body.comment,
            product: product,
            user: userId
        })
        res.status(201).json({ status: jSend.SUCCESS, data: { review } })
    }
)

const showReview = asyncWrapper(
    async (req, res) => {

        const product = req.params.productId;

        const review = await Review.find({
            product: product
        })
        res.status(200).json({ status: jSend.SUCCESS, data: { review } })
    }
)

const updateReview = asyncWrapper(
    async (req, res, next) => {

        const reviewId = req.params.id;
        const userId = req.user.userId
            ;

        const review = await Review.findById(reviewId);
        if (!review) {
            const error = appError.create(" review Not found", 404, jSend.ERROR);
            return next(error);
        }

        if (review.user.toString() !== userId) {

            const error = appError.create(
                "You are not allowed to update this review",
                403,
                jSend.ERROR
            );
            return next(error);
        }

        review.rate = req.body.rate || review.rate;
        review.comment = req.body.comment || review.comment;
        await review.save();
        res.status(200).json({ status: jSend.SUCCESS, data: { review } })
    }
)

const deleteReview = asyncWrapper(
    async (req, res, next) => {

        const reviewId = req.params.id;
        const userId = req.user.userId
            ;

        const review = await Review.findById(reviewId);
        if (!review) {
            const error = appError.create(" review Not found", 404, jSend.ERROR);
            return next(error);
        }

        if (review.user.toString() !== userId) {

            const error = appError.create(
                "You are not allowed to Delete this review",
                403,
                jSend.ERROR
            );
            return next(error);
        }

        await Review.findByIdAndDelete(reviewId)
        res.status(200).json({ status: jSend.SUCCESS, data: null })
    }
)

module.exports = {
    createReview,
    showReview,
    updateReview,
    deleteReview
}