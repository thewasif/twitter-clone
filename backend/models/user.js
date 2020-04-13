const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  password: String,
  email: String,
});

module.exports = User;
