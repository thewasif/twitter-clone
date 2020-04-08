const express = require("express");
const router = express.Router;

router.get("/", (req, res) => {
  let profiles = [{ username: "m_wasif_" }];
  res.send(profiles);
});

module.exports = router;
