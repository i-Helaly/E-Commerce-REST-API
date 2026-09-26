require('dotenv').config()
const express = require("express");
const app = express();
const productRoutes = require('./routes/product.routes');
const UserRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.routes')
const jSend = require("./utils/Jsendvar")
const cors = require('cors');
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const orderRoutes = require('./routes/orders.routes')
const categoryRoutes = require("./routes/category.routes")
const reviewsRoutes = require("./routes/review.routes")
const path = require("path");
const qs = require("qs");


app.use(express.static('public'))
app.use(express.json())
app.use(cors());
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.set("query parser", (str) => qs.parse(str));
app.use('/' , productRoutes)
app.use('/' , UserRoutes)
app.use('/' , authRoutes)
app.use('/' , orderRoutes)
app.use('/' , categoryRoutes)
app.use('/' , reviewsRoutes)

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