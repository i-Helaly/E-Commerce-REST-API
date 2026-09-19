require('dotenv').config()
const express = require("express");
const app = express();
const productRoutes = require('./routes/product.routes');
const UserRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.routes')
const jSend = require("./utils/Jsendvar")
const cors = require('cors');
const session = require("express-session");
const { cookie } = require('express-validator');
const MongoStore = require("connect-mongo").default;
const orderRoutes = require('./routes/orders.routes')

app.use(express.static('public'))
app.use(express.json())
app.use(cors())

const store =  MongoStore.create({
    mongoUrl: process.env.URI,
    collectionName: "sessions"
})

store.on("error", (error) => {
    console.log("SESSION STORE ERROR:", error);
});

app.use(session({
    secret: "this is my secret key to my session",
    saveUninitialized: true,
     resave: false,
    cookie:{
        maxAge: 24 * 60 * 600 *100
    },
      store: store
}))

app.use('/' , productRoutes)
app.use('/' , UserRoutes)
app.use('/' , authRoutes)
app.use('/' , orderRoutes)

app.all("/*splat", (req, res) => {
    res.status(404).json({
        Msg: "Not Found"
    });
});

app.use((error,req , res , next)=>{
res.status(error.statusCode || 500).json({status: error.statusText||jSend.ERROR , message: error.message })
})
app.listen(8000 , ()=>{
    console.log(`Listening On Port 8000`)
})