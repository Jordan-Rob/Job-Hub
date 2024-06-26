const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const candidateRoutes = require("./routes/candidateRoutes");
//const sequelize = require("./config/database");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(candidateRoutes);

//sequelize.sync().then(() => console.log("DB is ready!!"));

module.exports = app;
