const express = require("express");
const { check, body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/user");
const uploadController = require("../controllers/testupload");
router.post("/signup", userController.postSignup);
router.post("/login", userController.postLogin);
router.post("/uploadImage", uploadController.testUpload);
module.exports = router;
