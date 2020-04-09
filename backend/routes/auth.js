const express = require("express");
const router = express.Router();

router.route("/signup").post((req, res) => {
  console.log("WOHOOOO!");
  console.log("It Worked....!");
  console.log(req.body);
  res.send(req.body);
});

router.get("/signup", (req, res) => {
  res.send({ text: "hello world" });
});

module.exports = router;
