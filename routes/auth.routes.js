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

router.get("/api/auth/github" , passport.authenticate("github" , {
   scope: ["user:email"]
}))
router.get(
  "/api/auth/github/callback",
  passport.authenticate("github", {
    session: false
  }),
  authController.githubLogin
);


module.exports = router