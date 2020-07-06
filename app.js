const path = require("path");
const fs = require("fs");
const https = require("https");
var bcrypt = require("bcryptjs");
const express = require("express");
const bodyParser = require("body-parser");
const upload = require("./config/s3Service");
const session = require("express-session");
const app = express();
//var csrf = require("csurf");
var cors = require("cors");
var multer = require("multer");
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public", "images"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var filefilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/webp"
    ) {
        console.log(file);
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(cors());
//add routes variables
const userRoutes = require("./routes/user");
const watchRoutes = require("./routes/watch");
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(bodyParser.json({ limit: "50mb" })); // application/json
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Connection, Cookie"
    );
    next();
});
app.use(upload.single("image"));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);
app.use(watchRoutes);
app.listen(process.env.PORT || 5000, (result) => {
    console.log(`App running on PORT ${process.env.PORT || 3000}`);
});
