const route = require("express").Router();
const Tweet = require("../models/tweet");

route.get("/", (req, res) => {
  res.send("hey");
});

route.post("/", (req, res) => {
  let { text, hearts, retweets } = req.body;
  let tweetData = {
    text,
    hearts,
    retweets,
    userId: req.session.userId,
    time: new Date(),
  };
  let newTweet = new Tweet(tweetData);
  newTweet
    .save()
    .then((e) => {
      console.log("tweet has been saved..!");
      res.send(tweetData);
    })
    .catch((e) => {
      res.send(tweetData);
      console.log(e);
    });
});

module.exports = route;
