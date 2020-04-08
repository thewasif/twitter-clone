const express = require("express");
const mongoose = require("mongoose");
//const profile = require("./routes/profile");
const app = express();

app.use(express.json());

//app.use("/profile", profile);

app.get("/", (req, res) => {
  const json = [{ type: "backend" }];
  res.send(json);
});

app.get("/profile", (req, res) => {
  const json = [{ type: "backend" }];
  res.send(json);
});

let PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
