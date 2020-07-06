const User = require("../models/users");
const Watch = require("../models/watch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../config/s3Service");
const singleUpload = upload.single("image");
const Sequelize=require('sequelize')

exports.postAddWatch = (req, res, next) => {
    try {
        var decoded = jwt.verify(req.headers["authorization"], "secret");
        User.findOne({ where: { id: decoded.id } }).then(async (user) => {
            if (user) {
                const watchData = {
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    image: req.file,
                };

                var imageUrl = {};
                await singleUpload(req, res, function (err) {
                    if (err) {
                        return res.status(422).send({
                            errors: [
                                {
                                    title: "Error in uploading image",
                                    detail: err.message,
                                },
                            ],
                        });
                    }
                });
                if (req.file !== undefined) {
                    imageUrl = await req.file.location;
                } else {
                    imageUrl = "";
                }
               

                watchData.image = imageUrl;
                console.log(watchData);
                await Watch.findOne({
                    where: { title: watchData.title },
                }).then(async (watch) => {
                    if (!watch) {
                        await Watch.create(watchData)
                            .then((user) => {
                                res.json({
                                    message: `Successfully add watch with title : ${watchData.title}`,
                                });
                            })
                            .catch((err) => {
                                res.send("error: " + err);
                            });
                    } else {
                        res.json({
                            error: "Watch already exists by this title",
                        });
                    }
                });
            } else {
                return res.json({ error: "User not logged in" });
            }
        });
    } catch (err) {
        return res.json({ error: "User not logged in" });
    }
};

exports.getWatches = (req, res, next) => {
    Watch.findAll().then((watches) => {
        res.json(watches);
    });
};
