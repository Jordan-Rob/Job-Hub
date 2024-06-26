const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./devDatabase.sqlite",
  logging: false,
});

module.exports = sequelize;
