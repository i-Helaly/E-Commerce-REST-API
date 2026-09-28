
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const GitHubStrategy = require("passport-github2").Strategy;

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


// ====================
// GoogleStrategyy
//===================

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
               
                console.log(profile);


                const email = profile.emails?.[0]?.value;
                const name = profile.displayName;
                const googleId = profile.id;

                let user = await User.findOne({email});
                if(!user){
                  user =  await User.create({
                        email,
                        name,
                        googleId
                    })
                }
                return done(null, user)

            } catch (error) {
                console.log("GOOGLE ERROR:", error);
                return done(error);
            }
        }
    )
);
// ====================
// GitHubStrategyy
//===================

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
  

                const githubId = profile.id;
                const name = profile.displayName || profile.username;
                const email = profile.emails?.[0]?.value;

                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
                        githubId,
                        name,
                        email
                    });
                }

                return done(null, user);

            } catch (err) {
                console.log("USER CREATION ERROR:", err);
                return done(err);
            }
        }
    )
);
module.exports = passport;