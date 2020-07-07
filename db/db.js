const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize(
    "d6m5vr5j68tu7i",
    "mqlwrlelunkrto",
    "fa90af1255c97ada82159a3b47faf5d54df8471ab795e6a7c47323eea87ae420",
    {
        host: "ec2-52-200-48-116.compute-1.amazonaws.com",
        port: "5432",
        dialect: "postgres",
        operatorAliases: false,
        pool: {
            max: 6,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
