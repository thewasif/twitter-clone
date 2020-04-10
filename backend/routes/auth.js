const express = require("express");
const router = express.Router();

router.route("/signup").post((req, res) => {
  console.log("WOHOOOO!");
  console.log("It Worked....!");
  //res.header({ "Access-Control-Allow-Origin": "http://localhost:3000" });
  //req.header({ "Access-Control-Allow-Origin": "http://localhost:3000" });
  console.log(req.body);
  res.send(req.body);
});

router.get("/signup", (req, res) => {
  res.send({ text: "hello world" });
});

module.exports = router;
