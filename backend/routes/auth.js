const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

router.post("/signup", passport.authenticate("local"), (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).then((e) => {
    if (e) {
      res.status(400).send("Email already exists");
      console.log("Email already exists");
    } else {
      req.login(req.body, () => {
        const newUser = new User(req.body);
        newUser
          .save()
          .then((e) => {
            res.status(200).send("Success!");
            console.log("Saved to database...!");
          })
          .catch((e) => {
            res.status(400).send("Invalid data!");
            console.log("Invalid data!");
          });
      });
    }
    res.redirect("/auth/profile");
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.body, "hehe");
  const { username, password } = req.body;
  User.findOne({ username: username }, (e, data) => {
    if (data) {
      console.log("User exists");
    } else {
      console.log("USer not found");
    }
  });

  res.send("Hey");
});

router.get("/profile", (req, res) => {
  console.log(req.user, "see...?");
  User.findOne({ username: "wasif" }, (e, data) => {
    console.log(data);
    res.send(data);
  });
});

router.get("/signup", (req, res) => {
  res.send({ text: "hello world" });
});

module.exports = router;
