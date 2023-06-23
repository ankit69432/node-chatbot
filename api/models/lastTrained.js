const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  last: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("lastTrained", schema);
