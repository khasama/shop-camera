const express = require("express");
const router = express.Router();
const adminRoute = require("./admin.route");
const customerRoute = require("./customer.route");
const { verifyToken } = require("../middlewares");

router.use("/admin", verifyToken(2), adminRoute);
router.use("/", customerRoute);

module.exports = router;
