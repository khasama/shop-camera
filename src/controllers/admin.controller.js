const mongoose = require("mongoose");
const AdminController = {};
const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model");

AdminController.home = (req, res) => {
    res.render("admin");
};

AdminController.products = async (req, res) => {
    const products = await ProductModel.find({}).populate("category");
    const categories = await CategoryModel.find({});
    res.render("admin/pages/product", { products, categories });
};

AdminController.getProdDetail = async (req, res) => {
    const _id = mongoose.Types.ObjectId(req.params.id);
    try {
        const product = await ProductModel.find({ _id })
            .populate("category")
            .limit(1);
        res.status(200).json({ status: "success", data: product[0] });
    } catch (error) {
        console.log(error);
    }
};

AdminController.categories = (req, res) => {
    res.render("admin");
};

AdminController.users = (req, res) => {
    res.render("admin");
};

module.exports = AdminController;
