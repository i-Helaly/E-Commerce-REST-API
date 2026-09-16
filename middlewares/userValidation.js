
const { body } = require("express-validator");

const bodyOfUserValidation = [
    body('name').notEmpty().withMessage("Name is required").isLength({ min:3, max: 20 }).withMessage("max Length Of Name is 20 char"),
    body('password').notEmpty().withMessage("password is required"),
    body('email').isEmail().withMessage("must be email").notEmpty().withMessage("price is required"),
  
]

module.exports = bodyOfUserValidation