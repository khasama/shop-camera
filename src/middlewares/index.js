require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    verifyToken: (type = 3) => {
        return (req, res, next) => {
            const token = req.session.token;
            if (!token) {
                return res.redirect("/");
            }

            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, payload) => {
                    if (err) return next(createError.Unauthorized());
                    const role = payload.role;

                    switch (type) {
                        case 1:
                            if (role == "admin") {
                                next();
                                break;
                            }
                            return res.redirect("/");

                        case 2:
                            if (role == "admin" || role == "mod") {
                                next();
                                break;
                            }
                            return res.redirect("/");

                        default:
                            return res.redirect("/");
                    }
                }
            );
        };
    },
};
