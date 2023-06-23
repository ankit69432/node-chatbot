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
      await manager.train();
      await manager.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  })();
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
  trainModel();
  try {
    const answer = await manager.process("en", question);

    return res.status(200).json({
      reply:
        answer.answers.length >= 1
          ? answer.answers[Math.floor(Math.random() * answer.answers.length)]
          : { answer: "I coudn't get it" },
    });
  } catch (err) {
    return res.status(500).json({
      err: err,
    });
  }
};
module.exports = { bot: bot, trainModel: trainModel, insertData: insertData };
