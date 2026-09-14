
const { body } = require("express-validator");

const bodyOfValidation = [
    body('name').notEmpty().withMessage("Name is required").isLength({ min:3, max: 20 }).withMessage("max Length Of Name is 20 char"),
    body('description').notEmpty().withMessage("description is required"),
    body('price').notEmpty().withMessage("price is required"),
    body('stock').notEmpty().withMessage("stock is required"),
]

module.exports = bodyOfValidation