const express = require("express");
const { trainModel, bot, insertData } = require("../controllers/controller");
const { validateBot, validateTM } = require("../middlewares/bodyValidator");

const router = express.Router();

router

  .post("/bot", validateBot, bot)
  .post("/insertData", validateTM, insertData);

module.exports = router;
