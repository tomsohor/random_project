const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: String,
  content: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Messages", messageSchema);
