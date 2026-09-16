require('dotenv').config()
const express = require("express");
const app = express();
const productRoutes = require('./routes/product.routes');
const UserRoutes = require('./routes/user.route');
const cors = require('cors');


app.use(express.static('public'))
app.use(express.json())
app.use(cors())

app.use('/' , productRoutes)
app.use('/' , UserRoutes)


app.all("/*splat", (req, res) => {
    res.status(404).json({
        Msg: "Not Found"
    });
});

app.listen(8000 , ()=>{
    console.log(`Listening On Port 8000`)
})