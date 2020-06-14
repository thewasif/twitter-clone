const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let notificationsSchema = new Schema({
  username: String,
  link: String,
  client: String,
  text: String,
});

let Notification = mongoose.model("Notification", notificationsSchema);

module.exports = Notification;
