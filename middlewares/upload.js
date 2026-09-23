
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req , file , fn)=>{
        fn(null , "uploads/")
    },
    filename: (req , file , fn)=>{
        fn(null , file.fieldname + "-" + Date.now())
    }
})

const upload = multer({storage: storage });

module.exports = upload;