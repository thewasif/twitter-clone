const route = require("express").Router();
const jwt = require("jsonwebtoken");
const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");
const verifyToken = require("../helpers/verifyToken");
const {
  postTweet,
  getTweets,
  replyTweet,
  likeTweet,
} = require("../controllers/tweet.controller");

let SECRET = process.env.JWT_SECRET;

route.post("/", verifyToken, postTweet);

route.get("/", getTweets);

route.post("/reply", verifyToken, replyTweet);

route.post("/like", verifyToken, likeTweet);

module.exports = route;
