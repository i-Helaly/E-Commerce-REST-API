
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
    }
})


const User = mongoose.model("User", userSchema);

module.exports = User