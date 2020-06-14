const route = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const verifyToken = require("../helpers/verifyToken");

const SECRET = process.env.JWT_SECRET;

route.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) res.sendStatus("403");

    let user = await User.findById(auth.user._id);

    if (user.password === auth.user.password) {
      let notifications = await Notification.find({ client: auth.user._id });

      res.send(notifications);
    } else {
      res.sendStatus("403");
    }
  });
});

module.exports = route;
