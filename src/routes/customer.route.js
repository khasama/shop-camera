const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customer.controller");

router.get("/product/:name/:id", CustomerController.prodDetail);
router.get("/products/:page", CustomerController.loadMore);
router.post("/add-cart", CustomerController.addCart);
router.put("/update-cart", CustomerController.updateCart);
router.delete("/delete-cart", CustomerController.deleteCart);
router.get("/cart", CustomerController.showCart);
router.post("/payment", CustomerController.payment);

router.get("/category/:slug/:id", CustomerController.category);
router.get("/cate-loadmore/:id/:page", CustomerController.categoryLoadMore);

router.post("/user/login", CustomerController.login);
router.post("/user/register", CustomerController.register);
router.get("/user/logout", CustomerController.logout);
router.get("/", CustomerController.home);

module.exports = router;
