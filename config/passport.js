
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy

// ====================
// LocalStrategyy
//===================

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


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8000/api/auth/google/callback"
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("========== GOOGLE PROFILE ==========");
                console.log(profile);

                console.log("EMAIL:", profile.emails);
                console.log("NAME:", profile.displayName);
                console.log("GOOGLE ID:", profile.id);

                const email = profile.emails?.[0]?.value;
                const name = profile.displayName;
                const googleId = profile.id;

                console.log({
                    email,
                    name,
                    googleId
                });

                // مؤقتًا فقط
                return done(null, {
                    email,
                    name,
                    googleId
                });

            } catch (error) {
                console.log("GOOGLE ERROR:", error);
                return done(error);
            }
        }
    )
);

module.exports = passport;