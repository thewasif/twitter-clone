const router = require("express").Router();
const passport = require("passport");

router.route("/signup").post((req, res) => {
  console.log(req.body, "hehe");
  let { username, password } = req.body;
  req.login({ username, password }, () => {
    res.redirect("/auth/profile");
  });
  /*req.logIn(req.body, () => {
    res.redirect("/auth/profile");
  });*/
});

router.get("/profile", (req, res) => {
  console.log("From blah blah", req.user);
  res.send(req.user);
});

router.get("/signup", (req, res) => {
  res.send({ text: "hello world" });
});

module.exports = router;
