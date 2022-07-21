const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { signAccessToken } = require("../utils");
const CustomerController = {};
const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model");
const UserModel = require("../models/user.model");

CustomerController.home = async (req, res) => {
    const products = await ProductModel.find({}).limit(30);
    const categories = await CategoryModel.find({});
    res.render("customer", {
        products,
        categories,
        user: req.session.user,
        cart: req.session.cart,
    });
};

CustomerController.prodDetail = async (req, res) => {
    const _id = mongoose.Types.ObjectId(req.params.id);
    const product = await ProductModel.find({ _id })
        .populate("category")
        .limit(1);
    const categories = await CategoryModel.find({});
    const prodSameCategory = await ProductModel.find({
        category: product[0].category._id,
    }).limit(30);
    res.render("customer/product", {
        product: product[0],
        categories,
        prodSameCategory,
        user: req.session.user,
        cart: req.session.cart,
    });
};

CustomerController.showCart = async (req, res) => {
    let cart = [];
    let prodCart = [];
    if (req.session.cart) {
        cart = JSON.parse(req.session.cart);
        for (const prod of cart) {
            const product = await ProductModel.find({
                _id: mongoose.Types.ObjectId(prod.id),
            }).limit(1);
            const p = {
                name: product[0].name,
                thumb: product[0].thumb,
                low: product[0].low,
                quantity: prod.quantity,
            };
            console.log(p);
            prodCart.push(p);
        }
    }

    // const _id = mongoose.Types.ObjectId(req.params.id);
    // const product = await ProductModel.find({ _id })
    //     .populate("category")
    //     .limit(1);
    const categories = await CategoryModel.find({});
    // const prodSameCategory = await ProductModel.find({
    //     category: product[0].category._id,
    // }).limit(30);
    res.render("customer/cart", {
        categories,
        user: req.session.user,
        cart: req.session.cart,
        prodCart,
    });
};

CustomerController.addCart = async (req, res) => {
    const id = req.body.id;
    const quantity = parseInt(req.body.quantity);
    const newCart = {
        id,
        quantity,
    };
    if (!req.session.cart) {
        req.session.cart = JSON.stringify([newCart]);
        // req.session.cart.push(cart);
    } else {
        let cart = JSON.parse(req.session.cart);
        let index = -1;
        cart.find((item, i) => {
            if (item.id == id) {
                index = i;
            }
        });
        if (index >= 0) {
            cart[index].quantity = cart[index].quantity + quantity;
        } else {
            cart.push(newCart);
        }
        req.session.cart = JSON.stringify(cart);
    }
    return res.status(200).json({ status: "success" });
};

CustomerController.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const user = await UserModel.find({
            $or: [{ username }, { email: username }],
        }).limit(1);
        if (user.length > 0) {
            const hashPass = user[0].password;
            const match = await bcrypt.compare(password, hashPass);
            if (match) {
                const payload = {
                    id: user[0]._id,
                    username: user[0].username,
                    role: user[0].role,
                };
                const accessToken = await signAccessToken(payload);
                req.session.user = payload;
                res.cookie("access_token", accessToken, {
                    secure: process.env.NODE_ENV !== "development",
                    httpOnly: true,
                    maxAge: 3 * 60 * 60 * 1000,
                });
                return res.status(200).json({ status: "success" });
            } else {
                return res
                    .status(200)
                    .json({ status: "failed", message: "Sai pass" });
            }
        } else {
            return res.status(200).json({
                status: "failed",
                message: "Email hoặc username không tồn tại",
            });
        }
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Thiếu kìa bạn trẻ" });
    }
};

CustomerController.register = async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if (email && username && password) {
        const user = await UserModel.find({
            $or: [{ username }, { email }],
        }).limit(1);
        if (user.length == 0) {
            const hashPass = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                email,
                username,
                password: hashPass,
            });
            await newUser.save();
            return res.status(200).json({
                status: "success",
            });
        } else {
            return res.status(200).json({
                status: "failed",
                message: "Email hoặc username đã tồn tại",
            });
        }
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Thiếu kìa bạn trẻ" });
    }
};

CustomerController.logout = (req, res) => {
    res.clearCookie("access_token");
    req.session.destroy((err) => {
        if (!err) return res.redirect("/");
    });
};

module.exports = CustomerController;
