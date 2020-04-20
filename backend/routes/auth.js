const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

router.post("/signup", (req, res) => {
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
            console.log("Saved to database...!");
            res.redirect("/auth/profile");
          })
          .catch((e) => {
            res.status(400).send("Invalid data!");
            console.log("Invalid data!");
          });
      });
    }
  });
});

router.post("/login", (req, res) => {
  console.log(req.body, "hehe");
  const { username, password } = req.body;
  User.authenticate(username, password, (e, user) => {
    console.log(e);
    console.log(user);
    req.session.userId = user._id;
    console.log(req.session);
    res.json(String(req.session));
  });

  /*User.findOne({ username }, (e, data) => {
    if (data) {
      let realPassword = data.password;
      if (password == realPassword) {
        console.log("Password matched...!");
        res.status(200).send("Successfully loged in!");
      } else {
        console.log("Password did not matched...!");
        res.status(400).send("Login failed");
      }
    } else {
      res.send("User not Found");
    }
  });*/
});

router.get("/profile", (req, res) => {
  console.log(req.session.userId);
  res.send(req.session);
});

router.post("/setup", (req, res) => {
  console.log(req.user);
  res.send("hey");
});

module.exports = router;
