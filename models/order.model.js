

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items :{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
         quantity: {
          type: Number,
          required: true,
          min: 1
        }
    }
})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;