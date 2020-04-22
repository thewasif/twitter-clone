const route = require("express").Router();
const User = require("../models/user");

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
          console.log("User has been saved to database");
          res.status(200).send("User saved!");
        })
        .catch((e) => {
          console.log("an error occurred while saving to database");
          console.log(e);
          res.status(400).send("An error occurred!");
        });
    }
  });
});

route.post("/login", (req, res) => {
  let { username, password } = req.body;
  User.authenticate(username, password, (e, user) => {
    if (user) {
      console.log(user);
      res.status(200).send("logged in successfully");
    } else {
      res.status(400).send("an error occurred");
    }
  });
});

module.exports = route;
