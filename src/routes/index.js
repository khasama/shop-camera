const express = require("express");
const router = express.Router();
const adminRoute = require("./admin.route");
const customerRoute = require("./customer.route");

router.use("/admin", adminRoute);
router.use("/", customerRoute);

module.exports = router;
