const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const sequelize = require("./db/connection");
const express = require("express");
const router = require("./route/post");
const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(router);
sequelize
  .sync()
  .then(() => {
    app.listen(4000, () => console.log("listening at port 4000"));
  })
  .catch((err) => console.log(err.message));
