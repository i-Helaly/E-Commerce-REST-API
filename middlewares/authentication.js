const appError = require("../utils/appError")
const jSend = require("../utils/Jsendvar")

const authenticate = (req, res, next) => {
    if (!req.user.userId
    ) {
        const error = appError.create("Authentication required", 401, jSend.ERROR);
        next(error);
    }
    next()
}

module.exports = authenticate;