const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();


router.post('/api/auth/register' , authController.register)
router.post('/api/auth/login' , authController.logIn)



module.exports = router