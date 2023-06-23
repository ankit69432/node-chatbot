require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./api/routes/routes");
const connect = require("./api/db/db");
const cors = require("cors");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/v1", router);
const start = async () => {
  try {
    await connect();
    console.log("connected to db");
    app.listen(process.env.PORT, () => {
      console.log(`server is listening on port number ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
