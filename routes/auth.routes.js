const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const passport = require("../config/passport")
const googleLogin = require("../controllers/auth.controller");

router.post('/api/auth/register' , authController.register)
router.post('/api/auth/login' , passport.authenticate("local" , { session : false}) ,authController.logIn)
router.post('/api/auth/logout' , authController.logOut)

router.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  authController.googleLogin
);



module.exports = router