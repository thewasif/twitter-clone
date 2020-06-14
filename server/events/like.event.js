const EventEmitter = require("events");
const Notification = require("../models/notification.model");

class LikeEmitter extends EventEmitter {}

const likeEmitter = new LikeEmitter();

likeEmitter.on("sendLikeNotification", (username, tweetID, client) => {
  let notification = new Notification({
    text: "liked you tweet",
    username: username,
    link: `/status/${tweetID}`,
    client: client,
    time: new Date(),
  });

  notification
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = likeEmitter;
