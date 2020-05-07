const route = require("express").Router();
const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");
const verifyToken = require("../helpers/verifyToken");
const { postTweet } = require("../controllers/tweet.controller");

route.post("/", verifyToken, postTweet);

route.get("/", (req, res) => {
  let { username } = req.query;

  if (username) {
    User.findOne({ username })
      .then((response) => {
        console.log("user", response);
        Tweet.find({ userID: response._id }).then((tweet) => {
          console.log(tweet);
          res.json(tweet);
        });
      })
      .catch((e) => {
        res.send(e);
      });
  }
});

module.exports = route;
