
const mongoose = require('mongoose');

mongoose.connect(process.env.URI).then(() => {
    console.log("Connected Successfully")
}).catch((err) => {
    console.log(err)
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }, stock: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;