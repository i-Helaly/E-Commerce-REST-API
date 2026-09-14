
const {validationResult} = require('express-validator');

const resOfValidation = (req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({status: 'fail' , data:{errors: errors.array()}})
    }
    next();
}
module.exports=resOfValidation;