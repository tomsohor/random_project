const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: String,
  reciever: String,
  content: String,
  date: { type: date, default: Date.now },
});

module.exports = mongoose.model("Messages", userSchema);
