const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

router.post("/signup", passport.authenticate("local"), (req, res) => {
  console.log(req.body, "hehe");
  req.login(req.body, () => {
    console.log(req.user);
    const newUser = new User(req.body);
    newUser.save().then((e) => console.log("saved successfully...!"));
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
