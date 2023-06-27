const express = require("express");
const {
  bot,
  insertData,
  data,
  trainModel,
} = require("../controllers/controller");
const { validateBot, validateTM } = require("../middlewares/bodyValidator");

const router = express.Router();

router

  .post("/bot", validateBot, bot)
  .post("/insertData", validateTM, insertData)
  .get("/data", data)
  .post("/train", trainModel);

module.exports = router;
