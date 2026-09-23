
const mongoose = require('mongoose');

mongoose.connect(process.env.URI).then(() => console.log("Connected Successfully")).catch((err) => console.log(err))

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, email: {
        type: String,
        unique: [true , "email is already exists"],
        required: true,
    }, 
    role:{
        type: String,
        enum: ["user" , "admin"],
        default: "user"
    },
    token:{
        type: String
    }
})


const User = mongoose.model("User", userSchema);

module.exports = User