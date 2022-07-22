const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        user: {
            type: String,
            ref: "users",
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "Đang tiến hành",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
