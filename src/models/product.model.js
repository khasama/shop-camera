const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        high: {
            type: String,
        },
        low: {
            type: String,
        },
        sale: {
            type: String,
        },
        short: {
            type: String,
        },
        description: {
            type: String,
        },
        thumb: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            slug: "name",
        },
        status: {
            type: String,
            default: "Còn hàng",
        },
        category: {
            type: String,
            ref: "categories",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
