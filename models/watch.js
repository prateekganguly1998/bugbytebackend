const Sequelize = require("sequelize");
const db = require("../db/db");
module.exports = db.sequelize.define(
    "watch",
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        price: { type: Sequelize.INTEGER },
        image: { type: Sequelize.STRING },
    },
    {
        timestamps: false,
    }
);

db.sequelize.sync().then(() => {
    console.log("Everything is synced");
});
