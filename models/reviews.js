

const mongoose = require("mongoose");


const  ReviewSchema = new mongoose.Schema({
    rate: {
        type: Number,
        require: true
    },
        comment: {
        type: String,
        require: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
         required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})

const Review = mongoose.model("Review" , ReviewSchema);

module.exports = Review;