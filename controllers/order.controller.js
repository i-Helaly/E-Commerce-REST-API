
const asyncWrapper = require('../middlewares/asyncWrapper');

const createOrder = asyncWrapper(
    async(req , res , next)=>{
        
    }
)

module.exports = {
    createOrder
}