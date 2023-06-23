const validateTM = (req, res, next) => {
  const { questions, answers, intent } = req.body;
  console.log(req.body.questions);
  if (questions != undefined && answers != undefined && intent != undefined) {
    next();
  } else {
    return res.status(400).json({
      msg: "empty parameters",
    });
  }
};

const validateBot = (req, res, next) => {
  const { question } = req.body;
  if (question != undefined) {
    next();
  } else {
    return res.status(400).json({
      msg: "empty parameters",
    });
  }
};

module.exports = { validateBot: validateBot, validateTM: validateTM };
