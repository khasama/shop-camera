const express = require("express");
const app = express();
const createError = require("http-errors");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Redis = require("ioredis");
const RedisStore = require("connect-redis")(session);
const connect = require("./src/configs/mongo");

const clientRedis = new Redis();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(
    session({
        // store: new RedisStore({ client: clientRedis }),
        secret: "thisissecret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
        },
    })
);

app.use("/public", express.static("./src/public"));

app.use(require("./src/routes"));
// app.get("/iproducts", async (req, res) => {
//     // const c = await CategoryModel.find({});
//     // let i = 0;
//     // let rawdata = fs.readFileSync("./claws/data.json");
//     // let products = JSON.parse(rawdata);
//     // for (const product of products) {
//     //     const p = new ProductModel({
//     //         ...product,
//     //         ...{ category: "62d5050475badb5e5d468aa4" },
//     //     });
//     //     await p.save();
//     //     console.log(i);
//     //     i++;
//     //     if (i == 200) {
//     //         return res.json({ status: "done" });
//     //     }
//     // }
//     // const c = await ProductModel.deleteOne({
//     //     category: "62d5050475badb5e5d468aa4",
//     // });
// });

// app.get("/icategories", async (req, res) => {
//     // const c = await CategoryModel.find({});
//     const p = new CategoryModel({ name: "Phụ kiện điện thoại" });
//     await p.save();

//     return res.json(p);
// });

// app.use((req, res, next) => {
//     next(createError.NotFound());
// });
// app.use((err, req, res, next) => {
//     return res.status(err.status).json({
//         status: "error",
//         message: err.message,
//     });
// });

connect();
module.exports = app;
