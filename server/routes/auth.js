const route = require("express").Router();
const User = require("../models/user");

route.get("/profile", (req, res) => {
  res.send(req.session);
  /*User.findById(req.session.userId).then((e) => {
    res.send(e);
  });*/
});

route.post("/signup", (req, res) => {
  let { username, email, password } = req.body;
  let createdAt = new Date();
  User.findOne({ username: req.body.username }).then((e) => {
    console.log(e);
    if (e) {
      res.status(400).send("username already exists!");
    } else {
      let newUser = new User({ username, email, password, createdAt });
      newUser
        .save()
        .then(() => {
          req.session.userId = newUser._id;
          res.status(200).send("User saved!");
        })
        .catch((e) => {
          res.status(400).send("An error occurred!");
        });
    }
  });
});

route.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log(req.session);
  User.authenticate(username, password, (e, user) => {
    if (user) {
      console.log(user);
      req.session.userId = user._id;
      res.redirect("/auth/profile");
      // /res.status(200).send("logged in successfully");
    } else {
      res.status(400).send("an error occurred");
    }
  });
});

module.exports = route;
