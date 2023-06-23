const mongoose = require("mongoose");

const schema = mongoose.Schema({
  intent: {
    type: String,
    trim: true,
    unique: true,
  },
  questions: [
    {
      type: String,
      trim: true,
    },
  ],
  answers: [
    {
      type: String,
      trim: true,
    },
  ],
});

module.exports = mongoose.model("chatModel", schema);
