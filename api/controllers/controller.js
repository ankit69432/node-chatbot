const { NlpManager } = require("node-nlp");
const chatModel = require("../models/chatModel");
const lastTrained = require("../models/lastTrained");
const manager = new NlpManager({ languages: ["en"], forceNER: true });

const trainModel = () => {
  chatModel
    .find({})
    .then((result) => {
      for (let data of result) {
        for (let q of data.questions) {
          console.log(q, data.intent);
          manager.addDocument("en", q, data.intent);
        }
        for (let ans of data.answers) {
          console.log(data.intent, ans);
          manager.addAnswer("en", data.intent, ans);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });

  (async () => {
    try {
      const res = await manager.train();
      const res2 = await manager.save();
      console.log(res, res2);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  })();
};
const train = async (req, res) => {
  trainModel();
  try {
    const reply = await manager.process("en", "hello");
    console.log(reply);
    if (reply.answers.length > 1) {
      res.status(200).json({
        msg: "trained",
      });
    } else {
      return res.status(500).send(err);
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};
const data = async (req, res) => {
  try {
    const result = await chatModel.find();
    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: err,
    });
  }
};
const insertData = async (req, res) => {
  const newData = new chatModel(req.body);
  try {
    const result = await newData.save();
    trainModel();
    return res.status(201).json({
      msg: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: err,
    });
  }
};
const bot = async (req, res) => {
  const { question } = req.body;
  const ans = await manager.process("en", "hello");
  if (ans.answers.length <= 0) trainModel();
  try {
    const answer = await manager.process("en", question);
    return res.status(200).json({
      answers: answer.answer ? answer.answer : { answer: "I coudn't get it" },
    });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};
module.exports = {
  bot: bot,
  trainModel: train,
  insertData: insertData,
  data: data,
};
