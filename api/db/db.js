const mongoose = require("mongoose");

const connect = async () => {
  mongoose.connect(process.env.DB_URI);
};

module.exports = connect;
