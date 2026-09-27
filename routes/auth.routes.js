const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const passport = require("../config/passport")

router.post('/api/auth/register' , authController.register)
router.post('/api/auth/login' , passport.authenticate("local" , { session : false}) ,authController.logIn)
router.post('/api/auth/logout' , authController.logOut)



module.exports = router