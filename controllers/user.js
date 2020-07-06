const User = require("../models/users");
const Watch = require("../models/watch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.postSignup = (req, res, next) => {
    console.log(req.body);
    const today = new Date();
    const userData = {
        email: req.body.email,
        password: req.body.password,
        createdAt: today,
    };
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) {
                const hash = bcrypt.hashSync(userData.password, 10);
                userData.password = hash;
                User.create(userData)
                    .then((user) => {
                        let token = jwt.sign(user.dataValues, "secret", {
                            expiresIn: 144000,
                        });
                        res.json({ token: token });
                    })
                    .catch((err) => {
                        res.send("error: " + err);
                    });
            } else {
                res.json({
                    error: "User already exists by this email address",
                });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
};

exports.postLogin = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, "secret", {
                    expiresIn: 144000,
                });
                res.json({ token: token });
            } else {
                res.status(404).json({error:"User credentials are incorrect."});
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
};
