const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin.controller");

router.get("/", AdminController.home);
router.get("/products", AdminController.products);
router.get("/products/:id", AdminController.getProdDetail);

module.exports = router;
