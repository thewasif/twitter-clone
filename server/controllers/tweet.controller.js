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
        repliedTo: null,
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

  const pageNo = parseInt(req.query.pageNo) || 1;
  const size = parseInt(req.query.size) || 10;

  const skipBy = size * (pageNo - 1);

  if (username) {
    User.findOne({ username })
      .then((response) => {
        Tweet.find({ userID: response._id, repliedTo: null })
          .sort({ time: -1 })
          .skip(skipBy)
          .limit(size)
          .then((tweet) => {
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
        repliedTo: orgTweetID,
      };

      let tweet = new Tweet(tweetData);

      tweet
        .save()
        .then((resp) => {
          console.log(resp);
          Tweet.findByIdAndUpdate(orgTweetID, {
            $push: { replies: auth.user._id },
          }).then((res) => {
            console.log(res);
          });
          return res.send(resp);
        })
        .catch((e) => {
          console.log(e);
          return res.send(e);
        });
    } else {
      return res.sendStatus("403");
    }
  });
};

const likeTweet = (req, res) => {
  let { tweetID } = req.body;

  console.log("POST", tweetID);

  jwt.verify(req.token, SECRET, async (err, auth) => {
    console.log("heee");
    if (err) return res.sendStatus("403");
    console.log("booo");

    let user = await User.findById(auth.user._id);

    if (!user) return res.sendStatus("400");

    if (auth.user.password === user.password) {
      Tweet.findOneAndUpdate(
        { _id: tweetID },
        { $push: { hearts: auth.user._id } }
      )
        .then((response) => {
          console.log(response);
          res.send(response);
        })
        .catch((e) => {
          console.log(e);
          res.send(e);
        });
    } else {
      return res.sendStatus("403");
    }
  });
};

const unlikeTweet = (req, res) => {
  let { tweetID } = req.body;
  console.log("POST", tweetID);

  jwt.verify(req.token, SECRET, async (err, auth) => {
    console.log("heee");
    if (err) return res.sendStatus("403");
    console.log("booo");

    let user = await User.findById(auth.user._id);

    if (!user) return res.sendStatus("400");

    if (auth.user.password === user.password) {
      Tweet.findOneAndUpdate(
        { _id: tweetID },
        { $pull: { hearts: auth.user._id } }
      )
        .then((response) => {
          console.log(response);
          res.send(response);
        })
        .catch((e) => {
          console.log(e);
          res.send(e);
        });
    } else {
      return res.sendStatus("403");
    }
  });
};

const getTweet = async (req, res) => {
  let id = req.params.id;

  let tweet = await Tweet.findById(id);

  if (tweet) {
    return res.json(tweet);
  }

  return res.sendStatus("404");
};

const getReplies = async (req, res) => {
  let { tweetID } = req.body;
  let tweets = await Tweet.find({ repliedTo: tweetID });

  if (tweets) {
    return res.send(tweets);
  } else {
    res.sendStatus("400");
  }
};

const newsfeed = (req, res) => {
  const pageNo = parseInt(req.query.pageNo) || 1;
  const size = parseInt(req.query.size) || 10;

  const skipBy = size * (pageNo - 1);

  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) return res.sendStatus("403");

    let user = await User.findById(auth.user._id);

    if (!user) return res.sendStatus("400");

    if (auth.user.password === user.password) {
      // user authenticated..!
      let following = user.following;

      let tweets = await Tweet.find({
        userID: { $in: following },
        repliedTo: null,
      })
        .sort({ time: -1 })
        .skip(skipBy)
        .limit(size);

      res.send(tweets);
    } else {
      return res.sendStatus("403");
    }
  });
};

module.exports = {
  postTweet,
  getTweets,
  replyTweet,
  likeTweet,
  unlikeTweet,
  getTweet,
  getReplies,
  newsfeed,
};
