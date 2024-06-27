const app = require("./app");
const sequelize = require("./config/database");

const port = 3001;

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log("DB is ready!!");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
