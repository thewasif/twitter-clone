const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");

let SECRET = process.env.JWT_SECRET;

const postTweet = async (req, res) => {
  let { text } = req.body;

  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) return res.sendStatus("403");
    let user = await User.findById(auth.user._id);

    if (!user) return res.sendStatus("400");

    if (auth.user.password === user.password) {
      let tweetData = {
        text,
        userID: auth.user._id,
        hearts: [],
        retweets: [],
        replies: [],
        time: new Date(),
      };

      let newTweet = new Tweet(tweetData);
      newTweet
        .save()
        .then((response) => {
          res.json(response);
        })
        .catch((e) => {
          res.send(e);
        });
    } else {
      return res.sendStatus("403");
    }
  });
};

const getTweets = (req, res) => {
  let { username } = req.query;

  if (username) {
    User.findOne({ username })
      .then((response) => {
        Tweet.find({ userID: response._id }).then((tweet) => {
          res.json(tweet);
        });
      })
      .catch((e) => {
        res.send(e);
      });
  }
};

const replyTweet = (req, res) => {
  let { text, orgTweetID } = req.body;

  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) return res.sendStatus("403");

    let user = await User.findById(auth.user._id);

    if (!user) return res.sendStatus("400");

    if (auth.user.password === user.password) {
      let tweetData = {
        _id: mongoose.Types.ObjectId(),
        text,
        userID: auth.user._id,
        hearts: [],
        retweets: [],
        replies: [],
        time: new Date(),
      };

      Tweet.findOneAndUpdate(
        { _id: orgTweetID },
        { $push: { replies: tweetData } }
      ).then((response) => {
        console.log(response);
        res.json(response);
      });
    } else {
      return res.sendStatus("403");
    }
  });
};

module.exports = {
  postTweet,
  getTweets,
  replyTweet,
};
