const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "unknow.jpg",
        },
        fname: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        role: {
            type: String,
            default: "normal",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
