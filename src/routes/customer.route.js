const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customer.controller");

router.get("/product/:name/:id", CustomerController.prodDetail);
router.post("/add-cart", CustomerController.addCart);
router.get("/cart", CustomerController.showCart);
router.post("/payment", CustomerController.payment);
router.post("/user/login", CustomerController.login);
router.post("/user/register", CustomerController.register);
router.get("/user/logout", CustomerController.logout);
router.get("/", CustomerController.home);

module.exports = router;
