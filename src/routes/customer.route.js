const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customer.controller");
// const { checkRef } = require("../middlewares");

router.get("/product/:name/:id", CustomerController.prodDetail);
router.post("/user/login", CustomerController.login);
router.post("/user/register", CustomerController.register);
router.get("/user/logout", CustomerController.logout);
router.get("/", CustomerController.home);

module.exports = router;