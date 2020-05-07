const jwt = require("jsonwebtoken");
const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");

let SECRET = process.env.JWT_SECRET;

const postTweet = async (req, res) => {
  let { text, token } = req.body;

  jwt.verify(token, SECRET, async (err, auth) => {
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

module.exports = {
  postTweet,
};
