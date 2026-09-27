
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.model");


passport.use(
    new LocalStrategy({
        usernameField: "email"
    }, async ( email  , password, done) => {
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, {
                    message: "User not found"
                });
            }
            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                return done(null, false, {
                    message: "Password not match"
                });
            }
            return done(null, user);
        }))


module.exports = passport;