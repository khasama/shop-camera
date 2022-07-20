const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
    signAccessToken: async (user) => {
        return new Promise((resolve, rejects) => {
            const payload = user;

            const secret = process.env.ACCESS_TOKEN_SECRET;

            const option = {
                expiresIn: "3h",
            };

            jwt.sign(payload, secret, option, (err, token) => {
                if (err) rejects(err);
                resolve(token);
            });
        });
    },
    signRefreshToken: async (user) => {
        return new Promise((resolve, rejects) => {
            const payload = user;

            const secret = process.env.REFRESH_TOKEN_SECRET;

            const option = {
                expiresIn: "7h",
            };

            jwt.sign(payload, secret, option, (err, token) => {
                if (err) rejects(err);
                resolve(token);
            });
        });
    },
};
