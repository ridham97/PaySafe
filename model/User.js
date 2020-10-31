const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  payid: String
});

module.exports = mongoose.model("User", userSchema);
