const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String, // new route based
  newname: String,
  email: String,
  password: String,
  messages: { type: Schema.Types.ObjectId, ref: "Messages" },
});

module.exports = mongoose.model("Users", userSchema);
