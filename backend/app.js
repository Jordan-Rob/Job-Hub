const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const candidateRoutes = require("./routes/candidateRoutes");
const { swaggerUi, specs } = require("./swagger");
//const sequelize = require("./config/database");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(candidateRoutes);

//sequelize.sync().then(() => console.log("DB is ready!!"));

module.exports = app;
