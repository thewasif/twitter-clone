const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
  createdAt: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
